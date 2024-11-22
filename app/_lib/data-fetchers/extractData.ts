import * as cheerio from "cheerio"; // Ensure cheerio is installed
import moment from "moment";
import { ALLOWED_TIME_DIFF } from "../config/globals";
import { LinkedinScrapeJob } from "../declarations/globals";

export const extractData = (data: string, keyword: string) => {
  const $ = cheerio.load(data);
  const jobs: LinkedinScrapeJob[] = [];
  // Example selectors based on LinkedIn's structure (inspect and verify)
  $("li").each((index, element) => {
    const title = $(element).find(".base-search-card__title").text().trim();
    const company = $(element)
      .find(".base-search-card__subtitle")
      .text()
      .trim();
    const location = $(element)
      .find(".job-search-card__location")
      .text()
      .trim();
    const jobLink = $(element).find("a").attr("href") || "";
    const hiringStatus = $(element)
      .find(".job-posting-benefits__text")
      .text()
      .trim();
    const salary = $(element)
      .find(".job-search-card__salary-info")
      .text()
      .trim();
    const postedDate =
      $(element).find(".job-search-card__listdate--new").attr("datetime") ||
      $(element).find(".job-search-card__listdate").attr("datetime") ||
      "";
    const companyLogoURL =
      $(element).find(".artdeco-entity-image").attr("data-delayed-url") || "";

    if (title && company && location) {
      jobs.push({
        title,
        company,
        location,
        jobLink,
        postedDate,
        hiringStatus,
        salary,
        companyLogoURL,
        keyword,
        scrapedAt: new Date().toISOString(),
      });
    }
  });
  return jobs;
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
