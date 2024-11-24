import { Jobs } from "@prisma/client";
import axios from "axios";
import { MAX_PAGES, MAX_RETRIES } from "../config/globals";
import { LinkedinScrapeJob } from "../declarations/globals";
import { filterData, generateURL, prisma } from "../utils/globals";
import { extractData } from "./extractData";

export const scrapJobs = async (keyword: string, location: string) => {
  const fetchPageWithRetry = async (page: number): Promise<any[]> => {
    let retries = 0;
    while (retries < MAX_RETRIES) {
      try {
        const { data } = await axios.get(generateURL(keyword, location, page));
        const extractedData = await extractData(data);
        return filterData(extractedData);
      } catch (error: any) {
        retries++;
        console.log(
          `Error fetching ${keyword} page ${page}, retry attempt ${retries}: ${error.message}`
        );
        if (retries >= MAX_RETRIES) {
          console.log(
            `Max retries reached for ${keyword} for page ${page}. Skipping this page.`
          );
        }
      }
    }
    return [];
  };
  const fetchPromises = Array.from({ length: MAX_PAGES }, (_, i) =>
    fetchPageWithRetry(i + 1)
  );
  const allPagesResults = await Promise.all(fetchPromises);
  const allResults = allPagesResults.flat();
  const updatedJobs = await updateDB(allResults);
  return updatedJobs;
};

export async function updateDB(jobs: LinkedinScrapeJob[]) {
  const jobsAdded: Jobs[] = [];
  const promises = jobs.map(async (job) => {
    try {
      const jobDoc = await prisma.jobsTemp.upsert({
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
