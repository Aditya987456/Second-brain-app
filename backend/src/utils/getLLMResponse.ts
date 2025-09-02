

// // import { githubAI } from "./githubModels";
// // import dotenv from 'dotenv'
// // dotenv.config()


// // export async function getLLMResponse(prompt: string) {
// //   try {
// //     if (!prompt || !prompt.trim()) {
// //       return "⚠️ No prompt provided.";
// //     }

// //     const response = await githubAI.chat.completions.create({
// //       model: "gpt-4o-mini", // GitHub-supported GPT model
// //       messages: [
// //         {
// //           role: "system",
// //           content: "You are a helpful assistant that answers based on the given context."
// //         },
// //         { role: "user", content: prompt }
// //       ],
// //     });

// //     const message =
// //       response?.choices?.[0]?.message?.content?.trim();

// //     return message || "⚠️ Sorry, I couldn't generate an answer.";
// //   } catch (err: any) {
// //     console.error("❌ LLM error:", err.message || err);
// //     return "⚠️ AI service failed. Please try again later.";
// //   }
// // }











// import axios from 'axios';
// import dotenv from 'dotenv';
// dotenv.config();

// export async function getLLMResponse(prompt: string) {
//   const token = process.env.GITHUB_TOKEN;
  
//   try {
//     const response = await axios.post(
//       'https://models.github.ai/inference/chat/completions', // Different endpoint!
//       {
//         model: "gpt-4o-mini", 
//         messages: [
//           { role: "system", content: "You are a helpful assistant." },
//           { role: "user", content: prompt }
//         ]
//       },
//       {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         }
//       }
//     );

//     return response.data.choices[0].message.content; // ← Direct access!
    
//   } catch (error) {
//     console.error("LLM error:", error);
//     return "⚠️ Service temporarily unavailable";
//   }
// }




import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const token = process.env.GITHUB_TOKEN;
const LLM_URL = 'https://models.github.ai/inference/chat/completions';

/**
 * Sends a prompt to the GitHub-hosted LLM and returns the response text.
 */
export async function getLLMResponse(prompt: string): Promise<string> {
  if (!prompt || !prompt.trim()) {
    return "⚠️ No prompt provided.";
  }

  try {
    const response = await axios.post(
      LLM_URL,
      {
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: prompt }
        ]
      },
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const message = response.data?.choices?.[0]?.message?.content?.trim();
    return message || "⚠️ No AI answer found.";
  } catch (error: any) {
    console.error("❌ LLM error:", {
      message: error.message,
      code: error.code,
      status: error.response?.status,
      url: error.config?.url,
      data: error.response?.data
    });
    throw error; // Let retry wrapper handle it
  }
}

/**
 * Retries the LLM call on failure, with exponential delay.
 */
export async function getLLMResponseWithRetry(
  prompt: string,
  retries: number = 2,
  delay: number = 1000
): Promise<string> {
  for (let i = 0; i <= retries; i++) {
    try {
      return await getLLMResponse(prompt);
    } catch (err: any) {
      console.warn(`⚠️ LLM attempt ${i + 1} failed:`, err.message || err);
      if (i === retries) {
        return "⚠️ AI service is temporarily unavailable. Here's what I found from your saved cards:";
      }
      await new Promise(res => setTimeout(res, delay * (i + 1)));
    }
  }

  return "⚠️ Unexpected error in retry logic.";
}

