import { FILTER_GROUP, POSTED_DATE_RANGE_KEY } from "@/app/_lib/config/globals"
import { FilterState } from "@/app/_lib/declarations/globals"
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline"
import React from "react"

type SidebarProps = {
    showFilters: boolean
    setShowFilters: React.Dispatch<React.SetStateAction<boolean>>
    filters: FilterState
    toggleFilter: (
        category: keyof FilterState,
        value: string,
        subCategory?: "startDate" | "endDate"
    ) => void
}

export default function Sidebar({
    showFilters,
    setShowFilters,
    filters,
    toggleFilter,
}: SidebarProps) {
    return (
        <div className="md:w-72 flex-shrink-0">
            <div className="sticky top-24">
                {/* Mobile filter button */}
                <div className="md:hidden mb-6">
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="flex items-center justify-center w-full gap-2 px-4 py-3 text-md font-medium rounded-xl border dark:border-gray-700  hover:text-accent-foreground transition-all shadow-sm hover:shadow-md"
                    >
                        <AdjustmentsHorizontalIcon className="h-5 w-5" />
                        <span>Filters {showFilters ? "(Hide)" : "(Show)"}</span>
                    </button>
                </div>
                {/* Filter sections */}
                <div
                    className={`space-y-6 ${showFilters ? "block" : "hidden md:block"} 
        animate-in slide-in-from-left-1/4 duration-300 md:animate-none`}
                >
                    <div className="rounded-rounded-primary border border-gray-100 dark:border-none dark:bg-bg-secondary-dark backdrop-blur-sm p-6 space-y-8 shadow-sm">
                        <div>
                            <h3 className="font-semibold text-foreground/90 mb-4 text-base">
                                Date Posted
                            </h3>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="block text-sm text-muted-foreground">
                                        From
                                    </label>
                                    <input
                                        type="date"
                                        value={filters.dateRange.startDate || ""}
                                        onChange={(e) =>
                                            toggleFilter(
                                                POSTED_DATE_RANGE_KEY,
                                                e.target.value,
                                                "startDate"
                                            )
                                        }
                                        max={filters.dateRange.endDate || undefined}
                                        className="w-full rounded-md border-input/50 bg-background px-3 py-2 text-sm text-foreground shadow-sm focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background transition-all hover:bg-accent/50"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm text-muted-foreground">
                                        To
                                    </label>
                                    <input
                                        type="date"
                                        value={filters.dateRange.endDate || ""}
                                        onChange={(e) =>
                                            toggleFilter(
                                                POSTED_DATE_RANGE_KEY,
                                                e.target.value,
                                                "endDate"
                                            )
                                        }
                                        min={filters.dateRange.startDate || undefined}
                                        className="w-full rounded-md border-input/50 bg-background px-3 py-2 text-sm text-foreground shadow-sm focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background transition-all hover:bg-accent/50"
                                    />
                                </div>
                            </div>
                        </div>
                        {FILTER_GROUP.map((currentFilter) => {
                            const filterValue = filters[currentFilter.key as keyof FilterState]

                            return (
                                <div key={currentFilter.key}>
                                    <h3 className="font-semibold text-lg dark:text-background/80 mb-4 ">
                                        {currentFilter.label}
                                    </h3>
                                    <div className="space-y-2">
                                        {currentFilter.values.map((value) => (
                                            <label key={value} className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    className="rounded-md border-input/50 h-4 w-4 text-primary transition-all"
                                                    checked={
                                                        Array.isArray(filterValue)
                                                            ? filterValue.includes(value)
                                                            : false
                                                    }
                                                    onChange={() =>
                                                        toggleFilter(
                                                            currentFilter.key as keyof FilterState,
                                                            value
                                                        )
                                                    }
                                                />
                                                <span className="ml-2 text-base text-text-secondary-light dark:text-text-secondary-dark cursor-pointer select-none">
                                                    {value}
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}
