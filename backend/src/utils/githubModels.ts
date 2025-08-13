import OpenAI from "openai";

const token = process.env.GITHUB_TOKEN;
const endpoint = "https://models.github.ai/inference";

export const githubAI = new OpenAI({
  baseURL: endpoint,
  apiKey: token,
});
