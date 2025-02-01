"use client";

import { jobs } from "@/docs/dummyJob";
import { useState } from "react";
import { FilterState } from "../_lib/declarations/globals";
import JobCard from "./components/JobCard";
import Pagination from "./components/Pagination";
import Searchbar from "./components/Searchbar";
import Sidebar from "./components/Sidebar";

const ITEMS_PER_PAGE = 4;

export default function JobListings() {
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<FilterState>({
    location: [],
    jobType: [],
    experience: [],
    salary: [],
  });

  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredJobs.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedJobs = filteredJobs.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const toggleFilter = (category: keyof FilterState, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter((item) => item !== value)
        : [...prev[category], value],
    }));
  };

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
            <div className="text-sm font-medium text-muted-foreground/80">
              Showing {paginatedJobs.length} of {filteredJobs.length} jobs
            </div>
            <div className="space-y-4">
              {paginatedJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
