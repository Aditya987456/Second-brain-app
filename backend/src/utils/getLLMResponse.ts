
import { githubAI } from "./githubModels";



export async function getLLMResponse(prompt: string) {
  try {
    const response = await githubAI.chat.completions.create({
      model: "gpt-4o-mini", // another GitHub-supported model--> GPT
      messages: [
        { role: "system", content: "You are a helpful assistant that answers based on the given context." },
        { role: "user", content: prompt }
      ],
    });
    return response.choices[0]?.message?.content?.trim() 
      || "⚠️ Sorry, I couldn't generate an answer.";
  } catch (err) {
    console.error("LLM error:", err);
    return "⚠️ AI service failed. Please try again later.";
  }
}
