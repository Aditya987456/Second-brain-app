import cron from "node-cron";
import { ContentModel } from "./db";
import { queueFetchContent } from "./worker";

// Every day at 2 AM
cron.schedule("0 16 * * *", async () => {
  const failedContents = await ContentModel.find({ status: { $in: ["pending", "retrying", "failed"] } });
  failedContents.forEach((c) => queueFetchContent(c._id.toString()));
  console.log(`🔄 Scheduled retry for ${failedContents.length} contents`);
});
