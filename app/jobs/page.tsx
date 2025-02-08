"use client"

import { Jobs } from "@prisma/client"
import { useState } from "react"
import useSWR from "swr"
import { FilterState } from "../_lib/declarations/globals"
import JobCard from "./components/JobCard"
import Pagination from "./components/Pagination"
import Searchbar from "./components/Searchbar"
import Sidebar from "./components/Sidebar"

type JobListingProps = {
    data: Jobs[]
    count: number
}
const ITEMS_PER_PAGE = 10

export default function JobListings() {
    const [showFilters, setShowFilters] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [searchTerm, setSearchTerm] = useState("")
    const [filters, setFilters] = useState<FilterState>({
        location: [],
        jobType: [],
        experience: [],
        salary: [],
    })
    const { data } = useSWR<JobListingProps>(
        `/api/v1/filter-jobs?query=${searchTerm.trim()}&page=${currentPage}&perPage=${ITEMS_PER_PAGE}`
    )
    const jobs = data?.data
    const totalJobs = data?.count
    const resultIndex =
        currentPage === 1
            ? `1-${Math.min(ITEMS_PER_PAGE, jobs!?.length)}`
            : `${(currentPage - 1) * ITEMS_PER_PAGE + 1} - ${Math.min(
                  ITEMS_PER_PAGE * currentPage,
                  totalJobs!
              )}`
    const totalPages = Math.ceil((data?.count ?? 1) / ITEMS_PER_PAGE)
    const toggleFilter = (category: keyof FilterState, value: string) => {
        setFilters((prev) => ({
            ...prev,
            [category]: prev[category].includes(value)
                ? prev[category].filter((item) => item !== value)
                : [...prev[category], value],
        }))
    }
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
