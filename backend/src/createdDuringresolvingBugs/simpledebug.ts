// simpleDebug.ts
import OpenAI from "openai";
import dotenv from 'dotenv';

dotenv.config();

async function simpleDebug() {
  try {
    const githubAI = new OpenAI({
      baseURL: "https://models.github.ai/inference",
      apiKey: process.env.GITHUB_TOKEN,
    });

    console.log('🔍 Simple debug test...');
    
    const response = await githubAI.embeddings.create({
      model: "text-embedding-3-small",
      input: "hello world",
    });

    console.log('✅ API call successful');
    
    // Use type assertion for debugging
    const data = response.data as any[];
    console.log('Data length:', data.length);
    
    if (data.length > 0) {
      const firstItem = data[0];
      console.log('First item:', firstItem);
      
      if (firstItem && firstItem.embedding) {
        const embedding = firstItem.embedding;
        console.log('Embedding type:', typeof embedding);
        
        if (Array.isArray(embedding)) {
          console.log('Array length:', embedding.length);
          console.log('Sample values:', embedding.slice(0, 3));
        } else {
          console.log('Embedding value:', embedding);
        }
      }
    }

  } catch (error: any) {
    console.error('❌ Error:', error.message);
  }
}

simpleDebug();