import { INDIA } from "@/app/_lib/config/globals"
import { scrapJobs } from "@/app/_lib/data-fetchers/globals"
import { formatResponseMessage } from "@/app/_lib/utils/globals"
import { ExperienceLevel, JobType, WorkMode } from "@prisma/client"
import { NextRequest, NextResponse } from "next/server"

export const maxDuration = 60

export async function GET(req: NextRequest) {
    const { searchParams } = req.nextUrl
    const keyword = searchParams.get("keyword")
    const location = searchParams.get("location") || INDIA
    const jobType = searchParams.get("jobType") as JobType
    const workMode = searchParams.get("workMode") as WorkMode
    const experienceLevel = searchParams.get("experienceLevel") as ExperienceLevel
    if (!keyword) {
        return NextResponse.json({ message: "Missing keyword" }, { status: 400 })
    }
    if (jobType && !Object.keys(JobType).includes(jobType)) {
        return NextResponse.json({ message: "Invalid jobType" }, { status: 400 })
    }
    if (workMode && !Object.keys(WorkMode).includes(workMode)) {
        return NextResponse.json({ message: "Invalid workMode" }, { status: 400 })
    }
    if (experienceLevel && !Object.keys(ExperienceLevel).includes(experienceLevel)) {
        return NextResponse.json({ message: "Invalid experienceLevel" }, { status: 400 })
    }
    const startTime = new Date().getTime()
    const updatedJobs = await scrapJobs({
        keyword,
        location,
        jobType,
        workMode,
        experienceLevel,
    })
    const endTime = new Date().getTime()
    return NextResponse.json(formatResponseMessage(updatedJobs.length, endTime - startTime), {
        status: 200,
    })
}
