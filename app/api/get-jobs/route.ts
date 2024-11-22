import { prisma } from "@/app/_lib/utils/globals";
import { Jobs } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(): Promise<NextResponse<Jobs[]> | NextResponse> {
  try {
    const data = (await prisma.jobs.findMany({
      orderBy: {
        postedDate: "desc",
      },
    })) as Jobs[];
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
