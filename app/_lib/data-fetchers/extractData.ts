import axios from "axios"
import * as cheerio from "cheerio"
import { HIRING_MESSAGE } from "../config/globals"
import { LinkedinScrapeJob } from "../declarations/globals"

export const extractData = async (data: string, keyword: string) => {
    const $ = cheerio.load(data)
    const jobs: LinkedinScrapeJob[] = []

    const elements = $("li").toArray()
    for (const element of elements) {
        const title = $(element).find(".base-search-card__title").text().trim()
        const company = $(element).find(".base-search-card__subtitle").text().trim()
        const location = $(element).find(".job-search-card__location").text().trim()
        const jobLink = $(element).find("a").attr("href") || ""
        const hiringStatus =
            $(element).find(".job-posting-benefits__text").text().trim() || "Actively hiring"
        const salary = $(element).find(".job-search-card__salary-info").text().trim()
        const postedDate =
            $(element).find(".job-search-card__listdate--new").attr("datetime") ||
            $(element).find(".job-search-card__listdate").attr("datetime") ||
            ""
        const companyPageURL = $(element).find(".hidden-nested-link").attr("href") || ""
        const companyLogoURL =
            $(element).find(".artdeco-entity-image").attr("data-delayed-url") ||
            (companyPageURL && (await getCompanyLogoURL(companyPageURL)))

        if (title && company && location) {
            jobs.push({
                title,
                company,
                location,
                jobLink,
                postedDate,
                hiringStatus,
                salary,
                companyPageURL,
                companyLogoURL,
                keyword: keyword[0].toUpperCase() + keyword.slice(1).toLowerCase(),
                scrapedAt: new Date().toISOString(),
                jobType: null,
                workMode: null,
            })
        }
    }
    return jobs
}

export async function fetchData(url: string, retries: number = 3, delayMs: number = 1000) {
    if (!url) return new Error("Please provide a valid URL to fetch data from.")

    let attempt = 0
    while (attempt < retries) {
        try {
            const response = await axios.get(url, {
                headers: {
                    "User-Agent":
                        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
                    Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
                },
            })
            return response.data
        } catch (error: any) {
            attempt++
            if (attempt < retries && (error.response?.status === 429 || !error.response)) {
                console.log(`Attempt ${attempt} failed. Retrying in ${delayMs}ms...`)
                await new Promise((resolve) => setTimeout(resolve, delayMs))
            } else {
                console.error(`Failed to fetch after ${attempt} attempts:`, error.message)
                throw error
            }
        }
    }
    throw new Error(`Failed to fetch data from ${url} after ${retries} attempts.`)
}

export const extractSimilarJobsData = async (similarJobsData: any) => {
    try {
        const $ = cheerio.load(similarJobsData)
        const jobs: LinkedinScrapeJob[] = []

        const elements = $("li").toArray()
        for (const element of elements) {
            const title =
                $(element).find(".base-main-card__title").text().trim() ||
                $(element).find(".base-card__full-link").find(".sr-only").text().trim()
            const company = $(element).find(".hidden-nested-link").text().trim()
            const companyPageURL = $(element).find(".hidden-nested-link").attr("href") || ""
            const jobLink = $(element).find(".base-card__full-link").attr("href") || ""
            const postedDate =
                $(element).find(".main-job-card__listdate").attr("datetime") ||
                $(element).find(".aside-job-card__listdate").attr("datetime") ||
                ""
            const companyLogoURL =
                $(element).find("img").attr("data-delayed-url") ||
                (companyPageURL && (await getCompanyLogoURL(companyPageURL)))
            const location =
                $(element).find(".main-job-card__location").text().trim() ||
                $(element).find(".aside-job-card__location").text().trim()
            const salary =
                $(element).find(".main-job-card__salary-info").text().trim() ||
                $(element).find(".aside-job-card__salary-info").text().trim()

            if (title && company && location) {
                jobs.push({
                    title,
                    company,
                    location,
                    jobLink,
                    postedDate,
                    hiringStatus: HIRING_MESSAGE,
                    salary,
                    companyLogoURL,
                    companyPageURL,
                    keyword: null,
                    scrapedAt: new Date().toISOString(),
                    jobType: null,
                    workMode: null,
                })
            }
        }
        return jobs
    } catch (error) {
        throw error
    }
}

export const getCompanyLogoURL = async (companyPageURL: string) => {
    try {
        const response = await axios.get(companyPageURL)
        const $ = cheerio.load(response.data)
        const companyLogoURL = $("img").attr("src")
        return companyLogoURL || null
    } catch (error) {
        throw error
    }
}
