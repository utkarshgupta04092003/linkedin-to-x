import { Jobs } from "@prisma/client"
import {
    EXPERIENCE_LEVEL_KEY,
    JOB_TYPE_KEY,
    LOCATION_KEY,
    POSTED_DATE_RANGE_KEY,
    WORK_MODE_KEY,
} from "../config/globals"

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
    [POSTED_DATE_RANGE_KEY]: {
        startDate: string | null
        endDate: string | null
    }
    [EXPERIENCE_LEVEL_KEY]: string[]
}
