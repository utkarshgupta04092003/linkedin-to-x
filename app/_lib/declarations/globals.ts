import { Jobs } from "@prisma/client";

export type LinkedinScrapeJob = Omit<
  Jobs,
  | "id"
  | "updatedAt"
  | "isXPosted"
  | "isSimilarJobsUpdated"
  | "isTelegramPosted"
  | "visitCount"
  | "isLinkedInPosted"
  | "isInstagramPosted"
>;

export type FilterState = {
  location: string[];
  jobType: string[];
  experience: string[];
  salary: string[];
};
