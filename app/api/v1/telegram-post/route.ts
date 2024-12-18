import { prisma } from "@/app/_lib/utils/globals";
import { getMultipleFormattedJob } from "@/app/_lib/utils/linkedin";
import { Jobs } from "@prisma/client";
import { NextResponse } from "next/server";

const ROUTE_ACCESS_KEY = process.env.TELEGRAM_ROUTE_ACCESS_KEY;
const JOB_COUNT = 5;

export async function GET(request: Request) {
  try {
    const headers = request.headers;
    const clientAccessKey = headers.get("telegram-access-key");
    if (clientAccessKey !== ROUTE_ACCESS_KEY) {
      return NextResponse.json(
        { message: "Unauthorized access" },
        { status: 401 }
      );
    }
    const latestJobs = await getLatestJob(JOB_COUNT);
    if (!latestJobs || latestJobs.length === 0) {
      return NextResponse.json({ message: "No new jobs found", error: null });
    }
    const content = getMultipleFormattedJob(latestJobs);
    const messageId = await postToTelegram(content);
    await updateJob(latestJobs);
    return NextResponse.json({
      message: `Job ${latestJobs
        .map((job) => job.id)
        .join(
          ", "
        )} posted successfully to telegram with messageId: ${messageId}`,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error", error },
      { status: 500 }
    );
  }
}

const getLatestJob = async (count: number): Promise<Jobs[] | null> => {
  const latestJobs = await prisma.jobs.findMany({
    where: {
      isTelegramPosted: false,
    },
    orderBy: {
      postedDate: "desc",
    },
    take: count,
  });
  const jobs: Jobs[] = [];
  latestJobs.forEach(
    (job) => job.company && job.title && job.jobLink && jobs.push(job)
  );
  return jobs;
};

const postToTelegram = async (content: string) => {
  const response = await fetch(
    "https://api.telegram.org/bot" +
      process.env.TELEGRAM_BOT_TOKEN +
      "/sendMessage",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: process.env.TELEGRAM_CHAT_ID,
        text: content,
      }),
    }
  );
  if (response.status !== 200) {
    throw new Error("Failed to post to Telegram");
  }
  const responseJson = await response.json();
  return responseJson.result.message_id;
};

const updateJob = async (jobs: Jobs[]) => {
  const jobIds = jobs.map((job) => job.id);
  await prisma.jobs.updateMany({
    where: {
      id: {
        in: jobIds,
      },
    },
    data: {
      isTelegramPosted: true,
    },
  });
};
