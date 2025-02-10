import { Jobs } from "@prisma/client"
import { JOB_TYPE_KEY, LOCATION_KEY, WORK_MODE_KEY } from "../config/globals"

export type LinkedinScrapeJob = Omit<
    Jobs,
    | "id"
    | "updatedAt"
    | "isXPosted"
    | "isSimilarJobsUpdated"
    | "isTelegramPosted"
    | "visitCount"
    | "isLinkedInPosted"
    | "isInstagramPosted"
>

export type FilterState = {
    [LOCATION_KEY]: string[]
    [JOB_TYPE_KEY]: string[]
    [WORK_MODE_KEY]: string[]
    experience: string[]
    salary: string[]
}
