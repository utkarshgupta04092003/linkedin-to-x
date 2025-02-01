export const BASE_URL =
  "https://latest-linkedin-jobs-utkarshgupta04092003s-projects.vercel.app";

export const TEST_URL = `${BASE_URL}/api/test-route`;
export const REACT_JOBS_URL = `${BASE_URL}/api/scrap-linkedin-job/react`;
export const ANGULAR_JOBS_URL = `${BASE_URL}/api/scrap-linkedin-job/angular`;
export const FLUTTER_JOBS_URL = `${BASE_URL}/api/scrap-linkedin-job/flutter`;

export const JOBS_URLS = [
  TEST_URL,
  REACT_JOBS_URL,
  ANGULAR_JOBS_URL,
  FLUTTER_JOBS_URL,
];

export const ANGULAR = "Angular";
export const REACT = "React";
export const FLUTTER = "Flutter";
export const INDIA = "India";

export const ALLOWED_TIME_DIFF = 7; // in days
export const MAX_RETRIES = 3; // Retry up to 3 times for each request
export const MAX_PAGES = 10; // Scrap up to 10 pages

export const SIMILAR_JOBS_MAX_RETRIES = 5;

export const ERROR_MESSAGE_429 =
  "Error: Too many requests (429). Returning empty string.";

export const HIRING_MESSAGE = "Actively hiring";

export const locations = [
  "Remote",
  "United States",
  "United Kingdom",
  "India",
  "Germany",
];

export const jobTypes = ["Full-time", "Part-time", "Contract", "Freelance"];

export const experienceLevels = [
  "Entry Level",
  "Mid Level",
  "Senior Level",
  "Director",
];
export const salaryRanges = ["$0-$50k", "$50k-$100k", "$100k-$150k", "$150k+"];
