import { prisma } from "@/app/_lib/utils/globals"
import { currentUser } from "@clerk/nextjs/server"
import { TrackJobStatus } from "@prisma/client"

export async function getTrackedJobs(detail: boolean) {
    const user = await currentUser()
    if (!user) throw new Error("Unauthorized user")
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
    return prisma.trackJobs.findMany({
        where: { clerkUserId: user.id },
        include: includeContent,
        orderBy: { appliedAt: "desc" },
    })
}

export async function trackJobApplication(jobId: string) {
    const user = await currentUser()
    if (!user) throw new Error("Unauthorized user")
    return prisma.trackJobs.upsert({
        where: { clerkUserId_jobId: { clerkUserId: user.id, jobId } },
        update: {},
        create: { jobId, clerkUserId: user.id, jobStatus: TrackJobStatus.Applied },
    })
}

export async function updateJobStatus(jobId: string, jobStatus: TrackJobStatus) {
    const user = await currentUser()
    if (!user) throw new Error("Unauthorized user")
    const existingJob = await prisma.trackJobs.findUnique({
        where: { clerkUserId_jobId: { clerkUserId: user.id, jobId } },
        select: { jobStatus: true, appliedAt: true },
    })
    if (!existingJob) return null
    if (existingJob.jobStatus === jobStatus) return existingJob
    const isStatusApplied = jobStatus === TrackJobStatus.Applied
    return prisma.trackJobs.update({
        where: { clerkUserId_jobId: { clerkUserId: user.id, jobId } },
        data: { jobStatus, statusUpdatedAt: !isStatusApplied ? new Date() : null },
    })
}
