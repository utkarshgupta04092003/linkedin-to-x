import { prisma } from "@/app/_lib/utils/globals"
import { redirect } from "next/navigation"

type Props = {
    params: { id: string } & Promise<any>
}

export default async function ShortlyPage({ params }: Props) {
    const { id } = params
    const redirectUrl = await handleShortlyId(id)
    redirect(redirectUrl)
}

async function handleShortlyId(shortlyId: string): Promise<string> {
    try {
        const job = await prisma.jobs.findFirst({
            where: { id: shortlyId },
            select: { id: true, jobLink: true, visitCount: true },
        })
        if (!job) throw new Error("Job not found")
        await prisma.jobs.update({
            where: { id: job.id },
            data: { visitCount: (job.visitCount ?? 0) + 1 },
        })
        return job.jobLink
    } catch (error) {
        throw error
    }
}
