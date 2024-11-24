import {
  extractSimilarJobsData,
  fetchData,
} from "@/app/_lib/data-fetchers/extractData";
import { updateDB } from "@/app/_lib/data-fetchers/globals";
import {
  filterData,
  formatResponseMessage,
  prisma,
} from "@/app/_lib/utils/globals";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const startTime = new Date().getTime();
    const scrapedJobs = await scrapSimilarJobs();
    const endTime = new Date().getTime();
    return NextResponse.json(
      formatResponseMessage(scrapedJobs.length, endTime - startTime),
      { status: 200 }
    );
  } catch (error) {
    console.log("error", error);
    return NextResponse.json({ message: "Internal Server Error" });
  }
}

const scrapSimilarJobs = async () => {
  const scrapedData: any[] = [];
  const successJobs: string[] = [];
  const companyData = await prisma.jobsTemp.findMany({
    where: {
      isSimilarJobsUpdated: false,
    },
    select: {
      id: true,
      jobLink: true,
    },
    take: 3,
  });
  const promises = companyData.map(async (data) => {
    try {
      const resData = await fetchData(data.jobLink, 10);
      const extractedData = await extractSimilarJobsData(resData);
      const filteredData = filterData(extractedData);
      scrapedData.push(...filteredData);
      successJobs.push(data.id);
    } catch (error: any) {
      console.log(
        `Error in scraping similar jobs for jobLink ${data.jobLink}:`,
        error.message
      );
    }
  });
  await Promise.all(promises);
  await updateDB(scrapedData);
  await prisma.jobsTemp.updateMany({
    where: {
      id: {
        in: successJobs,
      },
    },
    data: {
      isSimilarJobsUpdated: true,
    },
  });
  return scrapedData;
};
