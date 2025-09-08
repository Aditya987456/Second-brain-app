// debugDetailed.ts
import OpenAI from "openai";
import dotenv from 'dotenv';

dotenv.config();

const token = process.env.GITHUB_TOKEN;
const endpoint = "https://models.github.ai/inference";

console.log('🔍 Detailed debugging:');
console.log('Token exists:', !!token);
console.log('Endpoint:', endpoint);

const githubAI = new OpenAI({
  baseURL: endpoint,
  apiKey: token,
});

async function debugDetailed() {
  const text = "Hello world";
  console.log('Testing with text:', text);

  try {
    const response = await githubAI.embeddings.create({
      model: "text-embedding-3-small",
      input: text,
    });

    console.log('✅ API call successful');
    console.log('Full response structure:');
    console.log('Object keys:', Object.keys(response));
    console.log('Has data:', 'data' in response);
    
    if (response.data) {
      console.log('Data length:', response.data.length);
      console.log('Data type:', typeof response.data);
      
      if (response.data.length > 0) {
        const firstItem = response.data[0] as any; // Use type assertion for debugging
        console.log('First item keys:', Object.keys(firstItem));
        console.log('Has embedding:', 'embedding' in firstItem);
        
        if (firstItem.embedding) {
          const embedding = firstItem.embedding;
          console.log('Embedding type:', typeof embedding);
          console.log('Is array:', Array.isArray(embedding));
          
          if (Array.isArray(embedding)) {
            console.log('Embedding length:', embedding.length);
            console.log('First 3 values:', embedding.slice(0, 3));
          } else if (typeof embedding === 'string') {
            console.log('Embedding value (first 100 chars):', embedding.substring(0, 100) + '...');
          } else {
            console.log('Embedding value:', embedding);
          }
        } else {
          console.log('❌ No embedding property in first item');
        }
      } else {
        console.log('❌ Empty data array');
      }
    } else {
      console.log('❌ No data in response');
    }

    // Log the full response structure for inspection
    console.log('\n📋 Full response (simplified):');
    console.log(JSON.stringify({
      object: response.object,
      data_length: response.data?.length,
      model: response.model,
      usage: response.usage
    }, null, 2));

  } catch (error: any) {
    console.error('❌ API Error:');
    console.error('Message:', error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Response data:', JSON.stringify(error.response.data, null, 2));
    }
  }
}

debugDetailed();