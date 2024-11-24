import {
  ANGULAR,
  INDIA,
  MAX_PAGES,
  MAX_RETRIES,
} from "@/app/_lib/config/globals";
import { extractData } from "@/app/_lib/data-fetchers/extractData";
import { updateDB } from "@/app/_lib/data-fetchers/globals";
import {
  filterData,
  formatResponseMessage,
  generateURL,
} from "@/app/_lib/utils/globals";
import axios from "axios";
import { NextResponse } from "next/server";

export const maxDuration = 55;

export async function GET() {
  const keyword = ANGULAR;
  const location = INDIA;
  const startTime = new Date().getTime();
  const fetchPageWithRetry = async (page: number): Promise<any[]> => {
    let retries = 0;
    while (retries < MAX_RETRIES) {
      try {
        const { data } = await axios.get(generateURL(keyword, location, page));
        const extractedData = extractData(data, keyword);
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
  const endTime = new Date().getTime();
  return NextResponse.json(
    formatResponseMessage(updatedJobs.length, endTime - startTime),
    { status: 200 }
  );
}
