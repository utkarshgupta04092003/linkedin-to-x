import { PrismaClient } from "@prisma/client"
import moment from "moment"
import { ALLOWED_TIME_DIFF } from "../config/globals"
import { TWITTER_HASHTAGS } from "../config/twitter"
import { GenerateURLParameters, LinkedinScrapeJob } from "../declarations/globals"

export const prisma = new PrismaClient()

export const generateURL = ({
    keyword,
    location,
    currentPage,
    jobType,
    workMode,
    experienceLevel,
}: GenerateURLParameters): string => {
    let params = new URLSearchParams()
    params.append("keywords", keyword)
    params.append("location", location)
    params.append("page", currentPage.toString())
    params.append("position", "1")
    params.append("pageNum", "0")
    params.append("start", (currentPage * 10).toString())
    params.append("sortBy", "DD")
    if (jobType) params.append("f_JT", jobType)
    if (workMode) params.append("f_WT", workMode)
    if (experienceLevel) params.append("f_E", experienceLevel)

    console.log(
        `https://www.linkedin.com/jobs-guest/jobs/api/seeMoreJobPostings/search?${params.toString()}`
    )
    return `https://www.linkedin.com/jobs-guest/jobs/api/seeMoreJobPostings/search?${params.toString()}`
}

export const filterData = (data: LinkedinScrapeJob[]) => {
    const filteredData = data.filter((job) => {
        const today = moment()
        const date2 = moment(job.postedDate)
        const diff = today.diff(date2, "days")
        return diff < ALLOWED_TIME_DIFF
    })
    return filteredData
}

export const formatResponseMessage = (
    count: number,
    timeTaken: number,
    others?: { [key: string]: any }
) => {
    return {
        message: "Total " + count + " rows updated in DB",
        timeTaken,
        ...others,
    }
}

export const generateShortURL = (id: string) => {
    const url = `${process.env.DOMAIN}/shortly/${id}`
    return url
}

export const getRandomHashtags = (count: number = 3): string => {
    const hashtags = TWITTER_HASHTAGS
    const shuffled = [...hashtags].sort(() => 0.5 - Math.random())
    return shuffled.slice(0, count).join(" ")
}

export const getCurrentFormatTimeStamp = (date: Date): string => {
    const timeFormatter = new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
    })
    const time = timeFormatter.format(date)
    const dateFormatter = new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    })
    const formattedDate = dateFormatter.format(date)
    return `${time} · ${formattedDate}`
}

export const convertToBold = (text: string) => {
    const boldOffsetUppercase = 0x1d400 // Unicode offset for bold uppercase A
    const boldOffsetLowercase = 0x1d41a // Unicode offset for bold lowercase a
    return text
        .split("")
        .map((char) => {
            if (char >= "A" && char <= "Z") {
                return String.fromCodePoint(
                    boldOffsetUppercase + char.charCodeAt(0) - "A".charCodeAt(0)
                )
            } else if (char >= "a" && char <= "z") {
                return String.fromCodePoint(
                    boldOffsetLowercase + char.charCodeAt(0) - "a".charCodeAt(0)
                )
            } else {
                return char
            }
        })
        .join("")
}

export function startCase(str: string): string {
    return str
        .replace(/([a-z])([A-Z])/g, "$1 $2")
        .replace(/[_-]+/g, " ")
        .toLowerCase()
        .replace(/\b\w/g, (char) => char.toUpperCase())
}
