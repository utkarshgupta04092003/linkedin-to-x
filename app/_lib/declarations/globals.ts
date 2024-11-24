import { Jobs } from "@prisma/client";

export type LinkedinScrapeJob = Omit<
  Jobs,
  "id" | "updatedAt" | "isXPosted" | "isscored" | "isSimilarJobsUpdated"
>;
