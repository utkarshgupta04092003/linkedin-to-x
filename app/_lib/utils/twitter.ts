import { jobTemplates } from "../config/twitter"

export const getFormattedJob = (
    companyName: string,
    jobRole: string,
    location: string,
    postedDate: string
) => {
    const randomIndex = Math.floor(Math.random() * jobTemplates.length)
    const randomJobPost = jobTemplates[randomIndex]
        .replace("{companyName}", companyName)
        .replace("{jobRole}", jobRole)
        .replace("{location}", location)
        .replace("{postedDate}", postedDate)
    return randomJobPost
}
