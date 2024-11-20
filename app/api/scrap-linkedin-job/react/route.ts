import {
  INDIA,
  MAX_PAGES,
  MAX_RETRIES,
  REACT,
} from "@/app/_lib/config/globals";
import { extractData, filterData } from "@/app/_lib/data-fetchers/extractData";
import { updateDB } from "@/app/_lib/data-fetchers/globals";
import { generateURL } from "@/app/_lib/utils/globals";
import axios from "axios";
import { NextResponse } from "next/server";

export async function GET() {
  const keyword = REACT;
  const location = INDIA;
  const allResults = [];
  const startTime = new Date().getTime();
  for (let i = 1; i <= MAX_PAGES; i++) {
    let retries = 0;
    let success = false;
    while (retries < MAX_RETRIES && !success) {
      try {
        const { data } = await axios.get(generateURL(keyword, location, i));
        const extractedData = extractData(data, keyword);
        const filteredJobs = filterData(extractedData);
        allResults.push(...filteredJobs);
        success = true;
      } catch (error: any) {
        retries++;
        console.log(
          `Error fetching ${keyword} page ${i}, retry attempt ${retries}: ${error.message}`
        );
        if (retries > MAX_RETRIES) {
          console.log(
            `Max retries reached for ${keyword} for page ${i}. Skipping this page.`
          );
        }
      }
    }
  }
  const updatedJobs = await updateDB(allResults);
  const endTime = new Date().getTime();
  return NextResponse.json(
    {
      message: `Total ${updatedJobs.length} rows updated in DB`,
      timeTaken: endTime - startTime,
    },
    { status: 200 }
  );
}
