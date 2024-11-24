import { prisma } from "@/app/_lib/utils/globals";
import { NextResponse } from "next/server";

export async function GET() {
  console.log("TEST CRON is running fine.");
  const jobData = await prisma.jobs.findMany();
  const similarJobsUpdated = jobData.filter((job) => job.isSimilarJobsUpdated);
  const xPostUpdated = jobData.filter((job) => job.isXPosted);
  await prisma.metaData.create({
    data: {
      totalJobs: jobData.length,
      totalXPostedJobs: xPostUpdated.length,
      totalSimilarJobsUpdated: similarJobsUpdated.length,
    },
  });
  return NextResponse.json({
    message: "Hello World!",
    totalJobs: jobData.length,
    totalXPostedJobs: xPostUpdated.length,
    isScrapedJobTrue: similarJobsUpdated.length,
  });
}
