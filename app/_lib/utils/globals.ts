import { PrismaClient } from "@prisma/client";
import moment from "moment";
import { ALLOWED_TIME_DIFF } from "../config/globals";
import { LinkedinScrapeJob } from "../declarations/globals";

export const prisma = new PrismaClient();

export const generateURL = (
  keyword: string,
  location: string,
  currentPage: number
) => {
  return `https://www.linkedin.com/jobs-guest/jobs/api/seeMoreJobPostings/search?keywords=${keyword}&location=${location}&page=${currentPage}&position=1&pageNum=0&start=0&sortBy=DD`;
};

export const filterData = (data: LinkedinScrapeJob[]) => {
  const filteredData = data.filter((job) => {
    const today = moment();
    const date2 = moment(job.postedDate);
    const diff = today.diff(date2, "days");
    return diff < ALLOWED_TIME_DIFF;
  });
  return filteredData;
};

export const formatResponseMessage = (count: number, timeTaken: number) => {
  return {
    message: "Total " + count + " rows updated in DB",
    timeTaken,
  };
};
