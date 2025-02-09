import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import React from "react"

export default function Searchbar({
    searchTerm,
    setSearchTerm,
}: {
    searchTerm: string
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>
}) {
    return (
        <div className="relative">
            <div className="relative rounded-rounded-primary border backdrop-blur-sm shadow-sm transition-all focus-within:shadow-md hover:shadow-md border-gray-300 dark:border-gray-700">
                <input
                    type="search"
                    placeholder="Search jobs by title or company..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3.5  focus:outline-none rounded-rounded-primary"
                />
                <MagnifyingGlassIcon className="absolute left-3 top-4 h-5 w-5 text-muted-foreground stroke-gray-400" />
            </div>
        </div>
    )
}
