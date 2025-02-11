"use client"

import { Jobs } from "@prisma/client"
import { useEffect, useState } from "react"
import useSWR from "swr"
import {
    EXPERIENCE_LEVEL_KEY,
    JOBS_PER_PAGE,
    JOB_TYPE_KEY,
    LOCATION_KEY,
    POSTED_DATE_RANGE_KEY,
    WORK_MODE_KEY,
} from "../_lib/config/globals"
import { FilterState } from "../_lib/declarations/globals"
import JobCard from "./components/JobCard"
import Pagination from "./components/Pagination"
import Searchbar from "./components/Searchbar"
import Sidebar from "./components/Sidebar"

type JobListingProps = {
    data: Jobs[]
    count: number
}

export default function JobListings() {
    const [showFilters, setShowFilters] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [searchTerm, setSearchTerm] = useState("")
    const [filters, setFilters] = useState<FilterState>({
        [LOCATION_KEY]: [],
        [JOB_TYPE_KEY]: [],
        [WORK_MODE_KEY]: [],
        [POSTED_DATE_RANGE_KEY]: {
            startDate: null,
            endDate: null,
        },
        [EXPERIENCE_LEVEL_KEY]: [],
    })
    const url = `/api/v1/filter-jobs?${new URLSearchParams({
        query: searchTerm.trim(),
        page: currentPage.toString(),
        location: filters[LOCATION_KEY].join(","),
        jobType: filters[JOB_TYPE_KEY].join(","),
        workMode: filters[WORK_MODE_KEY].join(","),
        experience: filters.experience.join(","),
        startPostedDate: filters.dateRange.startDate?.toString() || "",
        endPostedDate: filters.dateRange.endDate?.toString() || "",
    })}`
    const { data } = useSWR<JobListingProps>(url)
    const jobs = data?.data
    const totalJobs = data?.count
    const resultIndex =
        currentPage === 1
            ? `1-${Math.min(JOBS_PER_PAGE, jobs!?.length)}`
            : `${(currentPage - 1) * JOBS_PER_PAGE + 1} - ${Math.min(
                  JOBS_PER_PAGE * currentPage,
                  totalJobs!
              )}`
    const totalPages = Math.ceil((data?.count ?? 1) / JOBS_PER_PAGE)
    const toggleFilter = (
        category: keyof FilterState,
        value: string,
        subCategory?: "startDate" | "endDate"
    ) => {
        setFilters((prev) => ({
            ...prev,
            [category]:
                category === POSTED_DATE_RANGE_KEY
                    ? { ...prev[category], [subCategory!]: value }
                    : prev[category].includes(value)
                    ? prev[category].filter((item) => item !== value)
                    : [...prev[category], value],
        }))
    }
    useEffect(() => {
        setCurrentPage(1)
    }, [filters])

    return (
        <div className="min-h-screen bg-background-secondary ">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex flex-col md:flex-row gap-8">
                    <Sidebar
                        showFilters={showFilters}
                        setShowFilters={setShowFilters}
                        filters={filters}
                        toggleFilter={toggleFilter}
                    />
                    <div className="flex-1 space-y-6">
                        <Searchbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                        {jobs?.length === 0 ? (
                            <div className="text-center text-muted-foreground/80">
                                No jobs found
                            </div>
                        ) : (
                            <>
                                <div className="text-sm font-medium text-muted-foreground/80">
                                    Showing {resultIndex} of {totalJobs} jobs
                                </div>
                                <div className="space-y-4">
                                    {jobs?.map((job) => (
                                        <JobCard key={job.id} job={job} />
                                    ))}
                                </div>
                                <Pagination
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    setCurrentPage={setCurrentPage}
                                />
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
