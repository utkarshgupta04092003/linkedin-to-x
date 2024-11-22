import { Jobs } from "@prisma/client";
import { prisma } from "../utils/globals";

export async function updateDB(jobs: Omit<Jobs, "id">[]) {
  const jobsAdded: Jobs[] = [];
  const promises = jobs.map(async (job) => {
    try {
      const jobDoc = await prisma.jobs.upsert({
        where: {
          JobUniqueIndex: {
            title: job.title,
            company: job.company,
            location: job.location,
          },
        },
        create: job,
        update: job,
      });
      jobsAdded.push(jobDoc);
    } catch (error) {
      console.log("Error in updating the database:", error);
    }
  });

  await Promise.all(promises);
  return jobsAdded;
}
