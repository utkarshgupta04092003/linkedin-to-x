import { prisma } from "@/app/_lib/utils/globals";
import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest): Promise<NextResponse> {
  const timestamp = req.headers.get("X-Timestamp");
  const checksum = req.headers.get("X-Checksum");
  const authId = req.headers.get("X-Auth-Id");
  if (!timestamp || !checksum || !authId) {
    return NextResponse.json(
      { message: "Missing required headers" },
      { status: 400 }
    );
  }
  const payloadString = `${timestamp}${authId}`;
  if (!process.env.EXCEL_SECRET_KEY) {
    console.error(
      "EXCEL_SECRET_KEY is not defined in the environment variables."
    );
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
  const computedChecksum = crypto
    .createHmac("sha256", process.env.EXCEL_SECRET_KEY!)
    .update(payloadString)
    .digest("hex");
  if (computedChecksum !== checksum) {
    console.error("Invalid webhook signature");
    return NextResponse.json({ message: "Invalid signature" }, { status: 403 });
  }
  const usersData: { name: string; email: string }[] = await req.json();
  let totalUsers = usersData.length;
  let successUsers = 0;
  let failedUsers = 0;
  try {
    for (const user of usersData) {
      const { name, email } = user;
      const isEmailValid = email;

      if (!name || !email || !isEmailValid) {
        console.warn(`Skipping invalid user data: ${JSON.stringify(user)}`);
        failedUsers++;
        continue;
      }
    }
    await prisma.anshuUsers.createMany({
      data: usersData.map((user) => ({
        name: user.name,
        email: user.email,
      })),
    });
    console.info(
      `Total users: ${totalUsers}, Successful users: ${successUsers}, Failed users: ${failedUsers}`
    );
    return NextResponse.json(
      { message: "Processing completed." },
      { status: 200 }
    );
  } catch (error) {
    console.error(error, "Error handling bulk user processing.");
    return NextResponse.json(
      { message: "Failed to process users.", error },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ message: "check is working" });
}
