// import OpenAI from "openai";
// import dotenv from "dotenv";
// dotenv.config();
// import { githubAI } from "../utils/githubModels.js";
// //const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
// import { Buffer } from "buffer";


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
//------------------------  with SDK -> s/w development kit  ---->> best if use openAI sdk paid...
// export async function getEmbedding(text: string) {
//   try {
//     const response = await githubAI.embeddings.create({
//      // model: "openai/text-embedding-3-small", // GitHub model name-> for embedding
//     model: "openai/text-embedding-3-small", 

//       input: text,
//     });



//     return response.data[0].embedding;
//   } catch (err) {
//     console.error("Embedding error:", err);
//     return [];
//   }




// }







//---------------------  creating own wrapper --> directly talk -----------------------------------------------------
//-------------here for the embedding i am using ---> text-embedding-3-small

import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

export async function getEmbedding(text: string): Promise<number[]> {
  if (!text?.trim()) return [];
  
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    console.error('❌ No GITHUB_TOKEN found');
    return [];
  }

  try {
    const response = await axios.post(
      'https://models.github.ai/inference/embeddings',
      {
        model: "text-embedding-3-small",
        input: text.trim()
      },
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        timeout: 30000
      }
    );

    // Handle the response properly
    if (response.data && response.data.data && response.data.data.length > 0) {
      const embedding = response.data.data[0].embedding;
      
      if (Array.isArray(embedding) && embedding.length === 1536) {
        console.log(`✅ Embedding generated: ${embedding.length} dimensions`);
        return embedding;
      } else {
        console.log('❌ Invalid embedding format:', typeof embedding, 'length:', embedding?.length);
        return [];
      }
    } else {
      console.log('❌ No data in response');
      return [];
    }

  } catch (error: any) {
    console.error('❌ Embedding API error:');
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    } else {
      console.error('Error:', error.message);
    }
    return [];
  }
}