import {
    getTrackedJobs,
    trackJobApplication,
    updateJobStatus,
} from "@/app/_lib/data-fetchers/track-jobs"
import { currentUser } from "@clerk/nextjs/server"
import { TrackJobStatus } from "@prisma/client"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
    const user = await currentUser()
    if (!user) return NextResponse.json({ message: "Unauthorized user" }, { status: 401 })
    try {
        const { searchParams } = new URL(req.url)
        const detail = searchParams.get("detail") === "true"
        const jobDetails = await getTrackedJobs(detail)
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
        const jobDetails = await trackJobApplication(jobId)
        return NextResponse.json(
            { message: `Tracking job application ${jobDetails.id}` },
            { status: 200 }
        )
    } catch (error) {
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
    }
}

export async function PATCH(req: Request) {
    const { jobId, jobStatus } = await req.json()
    const user = await currentUser()
    if (!jobId || !jobStatus)
        return NextResponse.json({ message: "jobId and jobStatus are required" }, { status: 400 })
    if (!user) return NextResponse.json({ message: "Unauthorized user" }, { status: 401 })
    try {
        const updatedJob = await updateJobStatus(jobId, jobStatus as TrackJobStatus)
        if (!updatedJob)
            return NextResponse.json({ message: "Job tracking record not found" }, { status: 404 })
        return NextResponse.json(
            { message: `Updated job status to ${updatedJob.jobStatus}` },
            { status: 200 }
        )
    } catch (error) {
        console.error("Error updating job status:", error)
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
    }
}
