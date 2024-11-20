import { JOBS_URLS } from "@/app/_lib/config/globals";
import { NextResponse } from "next/server";

export async function GET() {
  const startTime = new Date().getTime();
  const fetchPromises = JOBS_URLS.map(async (url) => {
    console.log("Calling GET: ", url);
    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await res.json();
      console.log(url, "response: ", data);
      return data;
    } catch (error) {
      console.log(`Error in GET ${url}:`, error);
      return null;
    }
  });
  await Promise.all(fetchPromises);
  const endTime = new Date().getTime();
  return NextResponse.json(
    { timeTaken: endTime - startTime, message: "Data Updated Successfully." },
    { status: 200 }
  );
}
