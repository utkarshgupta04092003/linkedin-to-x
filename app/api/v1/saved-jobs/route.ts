import { prisma } from "@/app/_lib/utils/globals"
import { currentUser } from "@clerk/nextjs/server"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams
    const id = searchParams.get("id")
    try {
        const savedJobs = await getSavedJobs(id)
        return NextResponse.json(savedJobs, { status: 200 })
    } catch (error: any) {
        return NextResponse.json({ error: error?.message }, { status: 500 })
    }
}

export async function POST(req: NextRequest) {
    const body = await req.json()
    const user = await currentUser()
    const clerkUserId = user?.id
    if (!clerkUserId) return NextResponse.json({ message: "Unauthorized user" }, { status: 500 })
    await prisma.savedJobs.create({
        data: {
            clerkUserId: clerkUserId,
            jobId: body.id,
            savedAt: new Date(),
        },
    })
    return NextResponse.json({ message: "Job saved successfully", id: body.id }, { status: 201 })
}

export async function DELETE(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams
    const id = searchParams.get("id")
    if (!id) return NextResponse.json({ message: "Missing job id" }, { status: 400 })
    const user = await currentUser()
    const clerkUserId = user?.id
    if (!clerkUserId) return NextResponse.json({ message: "Unauthorized user" }, { status: 500 })
    await prisma.savedJobs.deleteMany({
        where: {
            clerkUserId: clerkUserId,
            jobId: id,
        },
    })
    return NextResponse.json({ message: "Job deleted successfully" }, { status: 200 })
}

async function getSavedJobs(jobId: string | null) {
    const user = await currentUser()
    const clerkUserId = user?.id
    if (!clerkUserId) throw new Error("Invalid user")
    let savedJobs
    if (jobId) {
        savedJobs = await prisma.savedJobs.findMany({
            where: {
                clerkUserId: clerkUserId,
                jobId: jobId,
            },
            select: {
                jobId: true,
                savedAt: true,
            },
        })
    } else {
        savedJobs = await prisma.savedJobs.findMany({
            where: {
                clerkUserId: clerkUserId,
            },
            select: {
                jobId: true,
                savedAt: true,
            },
        })
    }
    return savedJobs
}
