"use client"

import { ArrowRightIcon, DocumentTextIcon } from "@heroicons/react/24/outline"
import { TrackJobStatus } from "@prisma/client"
import Link from "next/link"

export function EmptyState({ stage }: { stage: TrackJobStatus }) {
    return (
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
            <div className="bg-gray-200 dark:bg-gray-800 rounded-full p-4 mb-4">
                <DocumentTextIcon className="h-8 w-8 text-blue-500 dark:text-blue-400" />
            </div>
            <h3 className="text-xl font-medium text-text-primary-light dark:text-text-primary-dark mb-2">
                {messages[stage]}
            </h3>
            <p className="text-text-secondary-light dark:text-text-secondary-dark mb-6 max-w-md">
                Explore recommended ones to find some you'd like!
            </p>
            {/* TODO: Add link to recommanded-jobs page */}
            <Link
                href="/jobs"
                className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md font-medium transition-colors"
            >
                <span>View recommended jobs</span>
                <ArrowRightIcon className="h-4 w-4" />
            </Link>
        </div>
    )
}

const messages = {
    [TrackJobStatus.Applied]: "You haven't applied to any jobs yet.",
    [TrackJobStatus.Interviewing]: "Not interviewing for any jobs yet.",
    [TrackJobStatus.OfferReceived]: "No offer received yet?",
    [TrackJobStatus.Rejected]: "No jobs are marked as rejected.",
    [TrackJobStatus.Archived]: "No jobs are marked as archived.",
    [TrackJobStatus.NoResponse]: "No jobs are waiting for a response.",
}
