import { prisma } from "@/app/_lib/utils/globals";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const { params } = context;
    const id = params?.id;
    if (!id) {
      return NextResponse.json({ error: "Invalid URL", status: 400 });
    }
    const isJobExist = await prisma.jobs.findFirst({
      where: { id },
      select: { id: true, jobLink: true, visitCount: true },
    });
    if (!isJobExist) {
      return NextResponse.json({ error: "Job not found", status: 404 });
    }
    await prisma.jobs.update({
      where: { id: isJobExist.id },
      data: { visitCount: (isJobExist.visitCount ?? 0) + 1 },
    });
    const response = NextResponse.redirect(isJobExist.jobLink);
    response.headers.set("Cache-Control", "no-store");
    return response;
  } catch (error) {
    return NextResponse.json(
      { error: "An unexpected error occurred", status: 500 },
      { status: 500 }
    );
  }
}
