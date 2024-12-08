import { generateShortURL, prisma } from "@/app/_lib/utils/globals";
import { getFormattedJobForTelegram } from "@/app/_lib/utils/telegram";
import { Jobs } from "@prisma/client";
import { NextResponse } from "next/server";

const ROUTE_ACCESS_KEY = process.env.TELEGRAM_ROUTE_ACCESS_KEY;
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
    const latestJobs = await getLatestJob();
    if (!latestJobs) {
      return NextResponse.json({ message: "No new jobs found", error: null });
    }
    const shortURL = generateShortURL(latestJobs.id);
    const content = getFormattedJobForTelegram(
      latestJobs.company,
      latestJobs.title,
      latestJobs.location,
      latestJobs.postedDate ?? "",
      shortURL
    );
    await postToTelegram(content);
    await updateJob(latestJobs.id);
    return NextResponse.json({
      message: `Job ${latestJobs.id} posted successfully to telegram`,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error", error },
      { status: 500 }
    );
  }
}

const getLatestJob = async (): Promise<Jobs | null> => {
  const latestJobs = await prisma.jobs.findFirst({
    where: {
      isTelegramPosted: false,
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
  console.log("responssse", await response.json());
};

const updateJob = async (jobId: Jobs["id"]) => {
  await prisma.jobs.update({
    where: {
      id: jobId,
    },
    data: {
      isTelegramPosted: true,
    },
  });
};
