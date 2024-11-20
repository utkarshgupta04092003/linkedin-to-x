import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export const generateURL = (
  keyword: string,
  location: string,
  currentPage: number
) => {
  return `https://www.linkedin.com/jobs-guest/jobs/api/seeMoreJobPostings/search?keywords=${keyword}&location=${location}&page=${currentPage}&position=1&pageNum=0&start=0&sortBy=DD`;
};
