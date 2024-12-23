import { INDIA } from "@/app/_lib/config/globals";
import { scrapJobs } from "@/app/_lib/data-fetchers/globals";
import { formatResponseMessage } from "@/app/_lib/utils/globals";
import { NextRequest, NextResponse } from "next/server";

export const maxDuration = 60;

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const keyword = searchParams.get("keyword");
  if (!keyword) {
    return NextResponse.json({ message: "Missing keyword" }, { status: 400 });
  }
  const location = INDIA;
  const startTime = new Date().getTime();
  const updatedJobs = await scrapJobs(keyword, location);
  const endTime = new Date().getTime();
  return NextResponse.json(
    formatResponseMessage(updatedJobs.length, endTime - startTime),
    { status: 200 }
  );
}
