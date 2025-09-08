// testUpdatedEmbedding.ts
import { getEmbedding } from "../utils/embedding";

async function test() {
  const text = "Hello world, test embedding!";
  console.log('Testing with text:', text);
  
  const embedding = await getEmbedding(text);
  
  console.log('-----------------------------------------------------------');
  console.log("Returned embedding length:", embedding.length);
  console.log("First 5 values:", embedding.slice(0, 5));
  console.log("Last 5 values:", embedding.slice(-5));
  console.log('---------------------------------------------------');
  
  // Verify it's the right format for your database
  if (embedding.length === 1536) {
    console.log('✅ Perfect! 1536 dimensions as expected');
  } else {
    console.log('❌ Wrong dimensions:', embedding.length);
  }
}

test();