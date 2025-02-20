import {
    BookmarkIcon,
    CalendarIcon,
    CurrencyDollarIcon,
    MapPinIcon,
} from "@heroicons/react/24/outline"
import { Jobs } from "@prisma/client"
import Image from "next/image"
import Link from "next/link"

interface JobCardProps {
    job: Jobs
}

export default function JobCard({ job }: JobCardProps) {
    return (
        <div className=" dark:bg-bg-secondary-dark rounded-rounded-primary shadow-sm border border-border-primary-light dark:border-none p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4">
                <Image
                    src={job.companyLogoURL || "/placeholder.svg"}
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
                                >
                                    {job.title}
                                </Link>
                            </h2>
                            <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                                {job.company}
                            </p>
                        </div>
                        <div className="flex items-center gap-2 cursor-pointer">
                            <BookmarkIcon className="h-5 w-5" />
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
    )
}
