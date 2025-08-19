import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();
import { githubAI } from "../utils/githubModels.js";
//const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });



//---------------------------  using directly with openAI  --------------------------------

// export async function getEmbedding(text: string) {
//   try {
//     const response = await openai.embeddings.create({
//       model: "text-embedding-3-small", 
//       input: text,
//     });
//     return response.data[0].embedding;
//   } catch (err) {
//     console.error("Embedding error:", err);
//     return null;
//   }
// }





//-------------------------------- using github Models ---------------------------------

export async function getEmbedding(text: string) {
  try {
    const response = await githubAI.embeddings.create({
     // model: "openai/text-embedding-3-small", // GitHub model name-> for embedding
model: "openai/text-embedding-3-small", 

      input: text,
    });
    return response.data[0].embedding;
  } catch (err) {
    console.error("Embedding error:", err);
    return [];
  }
}



