import { prisma } from "@/app/_lib/utils/globals";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params; // Await the promise
  if (!id) {
    return NextResponse.json(
      { error: "Invalid URL", status: 400 },
      { status: 400 }
    );
  }
  try {
    const job = await prisma.jobs.findFirst({
      where: { id },
      select: { id: true, jobLink: true, visitCount: true },
    });
    if (!job) {
      return NextResponse.json(
        { error: "Job not found", status: 404 },
        { status: 404 }
      );
    }
    await prisma.jobs.update({
      where: { id: job.id },
      data: { visitCount: (job.visitCount ?? 0) + 1 },
    });
    const response = NextResponse.redirect(job.jobLink);
    response.headers.set("Cache-Control", "no-store");
    return response;
  } catch (error) {
    return NextResponse.json(
      { error: "An unexpected error occurred", status: 500 },
      { status: 500 }
    );
  }
}
