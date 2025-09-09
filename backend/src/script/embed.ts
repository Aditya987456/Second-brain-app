//--- run one time.

import { ConnectDB, ContentModel } from "../db";
import { getEmbedding } from "../utils/embedding";
import { getOpenAISummary } from "../utils/getopenAIsummary";
import { getMetadataFromLink } from "../utils/metadata";

(async () => {
  try {
    await ConnectDB();

    // Fetch all old documents (no filtering on embedding, we will overwrite anyway)
    const allDocs = await ContentModel.find({});
    console.log(`Found ${allDocs.length} documents to update`);

    for (const doc of allDocs) {
      console.log(`Processing: ${doc._id} (${doc.link})`);

      // Step 1 — Ensure content exists
      let finalContent: string = doc.content ?? "";

      if (!finalContent.trim()) {
        try {
          const link: string = doc.link ?? "";
          if (!link) {
            console.warn(`⚠️ Skipping ${doc._id} — missing link`);
            continue;
          }

          let metadata = await getMetadataFromLink(link);
          let summary = "";

          if (metadata && metadata.trim()) {
            summary = await getOpenAISummary(metadata);
          }

          if (!metadata.trim() && !summary.trim()) {
            metadata = `Content could not be fetched. Link: ${link}`;
          }

          finalContent = `${metadata} ${summary}`.trim();

          if (!finalContent) {
            finalContent = doc.title || "No metadata/summary available";
          }
        } catch (err) {
          console.error(`❌ Failed to get content for ${doc._id}`, err);
          continue;
        }
      }

      // Step 2 — Generate embedding using the same model as query
      let finalEmbedding = [];
      try {
        finalEmbedding = await getEmbedding(finalContent);
      } catch (err) {
        console.error(`❌ Failed to get embedding for ${doc._id}`, err);
        continue;
      }

      // Step 3 — Save updates (overwrite old embeddings)
      await ContentModel.updateOne(
        { _id: doc._id },
        {
          $set: {
            content: finalContent,
            embedding: finalEmbedding
          }
        }
      );

      console.log(`✅ Updated ${doc._id}`);
    }

    console.log("🎉 All documents re-embedded successfully!");
    process.exit(0); // stops this script only
  } catch (error) {
    console.error("❌ Backfill error:", error);
    process.exit(1);
  }
})();
