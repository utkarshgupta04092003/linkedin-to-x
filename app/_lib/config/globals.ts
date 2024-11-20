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
