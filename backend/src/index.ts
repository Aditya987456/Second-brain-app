//npm run build & npm run start




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
        });

//async function done in backend after adding content.
        ( async ()=>{

            try {

                let metadata = await getMetadataFromLink(link); // from Microlink gets metadata
                let summary=""

                //this ensure that metadata should not be empty --> if not empty then getsummary of that link...
                if (metadata && metadata.trim()) {
                    summary = await getOpenAISummary(metadata);
                }
                

                 //fallback --> if metadata and summary is not available...
                if (!metadata.trim() && !summary.trim()) {
                    metadata = `Content could not be fetched. Link: ${link}`;
                }


                let finalContent = `${metadata} ${summary}`.trim();

                if (!finalContent) {
                    // fallback: store the link or a placeholder title
                    finalContent = title || "No metadata/summary available";
                }


                const embedding = await getEmbedding(finalContent); // your GitHub inference embedding function

                // Update DB record---> after all the async tasks done.
                await ContentModel.findByIdAndUpdate(content._id, {
                content: finalContent,
                embedding,
                });


                
            }catch (err) {   //-----> GPT se hai.
                console.error("Background processing failed:", err);
                await ContentModel.findByIdAndUpdate(content._id, {
                content: "Metadata/summary fetch failed.",
                });
            }


        }

        )();


       
//instant message after saving link and title...
    res.status(200).json({
        message: "Content saved, processing metadata in background",
        contentId: content._id,
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
app.get("/api/v1/ai-answer", UserMiddleware, async (req:AuthRequest, res)=>{

    try {

      const SearchQuery=req.query.q as string

      if (!SearchQuery) {
        return res.status(400).json({ error: "Missing query" });
      }

      // ## embedding search query...
      const SearchQueryEmbedding=await getEmbedding(SearchQuery)


      // ## seacrh in mongodb vector
     
let results
        try {
        results = await ContentModel.aggregate([
        {
            $vectorSearch: {
            index: "SB-vectorSearch",       // name of the stored vector index from the database
            path: "embedding",                  //document from mongodb collection to match
            queryVector: SearchQueryEmbedding,   // query to search
            numCandidates: 100,       //it picks first 100 closest content
            limit: 3,                   // shows the top 3 best matches
            // filter: { userId: new mongoose.Types.ObjectId(req.userId) }  //filter so that only that user data will go to llm
            // @ts-ignore
            filter: {
              userId: new mongoose.Types.ObjectId(req.userId), // ✅ proper casting
            },
            //@ts-ignore
           includeScore: true
        } }


  ]);
} catch (dbError: any) {
  console.error("❌ Vector search failed:", dbError.message || dbError);
  return res.status(500).json({
    LLMresponses: "⚠️ Vector search failed, please try again.",
    cards: [],
  });
}

// console.log(JSON.stringify(results, null, 2));
    // 3️⃣ Use `_vectorScore` from the aggregation
    results.forEach(r => console.log(r._vectorScore?.toFixed(2) ?? "N/A"));

//console.log(results)

//sort result.
results.sort((a, b) => b.score - a.score);



//filtering threshold.
const threshold = parseFloat(req.query.threshold as string) || 0.5;
let relevantResults = results.filter((r: any) => r.score >= threshold);


//print scores as well
results.forEach(r => {
 // console.log(`Score: ${r.score.toFixed(3)} | Title: ${r.title}`);
 console.log(r.score?.toFixed(2) ?? 'N/A');


 results.forEach(r => console.log(r._vectorScore?.toFixed(2) ?? 'N/A'));





});


if (relevantResults.length === 0 && results.length > 0) {
  relevantResults = results.slice(0, 2);
}





let prompt = "";
let cards: any[] = [];

        //## taking all the top matched card for the context to LLM using structure like card-1, card-2 with line break between them
        if(relevantResults.length>0){
            const ContextLLM = relevantResults.map( (item, idx)=>
                `Card: ${idx+1}: ${item.title}\n ${item.content}` ).join("\n\n")
        



        

        // ##  prompt that we will send to llm -
         prompt = `

        You are an AI assistant for a Second Brain app.
        User's question: "${SearchQuery}"

        Here are the most relevant saved notes/cards:${ContextLLM}

        Answer the question using the saved content.
        At the end, also mention: "I've included your saved cards below."`;

        cards = relevantResults.map(doc => ({
        _id: doc._id,
        title: doc.title,
        link: doc.link,
        type: doc.type
      }));

    }else {
        prompt = `
        User's question: "${SearchQuery}"

        You have no saved content for this topic.
        Answer the question from your own knowledge.
        Also mention: "No saved cards matched your search. `;
        }


        console.log("📝 Final prompt sent to LLM:\n", prompt);
     
    //## LLM answer-------------------
    const LLMresponses=await getLLMResponse(prompt)    
    const safeResponse=LLMresponses && LLMresponses.trim() ? 
        LLMresponses : "No AI answer found 🤔"

    //## responses ---------------------
     res.json({LLMresponses:safeResponse, cards})
  
    }catch (error: any) {
  console.error("search Error", error.message || error)
  res.status(500).json({ error: error.message || "Internal server error" })
}



// return res.json({
//     LLMresponses: "TEST-ANSWER",
//     cards: []})





} )










app.listen(3000, ()=>{
    console.log(`server running on the port 3000`)
})

