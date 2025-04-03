import { PrismaClient } from "@prisma/client"
import { TWITTER_HASHTAGS } from "../config/twitter"

export const prisma = new PrismaClient()

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
