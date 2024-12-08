import { TELEGRAM_CHANNEL_URL, TWITTER_URL } from "@/app/_lib/config/twitter";
import { uploadToCloudinary } from "@/app/_lib/data-fetchers/cloudinary";
import { postToTwitter } from "@/app/_lib/data-fetchers/twitter";
import { prisma } from "@/app/_lib/utils/globals";
import { getFormattedJob } from "@/app/_lib/utils/twitter";
import { generateTwitterLikeImage } from "@/app/_lib/utils/twitterTextToImage";
import { Jobs } from "@prisma/client";
import { NextResponse } from "next/server";

const ROUTE_ACCESS_KEY = process.env.TWITTER_ROUTE_ACCESS_KEY;

export async function GET(request: Request) {
  try {
    const headers = request.headers;
    const clientAccessKey = headers.get("x-access-key");
    if (clientAccessKey !== ROUTE_ACCESS_KEY) {
      return NextResponse.json(
        { message: "Unauthorized access" },
        { status: 401 }
      );
    }
    const latestJobs = await getLatestJob();
    if (!latestJobs) {
      return NextResponse.json({ message: "No new jobs found", error: null });
    }
    const content = getFormattedJob(
      latestJobs.company,
      latestJobs.title,
      latestJobs.location,
      latestJobs.postedDate ?? ""
    );
    const image = await generateTwitterLikeImage(content);
    const imagePath = await uploadToCloudinary(image);
    const res = await postToTwitter(
      getTwitterText(latestJobs.company, latestJobs?.jobLink),
      imagePath
    );
    await updateJob(latestJobs.id);
    return NextResponse.json({
      message: `Job ${latestJobs.id} posted successfully with tweet id ${res}`,
    });
  } catch (error) {
    return NextResponse.json({ message: "Internal server error", error });
  }
}

const getLatestJob = async (): Promise<Jobs | null> => {
  const latestJobs = await prisma.jobs.findFirst({
    where: {
      isXPosted: false,
    },
    orderBy: {
      postedDate: "desc",
    },
  });
  if (
    !latestJobs ||
    !latestJobs.company ||
    !latestJobs.title ||
    !latestJobs.jobLink
  ) {
    return null;
  }
  return latestJobs;
};

const updateJob = async (jobId: Jobs["id"]) => {
  await prisma.jobs.update({
    where: {
      id: jobId,
    },
    data: {
      isXPosted: true,
    },
  });
};

const getTwitterText = (
  company: Jobs["company"],
  joblink: Jobs["jobLink"]
): string => {
  return `${company} is hiring.\nJob URL: ${joblink}\n\nFollow for more job updates! \nTwitter(x): ${TWITTER_URL} \nTelegram:  ${TELEGRAM_CHANNEL_URL}\n`;
};
