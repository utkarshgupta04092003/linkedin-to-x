import { Job } from "@prisma/client";
import { prisma } from "../utils/globals";

export async function updateDB(jobs: Job[]) {
  const jobsAdded: Job[] = [];
  const promises = jobs.map(async (job) => {
    const jobData = {
      title: job.title,
      company: job.company,
      location: job.location,
      jobLink: job.jobLink,
      postedDate: job.postedDate,
      hiringStatus: job.hiringStatus,
      salary: job.salary,
      scrapedAt: job.scrapedAt,
      pageNumber: job.pageNumber,
      companyLogoURL: job.companyLogoURL,
    };
    try {
      const jobDoc = await prisma.job.upsert({
        where: {
          JobUniqueIndex: {
            title: job.title,
            company: job.company,
            location: job.location,
          },
        },
        create: jobData,
        update: jobData,
      });
      jobsAdded.push(jobDoc);
    } catch (error) {
      console.log("Error in updating the database:", error);
    }
  });

  await Promise.all(promises);
  return jobsAdded;
}
