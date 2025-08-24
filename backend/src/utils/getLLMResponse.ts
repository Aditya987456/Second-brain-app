

// import { githubAI } from "./githubModels";
// import dotenv from 'dotenv'
// dotenv.config()


// export async function getLLMResponse(prompt: string) {
//   try {
//     if (!prompt || !prompt.trim()) {
//       return "⚠️ No prompt provided.";
//     }

//     const response = await githubAI.chat.completions.create({
//       model: "gpt-4o-mini", // GitHub-supported GPT model
//       messages: [
//         {
//           role: "system",
//           content: "You are a helpful assistant that answers based on the given context."
//         },
//         { role: "user", content: prompt }
//       ],
//     });

//     const message =
//       response?.choices?.[0]?.message?.content?.trim();

//     return message || "⚠️ Sorry, I couldn't generate an answer.";
//   } catch (err: any) {
//     console.error("❌ LLM error:", err.message || err);
//     return "⚠️ AI service failed. Please try again later.";
//   }
// }











import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

export async function getLLMResponse(prompt: string) {
  const token = process.env.GITHUB_TOKEN;
  
  try {
    const response = await axios.post(
      'https://models.github.ai/inference/chat/completions', // Different endpoint!
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

    return response.data.choices[0].message.content; // ← Direct access!
    
  } catch (error) {
    console.error("LLM error:", error);
    return "⚠️ Service temporarily unavailable";
  }
}
