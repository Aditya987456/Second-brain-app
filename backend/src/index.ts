//npm run build & npm run start



import "./cron";   //re-fetching the old pending status content at 2AM
import express, { Request, Response } from "express";
import jwt from "jsonwebtoken"
import mongoose from "mongoose"
import { ConnectDB, ContentModel, linkModel, UserModel } from "./db"
import { any, z } from "zod"
import bcrypt from 'bcrypt'
import { error } from "console"
const saltrounds=5;
import dotenv from 'dotenv'
import { UserMiddleware } from "./middleware";
import { random } from "./utils";
dotenv.config()  // to access all the .env file secrets code or link.
import cors from "cors"
import { OpenAI } from 'openai';
import { getMetadataFromLink } from "./utils/metadata";
import { getOpenAISummary } from "./utils/getopenAIsummary";
import { getEmbedding } from "./utils/embedding";
import { getLLMResponse } from "./utils/getLLMResponse";
import { queueFetchContent } from "./worker";


export interface AuthRequest extends Request {
  userId?: string;
}





const app=express()
app.use(express.json())
app.use(cors())






// app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// app.use(cors({
//   origin: "http://192.168.96.33:5173",
//   credentials: true
// }));

ConnectDB();


// Initialize OpenAI-----
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });




//### *Note->  ExpiresAt -> fo mongodb clear data,    
// ExpiresIn -> for session of the token for the real users not for demo user...








//----------------------------    signup     --------------------------
//@ts-ignore
app.post('/api/v1/signup', async (req: Request, res: Response) => {

    try {

        //#1: validate input entered by users.-> using Zod and Regex for password.
        const inputSchema=z.object({
            emailID:z.string().email(),
            username:z.string().min(3).max(50),

            password:z.string().min(8, "Password must be at least 8 characters long")
                    .regex(/[a-z]/, "Password must include at least one lowercase letter")
                    .regex(/[A-Z]/, "Password must include at least one uppercase letter")
                    .regex(/\d/, "Password must include at least one number")
                    .regex(/[^a-zA-Z0-9]/, "Password must include at least one special character")
        })

        //#2: checking input using zod's safe parse...
        const isInputCorrect=inputSchema.safeParse(req.body)
        if(!isInputCorrect.success){
            return res.status(411).json({
                message:'Invalid input formate.',
                error:isInputCorrect.error
            })
        }


        const { emailID, password, username }=req.body;

        //#3: checking user is unique or not here also before mongodb say that we catch in status code 11000.
        const ExistingUser=await UserModel.findOne( {emailID} )
        if(ExistingUser){
            return res.status(403).json({
                message:'User already exist, Try with another EmailId'
            })
        }


        //#4:  bcrypting the password.
        const hashedPassword=await bcrypt.hash(password, saltrounds)



        //triming the username
        const trimmedUsername = username.split(" ")[0].slice(0, 10);

        //#5: now valid things are getting stored in the db.        
        await UserModel.create({
            emailID,
            password:hashedPassword,
            username:trimmedUsername,
            isDemo: false,
            expireAt: null // not expires the real user.
        })


        res.status(200).json({
            message:'you have successfully signed up.'
        })
       
    

    } catch (error:any) {
        if(error.code==11000){
            return res.status(403).json({
                message:'user already exist'
            })
        }
        return res.status(500).json({
            message:'something went wrong, Error in signing up'
        })   
    }

});












