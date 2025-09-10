/* 

    ------------------------------------- GPT Explanation ----------------------------------------





*/



import { ContentModel } from "./db";
import { getEmbedding } from "./utils/embedding";
import { getOpenAISummary } from "./utils/getopenAIsummary";
import { getMetadataFromLink } from "./utils/metadata";
import axios from "axios";

const RETRY_LIMIT=6;



export function queueFetchContent(id: string) {
  // run after request cycle ends
  setImmediate(() => processContent(id));
}



async function processContent(id: string) {
  const item = await ContentModel.findById(id);
  if (!item || item.status === "ready" || item.status === "failed") return;

try {

  const link: string = item.link ?? "";
  let metadata = await getMetadataFromLink(link);
  let summary = "";

  //this ensure that metadata should not be empty --> if not empty then getsummary of that link...
    if (metadata && metadata.trim()) {
        summary = await getOpenAISummary(metadata);
    }




  if (!metadata?.trim() && !summary?.trim()) {
    // No content fetched, mark status pending here-------
    await ContentModel.findByIdAndUpdate(item._id, {
        status: "pending", 
    });
    return; // exit, don’t create embedding --> becz there is not content found is there in the content 
}

const finalContent = `${metadata} ${summary}`.trim();
const embedding = await getEmbedding(finalContent);



// if correctly fetched then update the database...
await ContentModel.findByIdAndUpdate(item._id, {
    content: finalContent,
    embedding,
    status: "ready",
});

//console.log(`✅ Processe--> async fetching content and generated correct embedding-- ${id}`);
}catch(err: any) {
    console.error(`❌ Error processing-> fetching content and generating embedding ${id}:`, err.message);

    const newRetry = (item.retryCount || 0) + 1;

    if (newRetry >= RETRY_LIMIT) {
      await ContentModel.findByIdAndUpdate(id,
         { status: "failed", retryCount: newRetry });
      console.log(`🚫 Marked ${id} as failed`);

    } else {
      await ContentModel.findByIdAndUpdate(id, { status: "retrying", retryCount: newRetry });

      const delay = Math.pow(2, newRetry) * 1000; // 2s, 4s, 8s, 16s, 32s
     // console.log(`🔄 Retrying ${id} in ${delay / 1000}s`);
      setTimeout(() => processContent(id), delay);
    }
  }
}