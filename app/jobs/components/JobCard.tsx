"use client"

import { SAVED_JOBS_ROUTE, TRACK_JOBS_ROUTE } from "@/app/_lib/config/endpoint"
import { useUser } from "@clerk/nextjs"
import {
    BookmarkIcon,
    CalendarIcon,
    CurrencyDollarIcon,
    MapPinIcon,
} from "@heroicons/react/24/outline"
import { BookmarkIcon as BookmarkFillIcon } from "@heroicons/react/24/solid"
import type { Jobs } from "@prisma/client"
import axios from "axios"
import Image from "next/image"
import Link from "next/link"
import type React from "react"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import useSWR, { mutate } from "swr"
import { TrackJobModal } from "./TrackJobModal"

interface JobCardProps {
    job: Jobs
}

type SavedJobs = {
    jobId: string
    savedAt: string
}

export default function JobCard({ job }: JobCardProps) {
    const user = useUser()
    const { data: savedJobs } = useSWR<SavedJobs[]>(user.isSignedIn ? SAVED_JOBS_ROUTE : null)
    const [savedJobsData, setSavedJobsData] = useState<SavedJobs[]>(savedJobs || [])
    const [isModalOpen, setIsModalOpen] = useState(false)

    useEffect(() => {
        savedJobs && setSavedJobsData(savedJobs || [])
    }, [savedJobs])

    const handleSaveJob = async () => {
        if (!user.isSignedIn) {
            toast.error("Please sign in to save jobs")
            return
        }
        const jobToSave = { jobId: job.id, savedAt: new Date().toISOString() }
        const isAlreadySaved = savedJobs?.find((savedJob) => savedJob.jobId === job.id)
        const optimisticData = isAlreadySaved
            ? savedJobs?.filter((j) => j.jobId !== job.id)
            : [...(savedJobs || []), jobToSave]
        try {
            const requestFn = isAlreadySaved
                ? async () => {
                      const res = await axios.delete(`${SAVED_JOBS_ROUTE}?id=${job.id}`)
                      toast.success(res.data.message)
                  }
                : async () => {
                      const res = await axios.post(SAVED_JOBS_ROUTE, { id: job.id })
                      toast.success(res.data.message)
                  }
            await mutate(SAVED_JOBS_ROUTE, requestFn, { optimisticData })
            setSavedJobsData(optimisticData || [])
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Something went wrong")
        }
    }

    const handleTitleClick = (e: React.MouseEvent) => {
        // Don't prevent default so the link still works
        setIsModalOpen(true)
    }

    const handleJobApplied = async () => {
        try {
            await axios.post(TRACK_JOBS_ROUTE, { jobId: job.id })
            toast.success("Application tracked successfully!")
            setIsModalOpen(false)
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to track application")
        }
    }

    return (
        <>
            <div className="dark:bg-bg-secondary-dark rounded-rounded-primary shadow-sm border border-border-primary-light dark:border-none p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                    <Image
                        src={job.companyLogoURL || ""}
                        width={48}
                        height={48}
                        unoptimized={true}
                        alt={`${job.company} logo`}
                        className="w-12 h-12 rounded-rounded-full object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <h2 className="text-lg font-semibold text-text-primary-light dark:text-text-primary-dark">
                                    <Link
                                        href={`/shortly/${job.id}`}
                                        className="hover:text-blue-500 transition-colors"
                                        target="_blank"
                                        onClick={handleTitleClick}
                                        rel="noreferrer"
                                    >
                                        {job.title}
                                    </Link>
                                </h2>
                                <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                                    {job.company}
                                </p>
                            </div>
                            <div
                                className="flex items-center gap-2 cursor-pointer"
                                onClick={handleSaveJob}
                            >
                                {savedJobsData?.map((job) => job.jobId).includes(job.id) ? (
                                    <BookmarkFillIcon className="h-5 w-5 text-blue-500 dark:text-blue-400" />
                                ) : (
                                    <BookmarkIcon className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                                )}
                            </div>
                            {/* <div className="flex items-center gap-2">
                                {job.isLinkedInPosted && (
                                <span className="inline-flex items-center rounded-md bg-blue-50 dark:bg-blue-900/30 px-2 py-1 text-xs font-medium text-blue-700 dark:text-blue-400 ring-1 ring-inset ring-blue-700/10 dark:ring-blue-400/30">
                                    LinkedIn
                                </span>
                                )}
                                {job.isTelegramPosted && (
                                <span className="inline-flex items-center rounded-md bg-sky-50 dark:bg-sky-900/30 px-2 py-1 text-xs font-medium text-sky-700 dark:text-sky-400 ring-1 ring-inset ring-sky-700/10 dark:ring-sky-400/30">
                                    Telegram
                                </span>
                                )}
                            </div> */}
                        </div>
                        <div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
                            <div className="flex items-center gap-1">
                                <MapPinIcon className="h-4 w-4" />
                                <span>{job.location}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <CalendarIcon className="h-4 w-4" />
                                <span>{job.postedDate}</span>
                            </div>
                            {job.salary && (
                                <div className="flex items-center gap-1">
                                    <CurrencyDollarIcon className="h-4 w-4" />
                                    <span>{job.salary}</span>
                                </div>
                            )}
                        </div>
                        <div className="flex items-center flex-wrap gap-2 mt-4">
                            {job.hiringStatus && (
                                <span className="inline-flex items-center rounded-md bg-green-50 dark:bg-green-900/30 px-2 py-1 text-xs font-medium text-green-700 dark:text-green-400 ring-1 ring-inset ring-green-600/20 dark:ring-green-400/30">
                                    {job.hiringStatus}
                                </span>
                            )}
                            {job.jobType && (
                                <span className="inline-flex items-center rounded-md bg-blue-50 dark:bg-blue-900/30 px-2 py-1 text-xs font-medium text-blue-700 dark:text-blue-400 ring-1 ring-inset ring-blue-700/10 dark:ring-blue-400/30">
                                    {job.jobType}
                                </span>
                            )}
                            {job.workMode && (
                                <span className="inline-flex items-center rounded-md bg-sky-50 dark:bg-sky-900/30 px-2 py-1 text-xs font-medium text-sky-700 dark:text-sky-400 ring-1 ring-inset ring-sky-700/10 dark:ring-sky-400/30">
                                    {job.workMode}
                                </span>
                            )}
                            {job.experienceLevel && (
                                <span className="inline-flex items-center rounded-md bg-sky-50 dark:bg-sky-900/30 px-2 py-1 text-xs font-medium text-sky-700 dark:text-sky-400 ring-1 ring-inset ring-sky-700/10 dark:ring-sky-400/30">
                                    {job.experienceLevel}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <TrackJobModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onApplied={handleJobApplied}
            />
        </>
    )
}
