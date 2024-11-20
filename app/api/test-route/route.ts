import { NextResponse } from "next/server";

export async function GET() {
  console.log("TEST CRON is running fine.");
  return NextResponse.json({ message: "Hello World!" });
}
