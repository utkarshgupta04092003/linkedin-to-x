import {
    extractSimilarJobsData,
    fetchData,
  } from "@/app/_lib/data-fetchers/extractData";
  import { filterData } from "@/app/_lib/utils/globals";
  import { NextResponse } from "next/server";
  export async function GET(request: Request) {
    try {
      // fetch 3 jobs which has isSimilarJobsUpdated as false
      const salary = await scrapSimilarJobs();
      console.log(salary);
      return NextResponse.json(salary);
    } catch (error) {
      console.log("error", error);
      return NextResponse.json({ message: "Internal Server Error" });
    }
  }
  
  const scrapSimilarJobs = async () => {
    try {
      const resData = await fetchData(
        "https://in.linkedin.com/jobs/view/node-js-developer-fresher-at-superworks-4076562275?refId=Td9%2B5Xk2AnYvEpGgghgh0g%3D%3D&trackingId=m72rozfGPWzwWfujgHhMfw%3D%3D",
        5
      );
  
      const data = await extractSimilarJobsData(resData, "REACT");
      const filteredData = filterData(data);
      return filteredData;
    } catch (error: any) {
      console.log("error", error);
      throw error;
    }
  };
  