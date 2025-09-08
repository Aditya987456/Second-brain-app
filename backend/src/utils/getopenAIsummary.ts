import dotenv from "dotenv";
dotenv.config();
import { githubAI } from "../utils/githubModels.js"; // ----> Use GitHub Models instance





//----- this is for summary of the content that user has saved.
export async function getOpenAISummary(text: string) {
  try {
    const response = await githubAI.chat.completions.create({
      model: "gpt-4o-mini", // ---- whichever GitHub model we have access to
      messages: [
        { role: "system", content: "You are a helpful assistant that summarizes text." },
        { role: "user", content: `Summarize the following text in a few sentences:\n\n${text}` }
      ],
    });
    return response.choices[0].message.content || '';
  } catch (err) {
    console.error('Summary error:', err);
    return '';
  }
}
