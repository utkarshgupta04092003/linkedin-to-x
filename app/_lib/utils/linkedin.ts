import { Jobs } from "@prisma/client"
import { linkedinJobTemplatesBottom, linkedinJobTemplatesTop } from "../config/linkedin"
import { LINKEDIN_PAGE_URL, TELEGRAM_CHANNEL_URL, TWITTER_URL } from "../config/twitter"
import { convertToBold, generateShortURL, getRandomHashtags } from "./globals"

export const getMultipleFormattedJob = (JobList: Jobs[]) => {
    const topContentIndex = Math.floor(Math.random() * linkedinJobTemplatesTop.length)
    const topContent = linkedinJobTemplatesTop[topContentIndex]
    const bottomContentIndex = Math.floor(Math.random() * linkedinJobTemplatesBottom.length)
    const bottomContent = linkedinJobTemplatesBottom[bottomContentIndex]
        .replaceAll("{telegramLink}", TELEGRAM_CHANNEL_URL)
        .replaceAll("{twitterLink}", TWITTER_URL)
        .replaceAll("{linkedinLink}", LINKEDIN_PAGE_URL)
    const middleContentlist = JobList.map((job) => {
        return `Company: ${convertToBold(job.company)}\nJob Role: ${convertToBold(
            job.title
        )}\nJob URL: ${generateShortURL(job.id)}\nLocation: ${job.location || "–"}\nPosted Date: ${
            job.postedDate
        }`
    })
    const middleContent = middleContentlist.join("\n\n")
    const formattedJob = topContent + middleContent + bottomContent + " " + getRandomHashtags(5)
    return formattedJob
}
