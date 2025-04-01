import { prisma } from "@/app/_lib/utils/globals"
import { currentUser } from "@clerk/nextjs/server"
import { TrackJobStatus } from "@prisma/client"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
    const user = await currentUser()
    if (!user) return NextResponse.json({ message: "Unauthorized user" }, { status: 401 })
    try {
        const { searchParams } = new URL(req.url)
        const detail = searchParams.get("detail") === "true"
        let includeContent = null
        if (detail) {
            includeContent = {
                jobs: {
                    select: {
                        id: true,
                        title: true,
                        company: true,
                        location: true,
                        jobLink: true,
                        postedDate: true,
                        hiringStatus: true,
                        salary: true,
                        companyLogoURL: true,
                        companyPageURL: true,
                        jobType: true,
                        workMode: true,
                        experienceLevel: true,
                    },
                },
            }
        }
        const jobDetails = await prisma.trackJobs.findMany({
            where: {
                clerkUserId: user.id,
            },
            include: includeContent,
            orderBy: {
                appliedAt: "desc",
            },
        })
        return NextResponse.json(jobDetails, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
    }
}

export async function POST(req: Request) {
    const { jobId } = await req.json()
    const user = await currentUser()
    if (!jobId) return NextResponse.json({ message: "No jobId provided" }, { status: 400 })
    if (!user) return NextResponse.json({ message: "Unauthorized user" }, { status: 401 })
    try {
        const jobDetails = await prisma.trackJobs.upsert({
            where: { clerkUserId_jobId: { clerkUserId: user.id, jobId: jobId } },
            update: {}, // No update needed, just prevent duplicate
            create: {
                jobId: jobId,
                clerkUserId: user.id,
                jobStatus: TrackJobStatus.Applied,
            },
        })
        return NextResponse.json(
            { message: `Tracking job application ${jobDetails.id}` },
            { status: 200 }
        )
    } catch (error) {
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
    }
}

// Whenever TrackJobStatus is Applied, statusUpdatedAt must be set to null
export async function PATCH(req: Request) {
    const { jobId, jobStatus } = await req.json()
    const user = await currentUser()
    if (!jobId || !jobStatus)
        return NextResponse.json({ message: "jobId and jobStatus are required" }, { status: 400 })
    if (!user) return NextResponse.json({ message: "Unauthorized user" }, { status: 401 })
    try {
        const existingJob = await prisma.trackJobs.findUnique({
            where: {
                clerkUserId_jobId: {
                    clerkUserId: user.id,
                    jobId: jobId,
                },
            },
            select: {
                jobStatus: true,
                appliedAt: true,
            },
        })
        if (!existingJob)
            return NextResponse.json({ message: "Job tracking record not found" }, { status: 404 })
        if (existingJob.jobStatus === jobStatus)
            return NextResponse.json(
                { message: `Updated job status to ${existingJob.jobStatus}` },
                { status: 200 }
            )
        const isStatusApplied = jobStatus === TrackJobStatus.Applied
        const updatedJob = await prisma.trackJobs.update({
            where: {
                clerkUserId_jobId: {
                    clerkUserId: user.id,
                    jobId: jobId,
                },
            },
            data: {
                jobStatus: jobStatus,
                statusUpdatedAt: !isStatusApplied ? new Date() : null,
            },
        })
        return NextResponse.json(
            { message: `Updated job status to ${updatedJob.jobStatus}` },
            { status: 200 }
        )
    } catch (error) {
        console.error("Error updating job status:", error)
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
    }
}
