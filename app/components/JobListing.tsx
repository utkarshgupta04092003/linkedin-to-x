"use client";

import { Jobs } from "@prisma/client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaBriefcase, FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";

export default function JobListings() {
  const [jobs, setJobs] = useState<Jobs[]>([]);

  useEffect(() => {
    async function fetchJobs() {
      try {
        const response = await fetch("/api/get-jobs");
        if (!response.ok) {
          throw new Error("Failed to fetch jobs");
        }
        const data = await response.json();
        setJobs(data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    }

    fetchJobs();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl text-black font-bold mb-8 text-center">
        Latest Job Listings
      </h1>
      <p className="text-black">Total Jobs: {jobs?.length}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job, index) => (
          <motion.div
            key={job.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 mr-4 relative">
                  <Image
                    src={job.companyLogoURL!}
                    alt={`${job.company} logo`}
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">{job.title}</h2>
                  <p className="text-gray-600">{job.company}</p>
                </div>
              </div>
              <div className="mb-4">
                <p className="flex items-center text-gray-600 mb-2">
                  <FaMapMarkerAlt className="mr-2" />
                  {job.location}
                </p>
                <p className="flex items-center text-gray-600 mb-2">
                  <FaCalendarAlt className="mr-2" />
                  Posted on {job.postedDate?.split("T")[0]}
                </p>
                <p className="flex items-center text-gray-600">
                  <FaBriefcase className="mr-2" />
                  {job.hiringStatus === ""
                    ? "Actively Hiring"
                    : job.hiringStatus}
                </p>
              </div>
              <a
                href={job.jobLink}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors duration-300"
              >
                Apply Now
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
