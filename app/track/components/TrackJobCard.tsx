import { TRACK_JOBS_ROUTE } from "@/app/_lib/config/endpoint"
import { EnrichedTrackJobs } from "@/app/_lib/declarations/globals"
import { startCase } from "@/app/_lib/utils/globals"
import {
    BriefcaseIcon,
    BuildingOfficeIcon,
    ChevronDownIcon,
    CurrencyDollarIcon,
    MapPinIcon,
    PresentationChartBarIcon,
} from "@heroicons/react/24/outline"
import { TrackJobs, TrackJobStatus } from "@prisma/client"
import axios from "axios"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import toast from "react-hot-toast"
import useSWR, { mutate } from "swr"

interface JobCardProps {
    activeStage: TrackJobStatus
    job: EnrichedTrackJobs
}

export function TrackJobCard({ job, activeStage }: JobCardProps) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)
    const { data: trackJobs } = useSWR<TrackJobs[]>(TRACK_JOBS_ROUTE)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    async function updateJobStatus(jobId: string, jobStatus: TrackJobStatus) {
        try {
            const optimisticData = trackJobs?.map((job) =>
                job.jobId === jobId ? { ...job, jobStatus } : job
            )
            await mutate(
                TRACK_JOBS_ROUTE,
                async () => {
                    await axios.patch(TRACK_JOBS_ROUTE, {
                        jobId,
                        jobStatus,
                    })
                },
                { optimisticData }
            )
            await mutate(`${TRACK_JOBS_ROUTE}?detail=true`)
            toast.success("Application status updated!")
            setIsDropdownOpen(false)
        } catch (error) {
            toast.error("Error updating job status")
        }
    }

    return (
        <div className="p-6 relative">
            <div className="flex gap-6">
                {/* Left side - Logo */}
                <div className="flex-shrink-0">
                    <Image
                        src={job.jobs.companyLogoURL || "/placeholder.svg"}
                        alt={`${job.jobs.company} logo`}
                        width={48}
                        height={48}
                        unoptimized={true}
                        className="w-12 h-12 rounded-rounded-full object-cover flex-shrink-0"
                    />
                </div>
                {/* Middle - Job details */}
                <div className="flex-1">
                    {/* Top row - Posted date and early applicant tag */}
                    <div className="flex items-center gap-4 mb-2">
                        <span className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                            Posted on: {job?.jobs.postedDate?.toString()}
                        </span>
                        {job.jobs.hiringStatus && (
                            <span className="text-sm bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-0.5 rounded">
                                {job.jobs.hiringStatus}
                            </span>
                        )}
                    </div>
                    {/* Job title and company */}
                    <h3 className="text-xl font-semibold text-text-primary-light dark:text-text-primary-dark mb-1">
                        <Link
                            href={`/shortly/${job.jobId}`}
                            className="hover:text-blue-500 transition-colors"
                            target="_blank"
                            rel="noreferrer"
                        >
                            {job.jobs.title}
                        </Link>
                    </h3>
                    <div className="text-sm text-text-secondary-light dark:text-text-secondary-dark mb-4">
                        {job.jobs.company}
                    </div>
                    {/* Job details grid */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-y-3 gap-x-6 mb-4">
                        {job.jobs.location && (
                            <div className="flex items-center gap-2 text-sm text-text-secondary-light dark:text-text-secondary-dark">
                                <MapPinIcon className="h-5 w-5" />
                                <span>{job.jobs.location}</span>
                            </div>
                        )}
                        {job.jobs.jobType && (
                            <div className="flex items-center gap-2 text-sm text-text-secondary-light dark:text-text-secondary-dark">
                                <BriefcaseIcon className="h-5 w-5" />
                                <span>{job.jobs.jobType}</span>
                            </div>
                        )}
                        {job.jobs.workMode && (
                            <div className="flex items-center gap-2 text-sm text-text-secondary-light dark:text-text-secondary-dark">
                                <BuildingOfficeIcon className="h-5 w-5" />
                                <span>{job.jobs.workMode}</span>
                            </div>
                        )}
                        {job.jobs.experienceLevel && (
                            <div className="flex items-center gap-2 text-sm text-text-secondary-light dark:text-text-secondary-dark">
                                <PresentationChartBarIcon className="h-5 w-5" />
                                <span>{job.jobs.experienceLevel}</span>
                            </div>
                        )}
                        {job.jobs.salary && (
                            <div className="flex items-center gap-2 text-sm text-text-secondary-light dark:text-text-secondary-dark">
                                <CurrencyDollarIcon className="h-5 w-5" />
                                <span>{job.jobs.salary}</span>
                            </div>
                        )}
                    </div>
                    {/* Applied date and actions */}
                    <div className="flex items-center justify-between mt-4">
                        <div className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                            {job.statusUpdatedAt
                                ? `Marked as "${startCase(activeStage)}" on: ${
                                      job.statusUpdatedAt.toString().split("T")[0]
                                  }`
                                : `Applied on: ${job.appliedAt.toString().split("T")[0]}`}
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="relative" ref={dropdownRef}>
                                <button
                                    className="flex items-center gap-1 bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 px-4 py-2 rounded-md text-sm font-medium text-text-primary-light dark:text-text-primary-dark transition-colors"
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                >
                                    <span>{job.jobStatus}</span>
                                    <ChevronDownIcon className="h-4 w-4 ml-1" />
                                </button>
                                {isDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-bg-secondary-dark border border-border-primary-light dark:border-border-primary-dark rounded-md shadow-lg z-10">
                                        <div className="py-1">
                                            {Object.keys(TrackJobStatus).map((stage) => (
                                                <button
                                                    key={stage}
                                                    className={`w-full text-left px-4 py-2 text-sm ${
                                                        job.jobStatus === stage
                                                            ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400"
                                                            : "text-text-primary-light dark:text-text-primary-dark hover:bg-gray-100 dark:hover:bg-gray-800 z-11"
                                                    }`}
                                                    onClick={() =>
                                                        updateJobStatus(
                                                            job.jobId,
                                                            stage as TrackJobStatus
                                                        )
                                                    }
                                                >
                                                    {startCase(stage)}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
