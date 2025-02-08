import { prisma } from "@/app/_lib/utils/globals"

export async function GET(req: Request) {
    const url = new URL(req.url)
    const query = url.searchParams.get("query") || ""
    const page = url.searchParams.get("page") || "1"
    const perPage = url.searchParams.get("perPage") || "10"
    const startPostedDate = url.searchParams.get("startPostedDate") || ""
    const endPostedDate = url.searchParams.get("endPostedDate") || ""
    const jobs = await getJobs(query, Number(page), Number(perPage), startPostedDate, endPostedDate)
    return new Response(JSON.stringify(jobs))
}

async function getJobs(
    query: string,
    page: number,
    perPage: number,
    startPostedDate?: string,
    endPostedDate?: string
) {
    const where: any = {}
    if (query) {
        where.OR = [
            { title: { contains: query, mode: "insensitive" } },
            { company: { contains: query, mode: "insensitive" } },
            { keyword: { contains: query, mode: "insensitive" } },
            { location: { contains: query, mode: "insensitive" } },
        ]
    }
    if (startPostedDate || endPostedDate) {
        where.postedDate = {}
        if (startPostedDate) where.postedDate.gte = startPostedDate
        if (endPostedDate) where.postedDate.lte = endPostedDate
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