//-----------------------------   signin   -------------------------------
//@ts-ignore
app.post('/api/v1/signin', async (req:Request, res:Response)=>{

   try {

     //#1: validate input entered by users.-> using Zod and Regex for password.
        const inputSchema=z.object({
            emailID:z.string().email(),
            // username:z.string().min(3).max(4),   //--no need in signing in

            password:z.string().min(8, "Password must be at least 8 characters long")
                    .regex(/[a-z]/, "Password must include at least one lowercase letter")
                    .regex(/[A-Z]/, "Password must include at least one uppercase letter")
                    .regex(/\d/, "Password must include at least one number")
                    .regex(/[^a-zA-Z0-9]/, "Password must include at least one special character")
        })

        //#2: checking input using zod's safe parse...
        const isInputCorrect=inputSchema.safeParse(req.body)
        if(!isInputCorrect.success){
            return res.status(411).json({
                message:'Invalid input formate.',
                error:isInputCorrect.error
            })
        }



         const {password, emailID }=req.body

        //#3:  find the matching emailID becz gmail is unique thing
        const findUserGmail=await UserModel.findOne({
            emailID:emailID
        })

        if(!findUserGmail){
            return res.status(403).json({
                message:'Incorrect ceredentials -> email'
            })
        }


        //#4:  if email is found then find out the password.
        const passwordCheck=await bcrypt.compare(password, findUserGmail.password)
        if(!passwordCheck){
            return res.status(403).json({
                message:'Incorrect ceredentials -> password'
            })
        }


        //#5:  now generate token by using uniques that is _id  bydefault by MongoDB.
        const Secret=process.env.JWT_SECRET
        //@ts-ignore
        const token=jwt.sign({id:findUserGmail._id}, Secret)

        //#6: send token after signin
        res.status(200).json({
            message:'Signed in successfully',
            Token:token,          //here when i use token in the backend then i have to use this as  ' .Token '
            
            user: {               //here we are also sending isDemo for knowing is the user on real or just demo page and username for the hii, guest   like things...
                isDemo: findUserGmail.isDemo,
                username: findUserGmail.username
    }
        
        })

 
   } catch (error) {
        res.status(500).json({
            message:'Error in signining in.',
            Error:error
        })
   }
})







//----------------------------------  add new content  --------------------------------
//@ts-ignore
app.post('/api/v1/content', UserMiddleware , async (req, res )=>{
    try {

        const { title, link, type }= req.body     //-------------- from the user ------------------

        //checking the link and title should not be empty.
        if (!link.trim() || !title.trim()) {
            return res.status(400).json({ error: "Link and title are required." });
        }


        //----save content immediately only title and link----
        const content = await ContentModel.create({
        link,
        type,
        title,
        //@ts-ignore
        userId: req.userId,
        content: "Processing metadata...",
        embedding:null,
        status:"pending",
        retryCount:0
        });

// kick off background worker.ts for running async task in bg.
queueFetchContent(content._id.toString());


       
//instant message after saving link and title...
    res.status(200).json({
        message: "Content saved, processing metadata in background",
        contentId: content._id,
        content
        });
       



   } catch (error) {
  console.error("Error in /api/v1/content:", error);

  res.status(500).json({
    message: "Error in adding content.",
    error: error instanceof Error ? error.message : error
  });
}


})






//-------------------------------------  retrieve content ------------------
app.get('/api/v1/content', UserMiddleware, async (req, res)=>{
//@ts-ignore
    const userId=req.userId
    const contents= await ContentModel.find({
        userId:userId
    }).populate("userId", "emailID username")   // select only or show only emailid and username.

    res.json({
        contents
    })

    
})






//---------------------------------  delete content  ----------------------------------------
app.delete('/api/v1/content', UserMiddleware, async (req, res)=>{
  const { contentId } = req.body;

  if (!contentId) {
    res.status(400).json({ message: "Content ID is required" });
  }



    await ContentModel.deleteOne({
        _id:contentId,
    })


    res.status(200).json({
        message:'successfully deleted content'
    })

})







//--------------------------------  share content  -------------------------------------

app.post('/api/v1/brain/share', UserMiddleware, async (req:Request, res:Response)=>{

    
    try {
        const share=req.body.share

        if(share){ 

        const alreadylink=await linkModel.findOne({
            //@ts-ignore
            userId:req.userId
        });


        if(alreadylink){
            res.json({ hash:alreadylink.hash })
            return;
        }


        const hashVal=random(20)
        await linkModel.create({
            //@ts-ignore
            userId:req.userId,
            hash:hashVal
        })

        res.json({ hash:hashVal })
        return;


        }else{

        await linkModel.deleteOne({
            //@ts-ignore
            userId:req.userId
        });

        res.json({
            message:'successfully removed the link'});
            return; 

        }

        
    } catch(error){
        console.error("Error in /brain/share:", error);
        res.status(500).json({ message: 'Internal Server Error' });
        return;

        }


    })





        









