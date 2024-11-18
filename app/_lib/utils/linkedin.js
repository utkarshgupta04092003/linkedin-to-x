import moment from "moment"; // Import moment.js to handle date comparisons easily
import puppeteer from "puppeteer";

class LinkedInJobScraper {
  constructor() {
    this.browser = null;
    this.page = null;
    this.retries = 10;
    this.allowedTimeDiff = 7; // Allowed time difference in days
  }

  async initialize() {
    try {
      this.browser = await puppeteer.launch({
        headless: false,
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
      });
      this.page = await this.browser.newPage();

      // Set viewport and user agent
      await this.page.setViewport({ width: 1280, height: 800 });
      await this.page.setUserAgent(
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
      );
    } catch (error) {
      console.error("Error initializing scraper:", error);
      throw error;
    }
  }

  async close() {
    if (this.browser) {
      await this.browser.close();
    }
  }

  constructUrl(keyword, location, page) {
    const searchParams = new URLSearchParams({
      keywords: keyword,
      location: location,
      page: page,
      position: 1,
      pageNum: 0,
      start: (page - 1) * 25,
      sortBy: "DD",
    });

    return `https://www.linkedin.com/jobs-guest/jobs/api/seeMoreJobPostings/search?${searchParams}`;
  }

  // Helper function to determine if a job is older than a week
  isOlderThanOneWeek(postedDate) {
    const today = moment();
    const date2 = moment(postedDate);
    const diff = today.diff(date2, "days");
    return diff < this.allowedTimeDiff;
  }

  async extractJobDetails() {
    return await this.page.evaluate(() => {
      const jobs = [];
      const jobCards = document.querySelectorAll(".base-card");

      jobCards.forEach((card) => {
        try {
          // Extract job details
          const title =
            card
              .querySelector(".base-search-card__title")
              ?.textContent.trim() || "";
          const company =
            card.querySelector(".hidden-nested-link")?.textContent.trim() || "";
          const location =
            card
              .querySelector(".job-search-card__location")
              ?.textContent.trim() || "";
          const jobLink =
            card.querySelector(".base-card__full-link")?.href || "";
          const hiringStatus =
            card
              .querySelector(".job-posting-benefits__text")
              ?.textContent.trim() || "";
          const salary =
            card
              .querySelector(".job-search-card__salary-info")
              ?.textContent.trim() || "Not specified";

          const postedDate =
            card
              .querySelector(".job-search-card__listdate--new")
              ?.getAttribute("datetime") ||
            card
              .querySelector(".job-search-card__listdate")
              ?.getAttribute("datetime") ||
            "";

          const companyLogoURL = card
            .querySelector(".artdeco-entity-image")
            ?.getAttribute("data-delayed-url");

          // Only add jobs with at least a title and company
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
              scrapedAt: new Date().toISOString(),
            });
          }
        } catch (error) {
          console.error("Error extracting job details:", error);
        }
      });

      return jobs;
    });
  }

  delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async scrapeJobs(options = {}) {
    const {
      keyword = "react developer",
      location = "India",
      pages = 3,
      delayBetweenPages = 2000,
    } = options;

    const allJobs = [];
    let totalJobsScraped = 0;

    try {
      await this.initialize();

      for (let currentPage = 1; currentPage <= pages; currentPage++) {
        let jobsOnPage = [];
        let retries = this.retries; // Retry limit
        const url = this.constructUrl(keyword, location, currentPage);

        while (retries > 0) {
          try {
            console.log(`\nScraping page ${currentPage}/${pages}`);
            console.log(`URL: ${url}\n`);

            // Navigate to the page
            await this.page.goto(url, { waitUntil: "networkidle0" });

            // Check for 'authwall' in the URL
            const currentUrl = await this.page.url();
            if (
              currentUrl.includes("authwall") ||
              currentUrl.includes("login")
            ) {
              console.log("AuthWall detected in URL. Refreshing the page...");
              retries--;
              if (retries > 0) {
                await this.page.reload({ waitUntil: "networkidle0" });
                await this.delay(2000); // Short delay before retrying
                continue; // Retry the current page
              } else {
                console.log(
                  "Max retries reached for AuthWall. Skipping this page."
                );
                break; // Give up on this page if retries are exhausted
              }
            }

            // Wait for job cards to load or retry if none found
            await this.page
              .waitForSelector(".base-card", { timeout: 5000 })
              .catch(() => {
                console.log("Timeout waiting for job cards. Retrying...");
              });

            // Extract jobs
            jobsOnPage = await this.extractJobDetails();

            if (jobsOnPage.length === 0) {
              retries--;
              console.log(
                `No jobs found on page ${currentPage}. Retries left: ${retries}`
              );

              if (retries > 0) {
                console.log("Refreshing the page...");
                await this.page.reload({ waitUntil: "networkidle0" });
                await this.delay(2000); // Short delay before retrying
              }
            } else {
              // Filter out jobs posted within the last 7 days
              jobsOnPage = jobsOnPage.filter((job) =>
                this.isOlderThanOneWeek(job.postedDate)
              );

              // Break out of retry loop if jobs are found
              break;
            }
          } catch (error) {
            console.error(`Error scraping page ${currentPage}:`, error.message);
            retries--;
          }
        }

        totalJobsScraped += jobsOnPage.length;

        // Add page number to each job
        jobsOnPage.forEach((job) => {
          job.pageNumber = currentPage;
          allJobs.push(job);
        });

        console.log(`✓ Found ${jobsOnPage.length} jobs on page ${currentPage}`);
        console.log(`Total jobs scraped so far: ${totalJobsScraped}`);

        // Add delay between pages to avoid rate limiting
        if (currentPage < pages) {
          console.log(
            `Waiting ${delayBetweenPages / 1000} seconds before next page...`
          );
          await this.delay(delayBetweenPages);
        }
      }

      return {
        success: true,
        totalJobs: totalJobsScraped,
        keyword,
        location,
        pagesScraped: pages,
        jobs: allJobs,
        scrapedAt: new Date().toISOString(),
      };
    } catch (error) {
      console.error("Scraping failed:", error);
      return {
        success: false,
        error: error.message,
        totalJobs: totalJobsScraped,
        jobs: allJobs,
      };
    } finally {
      await this.close();
    }
  }
}

// Example usage function
async function getLinkedInJobs(searchOptions = {}) {
  const scraper = new LinkedInJobScraper();

  try {
    const result = await scraper.scrapeJobs(searchOptions);

    if (result.success) {
      console.log("\nScraping completed successfully!");
      console.log(`Total jobs found: ${result.totalJobs}`);
      console.log(`Keywords: ${result.keyword}`);
      console.log(`Location: ${result.location}`);
      console.log(`Pages scraped: ${result.pagesScraped}`);

      // Log some sample data
      console.log("\nSample job listings:");
      result.jobs.slice(0, 3).forEach((job, index) => {
        console.log(`\nJob ${index + 1}: ${job.id}`);
        console.log(`Title: ${job.title}`);
        console.log(`Company: ${job.company}`);
        console.log(`Location: ${job.location}`);
        console.log(`Posted: ${job.postedDate}`);
        console.log(`Link: ${job.jobLink}`);
        console.log(`Datetime: ${job.datetime}`);
        console.log(`Salary: ${job.salary}`);
      });
      console.log("total results", result);
    } else {
      console.error("Scraping failed:", result.error);
    }

    return result;
  } catch (error) {
    console.error("Error in getLinkedInJobs:", error);
    throw error;
  }
}

export { LinkedInJobScraper, getLinkedInJobs };
