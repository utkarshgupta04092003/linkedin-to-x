import { updateDB } from "@/app/_lib/data-fetchers/globals";
import { LinkedInJobScraper } from "@/app/_lib/utils/linkedin";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const keyword = "angular";
    const location = "India";
    const pages = 5;

    const scraper = new LinkedInJobScraper();
    const result = await scraper.scrapeJobs({ keyword, location, pages });

    if (result.success) {
      const updatedJobs = await updateDB(result.jobs);
      return NextResponse.json({
        message: "Scraping completed successfully!",
        data: updatedJobs,
      });
    } else {
      return NextResponse.json({
        message: "Scraping failed.",
        error: result.error,
      });
    }
  } catch (error) {
    console.log("error", error);
    return NextResponse.json(
      {
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}