//-----------------------------------  get shared contents... ---------------------------------

app.get('/api/v1/brain/:sharelink', async (req, res)=>{
    
    const hash = req.params.sharelink;

    const link = await linkModel.findOne({
        hash
    })


    if(!link){
        res.status(411).json({
            message:"sorry incorrect inputs."
        })
        return;
    }

    const content = await ContentModel.find({
       //@ts-ignore
        userId:link.userId
    })

    const user=await UserModel.findOne({
        //@ts-ignore
        userId:link.userId
    })


    res.json({
        username:user?.username,
        content:content
    })



})





//---------------------------------------------  Try demo ---------------------------------------------

// #NOTE --> In MongoDB, TTL is a feature that lets you automatically delete documents after a certain   amount of time — without writing any cleanup code.
//@ts-ignore
app.post("/api/v1/demo-login", async (req, res) => {
  try {
    const uniqueId = `demo-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    const demoUser = await UserModel.create({
      emailID: `${uniqueId}@demo.com`,
      username: "Guest",
      password: "ABCDabcd1234",
      isDemo: true,
      expireAt: new Date(Date.now() + 2 * 60 * 60 * 1000) // 2 hours TTL
    });

    const token = jwt.sign(
      { id: demoUser._id, isDemo: true },
      process.env.JWT_SECRET!,
      { expiresIn: "2h" }
    );

    return res.json({ message: "Demo session started",
        token,
        username: demoUser.username,
        isDemo: true                
        
        });



  } catch (err: any) {
  console.error("❌ DEMO LOGIN ERROR:", err);
  return res.status(500).json({ message: "Failed to start demo session", error: err.message });
}
});




//-------------------------------------  search Ai ------------------------------------------
//@ts-ignore

// //  $vectorsearch
// app.get("/api/v1/ai-answer", UserMiddleware, async (req: AuthRequest, res) => {
//   try {
//     const SearchQuery = req.query.q as string;

//     if (!SearchQuery) {
//       return res.status(400).json({ error: "Missing query" });
//     }

//     // 1️⃣ Get embedding for the search query
//     const SearchQueryEmbedding = await getEmbedding(SearchQuery);

//     // 2️⃣ Vector search in MongoDB
//     let results;
//     try {
//       results = await ContentModel.aggregate([
//         {
//           $vectorSearch: {
//             index: "SB-vectorSearch",
//             path: "embedding",
//             queryVector: SearchQueryEmbedding,
//             numCandidates: 100,
//             limit: 10, // top 10 for flexibility
//             filter: { userId: new mongoose.Types.ObjectId(req.userId) },
//             //@ts-ignore
//             includeScore: true
//           }
//         }
//       ]);
//     } catch (dbError: any) {
//       console.error("❌ Vector search failed:", dbError.message || dbError);
//       return res.status(500).json({
//         LLMresponses: "⚠️ Vector search failed, please try again.",
//         cards: [],
//       });
//     }

//     // 3️⃣ Print raw _vectorScore for debugging
//     results.forEach(r => console.log(r._vectorScore?.toFixed(2) ?? "N/A"));

//     // 4️⃣ Map _vectorScore → score for easier handling
//     results = results.map(r => ({ ...r, score: r._vectorScore }));

//     // 5️⃣ Sort by score descending
//     results.sort((a, b) => (b.score || 0) - (a.score || 0));

//     // 6️⃣ Apply threshold filtering
//     const threshold = parseFloat(req.query.threshold as string) || 0.5;
//     let relevantResults = results.filter(r => (r.score || 0) >= threshold);

//     // fallback if no results pass threshold
//     if (relevantResults.length === 0 && results.length > 0) {
//       relevantResults = results.slice(0, 2);
//     }

//     // 7️⃣ Build LLM prompt
//     let prompt = "";
//     let cards: any[] = [];

//     if (relevantResults.length > 0) {
//       const ContextLLM = relevantResults
//         .map((item, idx) => `Card: ${idx + 1}: ${item.title}\n${item.content}`)
//         .join("\n\n");

//       prompt = `
// You are an AI assistant for a Second Brain app.
// User's question: "${SearchQuery}"

// Here are the most relevant saved notes/cards:
// ${ContextLLM}

// Answer the question using the saved content.
// At the end, also mention: "I've included your saved cards below."
// `;

//       // Prepare cards for frontend
//       cards = relevantResults.map(doc => ({
//         _id: doc._id,
//         title: doc.title,
//         link: doc.link,
//         type: doc.type,
//         score: doc.score, // include score for frontend reference
//       }));
//     } else {
//       prompt = `
// User's question: "${SearchQuery}"

// You have no saved content for this topic.
// Answer the question from your own knowledge.
// Also mention: "No saved cards matched your search."
// `;
//     }

//     console.log("📝 Final prompt sent to LLM:\n", prompt);

//     // 8️⃣ Get LLM response
//     const LLMresponses = await getLLMResponse(prompt);
//     const safeResponse = LLMresponses && LLMresponses.trim()
//       ? LLMresponses
//       : "No AI answer found 🤔";

//     // 9️⃣ Send response
//     res.json({ LLMresponses: safeResponse, cards });

//   } catch (error: any) {
//     console.error("search Error", error.message || error);
//     res.status(500).json({ error: error.message || "Internal server error" });
//   }
// });


//metasearch
// app.get("/api/v1/ai-answer", UserMiddleware, async (req: AuthRequest, res) => {
//   try {
//     const SearchQuery = req.query.q as string;

//     if (!SearchQuery) {
//       return res.status(400).json({ error: "Missing query" });
//     }

//     // 1️⃣ Get embedding for the search query
//     const SearchQueryEmbedding = await getEmbedding(SearchQuery);

//     // 2️⃣ Perform vector search using $searchMeta
//     let searchResults;
//     try {
//       searchResults = await ContentModel.aggregate([
//         {
//           $searchMeta: {
//             index: "SB-vectorSearch",
//             knnBeta: {
//               vector: SearchQueryEmbedding,
//               path: "embedding",
//               k: 10, // top 10 results
//             },
//             // optional: filter by user
            
//           }
//         },{
//         $match: { userId: new mongoose.Types.ObjectId(req.userId) } // filter by user
//         }
//       ]);
//     } catch (dbError: any) {
//       console.error("❌ Vector search failed:", dbError.message || dbError);
//       return res.status(500).json({
//         LLMresponses: "⚠️ Vector search failed, please try again.",
//         cards: [],
//       });
//     }

//     // 3️⃣ Map searchResults to include score and document fields
//     const results = searchResults.map(r => ({
//       ...r.doc,
//       score: r.score
//     }));

//     // 4️⃣ Print scores for debugging
//     results.forEach(r => console.log(r.score?.toFixed(2) ?? "N/A"));

//     // 5️⃣ Sort by score descending
//     results.sort((a, b) => (b.score || 0) - (a.score || 0));

//     // 6️⃣ Apply threshold filtering
//     const threshold = parseFloat(req.query.threshold as string) || 0.5;
//     let relevantResults = results.filter(r => (r.score || 0) >= threshold);

//     // fallback if no results pass threshold
//     if (relevantResults.length === 0 && results.length > 0) {
//       relevantResults = results.slice(0, 2);
//     }

//     // 7️⃣ Build LLM prompt
//     let prompt = "";
//     let cards: any[] = [];

//     if (relevantResults.length > 0) {
//       const ContextLLM = relevantResults
//         .map((item, idx) => `Card: ${idx + 1}: ${item.title}\n${item.content}`)
//         .join("\n\n");

//       prompt = `
// You are an AI assistant for a Second Brain app.
// User's question: "${SearchQuery}"

// Here are the most relevant saved notes/cards:
// ${ContextLLM}

// Answer the question using the saved content.
// At the end, also mention: "I've included your saved cards below."
// `;

//       // Prepare cards for frontend
//       cards = relevantResults.map(doc => ({
//         _id: doc._id,
//         title: doc.title,
//         link: doc.link,
//         type: doc.type,
//         score: doc.score // include score for reference
//       }));
//     } else {
//       prompt = `
// User's question: "${SearchQuery}"

// You have no saved content for this topic.
// Answer the question from your own knowledge.
// Also mention: "No saved cards matched your search."
// `;
//     }

//     console.log("📝 Final prompt sent to LLM:\n", prompt);

//     // 8️⃣ Get LLM response
//     const LLMresponses = await getLLMResponse(prompt);
//     const safeResponse = LLMresponses && LLMresponses.trim()
//       ? LLMresponses
//       : "No AI answer found 🤔";

//     // 9️⃣ Send response
//     res.json({ LLMresponses: safeResponse, cards });

//   } catch (error: any) {
//     console.error("search Error", error.message || error);
//     res.status(500).json({ error: error.message || "Internal server error" });
//   }
// });







// //---------works with score showing.
// app.get("/api/v1/ai-answer", UserMiddleware, async (req: AuthRequest, res) => {
//   try {
//     const SearchQuery = req.query.q as string;
//     if (!SearchQuery) {
//       return res.status(400).json({ error: "Missing query" });
//     }

//     // 1️⃣ Get embedding
//     const SearchQueryEmbedding = await getEmbedding(SearchQuery);

//     // 2️⃣ MongoDB vector search
//     let results;
//     try {
//       results = await ContentModel.aggregate([
//         {
//           $vectorSearch: {
//             index: "vector_index",
//             path: "embedding",
//             queryVector: SearchQueryEmbedding,
//             numCandidates: 100,
//             limit: 3,

//             filter: {
                
//               userId: new mongoose.Types.ObjectId(req.userId),
//             },
//           },
//         },
//         {
//           $project: {
//             title: 1,
//             content: 1,
//             link: 1,
//             type: 1,
//             _vectorScore: { $meta: "vectorSearchScore" }, // ✅ correct field
//           },
//         },
//       ]);
//     } catch (dbError: any) {
//       console.error("❌ Vector search failed:", dbError.message || dbError);
//       return res.status(500).json({
//         LLMresponses: "⚠️ Vector search failed, please try again.",
//         cards: [],
//       });
//     }


// console.log('--------------------------------------------------------------------------------')
//     console.log("🔎 Raw search results:", results.map(r => ({
//   title: r.title,
//   score: r._vectorScore
// })));

// console.log('---------------------------------------------------------------------------------')





//     // 3️⃣ Sort results by score
//     results.sort((a, b) => b._vectorScore - a._vectorScore);

//     // 4️⃣ Apply threshold
//     const threshold = parseFloat(req.query.threshold as string) || 0.5;
//     let relevantResults = results.filter((r: any) => r._vectorScore >= threshold);

//     // 5️⃣ Fallback: if all got filtered out but there are results, take top 2
//     if (relevantResults.length === 0 && results.length > 0) {
//       relevantResults = results.slice(0, 2);
//     }

//     // 6️⃣ Prepare prompt + cards
//     let prompt = "";
//     let cards: any[] = [];

//     if (relevantResults.length > 0) {
//       const ContextLLM = relevantResults
//         .map((item, idx) => `Card ${idx + 1}: ${item.title}\n${item.content}`)
//         .join("\n\n");

//       prompt = `
// You are an AI assistant for a Second Brain app.
// User's question: "${SearchQuery}"

// Here are the most relevant saved notes/cards:
// ${ContextLLM}

// Answer the question using the saved content.
// At the end, also mention: "I've included your saved cards below."
//       `;

//       cards = relevantResults.map((doc) => ({
//         _id: doc._id,
//         title: doc.title,
//         link: doc.link,
//         type: doc.type,
//         score: doc._vectorScore.toFixed(3), // ✅ return score too
//       }));
//     } else {
//       prompt = `
// User's question: "${SearchQuery}"

// You have no saved content for this topic.
// Answer the question from your own knowledge.
// Also mention: "No saved cards matched your search."
//       `;
//     }

//     console.log("📝 Final prompt sent to LLM:\n", prompt);

//     // 7️⃣ LLM Answer
//     const LLMresponses = await getLLMResponse(prompt);
//     const safeResponse =
//       LLMresponses && LLMresponses.trim()
//         ? LLMresponses
//         : "No AI answer found 🤔";

//     // 8️⃣ Return
//     res.json({ LLMresponses: safeResponse, cards });
//   } catch (error: any) {
//     console.error("search Error", error.message || error);
//     res
//       .status(500)
//       .json({ error: error.message || "Internal server error" });
//   }
// });




// app.get("/api/v1/ai-answer", UserMiddleware, async (req: AuthRequest, res) => {
//   try {
//     const SearchQuery = req.query.q as string;
//     if (!SearchQuery) return res.status(400).json({ error: "Missing query" });

//     // 1️⃣ Generate embedding for query
//     const SearchQueryEmbedding = await getEmbedding(SearchQuery);
//     console.log("Query embedding length:", SearchQueryEmbedding.length);

//     // 2️⃣ Perform vector search using $search + knnBeta
//     let results: any[] = [];
//     try {
//       results = await ContentModel.aggregate([
//         {
//           $search: {
//             index: "vector_index", // Lucene-based Atlas Search index
//             knnBeta: {
//               vector: SearchQueryEmbedding,
//               path: "embedding",
//               k: 20 // more candidates for better filtering
//             }
//           }
//         },
//         {
//           $match: {
//             userId: new mongoose.Types.ObjectId(req.userId)
//           }
//         },
//         {
//           $project: {
//             title: 1,
//             content: 1,
//             link: 1,
//             type: 1,
//             _vectorScore: { $meta: "searchScore" }
//           }
//         },
//         {
//           $sort: { _vectorScore: -1 }
//         },
//         {
//           $limit: 10
//         }
//       ]);
//     } catch (dbError: any) {
//       console.error("❌ Vector search failed:", dbError.message || dbError);
//       return res.status(500).json({
//         LLMresponses: "⚠️ Vector search failed, please try again.",
//         cards: [],
//       });
//     }

//     // 3️⃣ Log scores for debugging
//     results.forEach(r => {
//       console.log(`Title: ${r.title} | Score: ${r._vectorScore?.toFixed(3) ?? "N/A"}`);
//     });

//     // 4️⃣ Filter by score threshold
//     const threshold = parseFloat(req.query.threshold as string) || 0.5;
//     let relevantResults = results.filter(r => (r._vectorScore ?? 0) >= threshold);

//     // Fallback: top 2 if none pass threshold
//     if (relevantResults.length === 0 && results.length > 0) {
//       console.warn("⚠️ No results passed threshold. Using fallback.");
//       relevantResults = results.slice(0, 2);
//     }

//     // 5️⃣ Construct LLM prompt and card list
//     let prompt = "";
//     let cards: any[] = [];

//     if (relevantResults.length > 0) {
//       const ContextLLM = relevantResults
//         .map((item, idx) =>
//           `Card ${idx + 1} (score: ${(item._vectorScore ?? 0).toFixed(2)}): ${item.title}\n${item.content}`
//         )
//         .join("\n\n");

//       prompt = `
// You are an AI assistant for a Second Brain app.
// User's question: "${SearchQuery}"

// Here are the most relevant saved notes/cards:\n${ContextLLM}

// Answer the question using the saved content.
// At the end, also mention: "I've included your saved cards below."`;

//       cards = relevantResults.map(doc => ({
//         _id: doc._id,
//         title: doc.title,
//         link: doc.link,
//         type: doc.type,
//       }));
//     } else {
//       prompt = `
// User's question: "${SearchQuery}"

// You have no saved content for this topic.
// Answer the question from your own knowledge.
// Also mention: "No saved cards matched your search."`;
//     }

//     console.log("📝 Final prompt sent to LLM:\n", prompt);

//     // 6️⃣ Get LLM response
//     const LLMresponses = await getLLMResponse(prompt);
//     const safeResponse = LLMresponses && LLMresponses.trim()
//       ? LLMresponses
//       : "No AI answer found 🤔";

//     // 7️⃣ Send response
//     res.json({ LLMresponses: safeResponse, cards });

//   } catch (error: any) {
//     console.error("search Error", error.message || error);
//     res.status(500).json({ error: error.message || "Internal server error" });
//   }
// });



// //works lates--> with scores.
app.get("/api/v1/ai-answer", UserMiddleware, async (req: AuthRequest, res) => {
  
  
  try {
    const SearchQuery = req.query.q as string;
    if (!SearchQuery) {
      return res.status(400).json({ error: "Missing query" });
    }





    // 1️⃣ Get embedding
    const SearchQueryEmbedding = await getEmbedding(SearchQuery);



console.log("--------------------length----------------",SearchQueryEmbedding.length)
   


// 2️⃣ MongoDB vector search
    let vectorResults: any[] = [];
    try {
      vectorResults = await ContentModel.aggregate([
        {
          $vectorSearch: {
            index: "vector_index",
            path: "embedding",
            queryVector: SearchQueryEmbedding,
            numCandidates: 100,
            limit: 5,
            filter: { userId: new mongoose.Types.ObjectId(req.userId) },
          },
        },
        {
          $project: {
            title: 1,
            content: 1,
            link: 1,
            type: 1,
            _vectorScore: { $meta: "vectorSearchScore" },
          },
        },
      ]);
    } catch (dbError: any) {
      console.error("❌ Vector search failed:", dbError.message || dbError);
    }






    // 3️⃣ Sort + filter by threshold
    vectorResults.sort((a, b) => b._vectorScore - a._vectorScore);



    console.log("🔍 Raw vector results:", vectorResults.map(r => ({
  id: r._id,
  title: r.title,
  score: r._vectorScore
})));




    const threshold = parseFloat(req.query.threshold as string) || 0.65;
    let relevantResults = vectorResults.filter((r: any) => r._vectorScore >= threshold);





console.log("✅ Filtered relevant results:", relevantResults.map(r => ({
  id: r._id,
  title: r.title,
  score: r._vectorScore
})));







    // 4️⃣ Fallback if nothing relevant → try text search
    if (relevantResults.length === 0) {
      console.log("⚠️ No good vector matches, trying text search...");

      const textResults = await ContentModel.find(
        {
          userId: req.userId,
          $or: [
            { title: { $regex: SearchQuery, $options: "i" } },
            { content: { $regex: SearchQuery, $options: "i" } },
          ],
        },
        { title: 1, content: 1, link: 1, type: 1 }
      ).limit(3);

      relevantResults = textResults.map((doc: any) => ({
        ...doc.toObject(),
        _vectorScore: 0.65, // fake score so frontend still works
      }));
    }

    // 5️⃣ Prepare LLM prompt
    let prompt = "";
    let cards: any[] = [];

    //truncate logic --> so only takes 500 char
    const truncate = (text: string, max = 500) => 
    text.length > max ? text.slice(0, max) + "..." : text;

 //-----$$$ these are have to do so that we send the context below 3145 bytes which is limit for free service.
    if (relevantResults.length > 0) {
      const ContextLLM = relevantResults
        .slice(0, 3) // only top 3 cards
        .map((item, idx) => `Card ${idx + 1}: ${item.title}\n${truncate(item.content, 500)}`)
        .join("\n");

      prompt = `
You are an AI assistant for a Second Brain app.
User's question: "${SearchQuery}"

Here are the most relevant saved notes/cards:
${ContextLLM}

Answer the question using the saved content.
At the end, also mention: "I've included your saved cards below."
      `;

      cards = relevantResults.map((doc: any) => ({
        _id: doc._id,
        title: doc.title,
        link: doc.link,
        type: doc.type,
        score: doc._vectorScore?.toFixed?.(3) || "N/A",
      }));
    } else {
      prompt = `
User's question: "${SearchQuery}"

You have no saved content for this topic.
Answer the question from your own knowledge.
Also mention: "No saved cards matched your search."
      `;
    }

    // 6️⃣ LLM Answer
    const LLMresponses = await getLLMResponse(prompt);
    const safeResponse = LLMresponses?.trim() || "No AI answer found 🤔";

    res.json({ LLMresponses: safeResponse, cards });
  } catch (error: any) {
    console.error("search Error", error.message || error);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
});










app.listen(3000, ()=>{
    console.log(`server running on the port 3000`)
})

