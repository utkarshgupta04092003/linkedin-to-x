import { startCase } from "@/app/_lib/utils/globals"
import { TrackJobStatus } from "@prisma/client"

interface JobStageNavProps {
    stages: { stage: TrackJobStatus; count: number }[]
    activeStage: TrackJobStatus
    onStageChange: (stage: TrackJobStatus) => void
}

export function TrackJobNav({ stages, activeStage, onStageChange }: JobStageNavProps) {
    return (
        <div className="flex overflow-x-auto border-b border-border-primary-light dark:border-border-primary-dark scrollbar-hide">
            {stages.map(({ stage, count }) => (
                <button
                    key={stage}
                    onClick={() => onStageChange(stage)}
                    className={`px-6 py-4 font-medium whitespace-nowrap transition-colors ${
                        activeStage === stage
                            ? "border-b-2 border-blue-500 text-blue-500"
                            : "text-text-secondary-light dark:text-text-secondary-dark hover:text-text-primary-light dark:hover:text-text-primary-dark"
                    }`}
                >
                    {startCase(stage)} ({count})
                </button>
            ))}
        </div>
    )
}
