// // Importing the OpenAI SDK -> sd kit 
// import { OpenAI } from 'openai';
// import dotenv from 'dotenv'
// dotenv.config()

// import { ConnectDB } from '../db';
// import { ContentModel } from '../db';


// await ConnectDB(); // Reused the mongoDb connection from db.ts



// // Create OpenAI client with the secret key from .env
// const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });


// async function getEmbedding(text: string) {
//   const response = await openai.embeddings.create({
//     model: "text-embedding-3-small", 
//     input: text,
//   });
//   return response.data[0].embedding;
// }





import { ConnectDB, ContentModel } from "../db";
import { getEmbedding } from "../utils/embedding";
import { getOpenAISummary } from "../utils/getopenAIsummary";
import { getMetadataFromLink } from "../utils/metadata";


// (async () => {
//   await ConnectDB();

//   //const contents = await ContentModel.find({ embedding: null });   //fetching old content that not have embedding...

//    // Find all old docs where content or embedding is missing
//     const oldDocs = await ContentModel.find({
//       $or: [
//         { content: { $exists: false } },
//         { content: "" },
//         { embedding: { $exists: false } },
//         { embedding: { $size: 0 } }
//       ]
//     });


//      console.log(`Found ${oldDocs.length} documents to update`);  //output message will be displayed....






 






//   console.log(" content with embedding complete!");
//   process.exit(0);  //it will only stop that script’s process, not your entire backend server.--> GPT
// })();    

//no need to call because above it -----> Immediately Invoked Function Expression (IIFE)



(async () => {
  try {
    await ConnectDB();

    // Find all old docs where content or embedding is missing
    const oldDocs = await ContentModel.find({
      $or: [
        { content: { $exists: false } },
        { content: "" },
        { embedding: { $exists: false } },
        { embedding: { $size: 0 } }
      ]
    });

    console.log(`Found ${oldDocs.length} documents to update`);

    for (const doc of oldDocs) {
      console.log(`Processing: ${doc._id} (${doc.link})`);



    // Step 1 — Generate content if missing
      let finalContent: string = doc.content ?? "";

      if (!finalContent.trim()) {
        try {
            const link: string = doc.link ?? "";
            if (!link) {
              console.warn(`⚠️ Skipping ${doc._id} — missing link`);
              continue;
            }

            let metadata=await getMetadataFromLink(link)
            let summary=""

            //this ensure that metadata should not be empty --> if not empty then getsummary of that link...
            if (metadata && metadata.trim()) {
              summary = await getOpenAISummary(metadata);
            }

            //fallback --> if metadata and summary is not available...
            if (!metadata.trim() && !summary.trim()) {
              metadata = `Content could not be fetched. Link: ${link}`;
            }


          finalContent = `${metadata} ${summary}`.trim();

          if (!finalContent) {
            // fallback: store the link or a placeholder title
            finalContent = doc.title || "No metadata/summary available";
          }


      } catch (err) {
          console.error(`❌ Failed to get content for ${doc._id}`, err);
          continue;
        }
      }


      // Step 2 — Generate embedding if missing
      let finalEmbedding = doc.embedding;
      if (!finalEmbedding || finalEmbedding.length === 0) {
        try {
          finalEmbedding = await getEmbedding(finalContent);
        } catch (err) {
          console.error(`❌ Failed to get embedding for ${doc._id}`, err);
          continue;
        }
      }

      // Step 3 — Save updates
      await ContentModel.updateOne(
        { _id: doc._id },
        {
          $set: {
            content: finalContent,
            embedding: finalEmbedding
          }
        }
      );

      console.log(`✅ Updated ${doc._id}`);
    }

    console.log("🎉 Backfill complete!");
    process.exit(0);

  } catch (error) {
    console.error("❌ Backfill error:", error);
    process.exit(1);
  }
})();