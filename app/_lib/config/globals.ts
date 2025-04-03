import { ExperienceLevel, JobType, WorkMode } from "@prisma/client"

export const JOBS_PER_PAGE = 10

export const LOCATION_KEY = "location"
export const JOB_TYPE_KEY = "jobType"
export const WORK_MODE_KEY = "workMode"
export const POSTED_DATE_RANGE_KEY = "dateRange"
export const EXPERIENCE_LEVEL_KEY = "experience"

export const FILTER_GROUP = [
    {
        label: "Location",
        key: LOCATION_KEY,
        values: ["Noida", "Bengaluru", "Mumbai", "Hyderabad", "Pune", "Chennai"],
    },
    { label: "Job Type", key: JOB_TYPE_KEY, values: Object.keys(JobType) },
    { label: "Work Mode", key: WORK_MODE_KEY, values: Object.keys(WorkMode) },
    { label: "Experience Level", key: EXPERIENCE_LEVEL_KEY, values: Object.keys(ExperienceLevel) },
]

// Vendor related configs
export const DATA_SOURCES = {
    linkedin: "LinkedIn",
    geeksforgeeks: "GeeksForGeeks",
    hackerrank: "HackerRank",
}
