import { FILTER_GROUP, LOCATION_KEY } from "@/app/_lib/config/globals"
import { FilterState } from "@/app/_lib/declarations/globals"
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline"
import React from "react"

type SidebarProps = {
    showFilters: boolean
    setShowFilters: React.Dispatch<React.SetStateAction<boolean>>
    filters: FilterState
    toggleFilter: (category: keyof FilterState, value: string) => void
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
                        {FILTER_GROUP.map((currentFilter) => (
                            <div>
                                <h3 className="font-semibold text-lg dark:text-background/80 mb-4 ">
                                    {currentFilter.label}
                                </h3>
                                <div className="space-y-2">
                                    {currentFilter.values.map((value) => (
                                        <label key={value} className="flex items-center">
                                            <input
                                                type="checkbox"
                                                className="rounded-md border-input/50 h-4 w-4 text-primary transition-all"
                                                checked={filters[
                                                    currentFilter.key as keyof FilterState
                                                ].includes(value)}
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
                                    {/* TODO: write a way to open searchbar for location */}
                                    {currentFilter.key === LOCATION_KEY && (
                                        <div
                                            onClick={() => console.log(currentFilter)}
                                            className="flex items-center text-sm text-blue-500 cursor-pointer select-none"
                                        >
                                            See more
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
