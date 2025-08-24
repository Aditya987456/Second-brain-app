// testDirectCall.ts
import axios from 'axios';
import dotenv from 'dotenv'
dotenv.config()

async function testDirectCall() {
  try {
    const token = process.env.GITHUB_TOKEN;
    const endpoint = "https://models.github.ai/inference/embeddings";
    
    console.log('🔍 Testing direct HTTP call...');
    console.log('Token exists:', !!token);
    
    const response = await axios.post(
      endpoint,
      {
        model: "text-embedding-3-small",
        input: "hello world"
      },
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        timeout: 10000
      }
    );

    console.log('✅ Direct call successful:');
    console.log('Status:', response.status);
    console.log('Response keys:', Object.keys(response.data));
    
    if (response.data.data && response.data.data.length > 0) {
      const embedding = response.data.data[0].embedding;
      console.log('Embedding type:', typeof embedding);
      if (typeof embedding === 'string') {
        console.log('String length:', embedding.length);
      } else if (Array.isArray(embedding)) {
        console.log('Array length:', embedding.length);
      }
    } else {
      console.log('Full response:', JSON.stringify(response.data, null, 2));
    }

  } catch (error: any) {
    console.error('❌ Direct call failed:');
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Response data:', JSON.stringify(error.response.data, null, 2));
    } else if (error.request) {
      console.error('No response received. Check network or URL.');
      console.error('Request config:', error.config);
    } else {
      console.error('Error:', error.message);
    }
  }
}

testDirectCall();