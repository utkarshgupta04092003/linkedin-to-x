import { prisma } from "@/app/_lib/utils/globals";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await prisma.job.findMany({
      orderBy: {
        postedDate: "desc",
      },
    });
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
