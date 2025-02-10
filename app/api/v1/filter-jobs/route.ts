import { JOBS_PER_PAGE } from "@/app/_lib/config/globals"
import { prisma } from "@/app/_lib/utils/globals"
import { NextResponse } from "next/server"

export async function GET(req: Request) {
    const url = new URL(req.url)
    const query = url.searchParams.get("query") || ""
    const page = url.searchParams.get("page") || "1"
    const perPage = JOBS_PER_PAGE
    const startPostedDate = url.searchParams.get("startPostedDate")
    const endPostedDate = url.searchParams.get("endPostedDate")
    const location = url.searchParams.get("location")
    const jobType = url.searchParams.get("jobType")
    const workMode = url.searchParams.get("workMode")
    const jobs = await getJobs(
        query,
        Number(page),
        Number(perPage),
        startPostedDate,
        endPostedDate,
        location ? location?.split(",") : null,
        jobType ? jobType?.split(",") : null,
        workMode ? workMode?.split(",") : null
    )
    return NextResponse.json(jobs, { status: 200 })
}

async function getJobs(
    query: string,
    page: number,
    perPage: number,
    startPostedDate: string | null,
    endPostedDate: string | null,
    location: string[] | null,
    jobType: string[] | null,
    workMode: string[] | null
) {
    const where: any = {}
    if (query) {
        where.AND = [
            {
                OR: [
                    { title: { contains: query, mode: "insensitive" } },
                    { company: { contains: query, mode: "insensitive" } },
                    { keyword: { contains: query, mode: "insensitive" } },
                    { location: { contains: query, mode: "insensitive" } },
                ],
            },
        ]
    }
    if (startPostedDate || endPostedDate) {
        where.AND = where.AND || []
        let postedDateFilter: any = {}
        if (startPostedDate) postedDateFilter.gte = startPostedDate
        if (endPostedDate) postedDateFilter.lte = endPostedDate
        where.AND.push({ postedDate: postedDateFilter })
    }
    if (location && location.length > 0) {
        where.AND = where.AND || []
        where.AND.push({
            OR: location.map((loc) => ({
                location: {
                    contains: loc,
                    mode: "insensitive",
                },
            })),
        })
    }
    if (jobType && jobType.length > 0) {
        where.AND = where.AND || []
        where.AND.push({
            jobType: {
                in: jobType,
            },
        })
    }
    if (workMode && workMode.length > 0) {
        where.AND = where.AND || []
        where.AND.push({
            workMode: {
                in: workMode,
            },
        })
    }
    const data = await prisma.jobs.findMany({
        where,
        take: perPage,
        skip: perPage * (page - 1),
        orderBy: {
            postedDate: "desc",
        },
    })
    const count = await prisma.jobs.count({
        where,
    })
    return { count, data }
}
