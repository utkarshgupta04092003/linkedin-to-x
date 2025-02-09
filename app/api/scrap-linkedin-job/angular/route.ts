import { ANGULAR, INDIA } from "@/app/_lib/config/globals"
import { scrapJobs } from "@/app/_lib/data-fetchers/globals"
import { formatResponseMessage } from "@/app/_lib/utils/globals"
import { NextResponse } from "next/server"

export const maxDuration = 60

export async function GET() {
    const keyword = ANGULAR
    const location = INDIA
    const startTime = new Date().getTime()
    const updatedJobs = await scrapJobs(keyword, location)
    const endTime = new Date().getTime()
    return NextResponse.json(formatResponseMessage(updatedJobs.length, endTime - startTime), {
        status: 200,
    })
}
