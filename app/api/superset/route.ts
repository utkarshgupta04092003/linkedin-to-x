import { JOBS_URLS, TEST_URL } from "@/app/_lib/config/globals";
import { NextResponse } from "next/server";

export async function GET() {
  JOBS_URLS.forEach(async (url) => {
    console.log("Calling GET: ", url);
    try {
      const res = await fetch(TEST_URL);
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await res.json();
      console.log(url, "response: ", data);
      console.log("Pause of 1 minute");
      new Promise((resolve) => setTimeout(resolve, 1000 * 60 * 1));
    } catch (error) {
      console.log(`error in GET ${url}`, error);
    }
  });
  return NextResponse.json({ message: "Hello from the API" }, { status: 200 });
}
