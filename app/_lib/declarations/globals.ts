import { Jobs } from "@prisma/client"
import { LOCATION } from "../config/globals"

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
    [LOCATION]: string[]
    jobType: string[]
    experience: string[]
    salary: string[]
}
