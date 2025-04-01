"use client"

import { TrackJobStatus } from "@prisma/client"
import { useEffect, useState } from "react"
import useSWR from "swr"
import { TRACK_JOBS_ROUTE } from "../_lib/config/endpoint"
import { EnrichedTrackJobs } from "../_lib/declarations/globals"
import { EmptyState } from "./components/EmptyState"
import { TrackJobCard } from "./components/TrackJobCard"
import { TrackJobNav } from "./components/TrackJobNav"

export default function JobTrackerPage() {
    const { data: jobData } = useSWR<EnrichedTrackJobs[]>(`${TRACK_JOBS_ROUTE}?detail=true`)
    const [jobs, setJobs] = useState<EnrichedTrackJobs[]>([])
    const [activeStage, setActiveStage] = useState<TrackJobStatus>(TrackJobStatus.Applied)
    const allStages = Object.keys(TrackJobStatus) as TrackJobStatus[]
    useEffect(() => {
        if (jobData) setJobs(jobData)
    }, [jobData])

    const stageCounts = jobs.reduce((counts, job) => {
        counts[job.jobStatus] = (counts[job.jobStatus] || 0) + 1
        return counts
    }, {} as Record<TrackJobStatus, number>)
    const stagesWithCounts = allStages.map((stage) => ({
        stage,
        count: stageCounts[stage] || 0,
    }))
    let filteredJobs = jobs.filter((job) => job.jobStatus === activeStage)

    const handleStageChange = (stage: TrackJobStatus) => {
        setActiveStage(stage)
        filteredJobs = jobs.filter((job) => job.jobStatus === stage)
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <h1 className="text-2xl font-bold mb-6 text-text-primary-light dark:text-text-primary-dark">
                Track your applications
            </h1>
            <div className="bg-gray-100 dark:bg-bg-secondary-dark rounded-lg overflow-hidden">
                <TrackJobNav
                    stages={stagesWithCounts}
                    activeStage={activeStage}
                    onStageChange={handleStageChange}
                />
                {filteredJobs.length > 0 ? (
                    <div className="divide-y divide-border-primary-light dark:divide-border-primary-dark">
                        {filteredJobs.map((job) => (
                            <TrackJobCard key={job.id} activeStage={activeStage} job={job} />
                        ))}
                    </div>
                ) : (
                    <EmptyState stage={activeStage} />
                )}
            </div>
        </div>
    )
}
