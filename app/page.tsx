import JobListings from "./components/JobListing"

export default function Home() {
    return (
        <div className="min-h-screen bg-bg-primary-light dark:bg-bg-primary-dark">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h1 className="text-4xl font-bold text-text-primary-light dark:text-text-primary-dark">
                    Welcome to JobHub
                </h1>
                <p className="mt-4 text-text-secondary-light dark:text-text-secondary-dark">
                    Find your dream job with our advanced job search platform.
                </p>
                <JobListings />
            </div>
        </div>
    )
}
