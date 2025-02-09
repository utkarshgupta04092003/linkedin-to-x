import { uploadToCloudinary } from "@/app/_lib/data-fetchers/cloudinary"
import { prisma } from "@/app/_lib/utils/globals"
import { getMultipleFormattedJob } from "@/app/_lib/utils/linkedin"
import { getFormattedJob } from "@/app/_lib/utils/twitter"
import { generateTwitterLikeImage } from "@/app/_lib/utils/twitterTextToImage"
import { Jobs } from "@prisma/client"
import axios from "axios"
import { NextResponse } from "next/server"

const ROUTE_ACCESS_KEY = process.env.LINKEDIN_ROUTE_ACCESS_KEY
const JOB_COUNT = 5

export async function GET(request: Request) {
    try {
        const headers = request.headers
        const clientAccessKey = headers.get("linkedin-access-key")
        if (clientAccessKey !== ROUTE_ACCESS_KEY) {
            return NextResponse.json({ message: "Unauthorized access" }, { status: 401 })
        }
        const latestJobs = await getLatestJob(JOB_COUNT)
        if (!latestJobs || latestJobs.length === 0) {
            return NextResponse.json({ message: "No new jobs found", error: null })
        }
        const content = getFormattedJob(
            latestJobs[0].company,
            latestJobs[0].title,
            latestJobs[0].location,
            latestJobs[0].postedDate ?? ""
        )
        const image = await generateTwitterLikeImage(content)
        const imagePath = await uploadToCloudinary(
            image,
            "automate-linkedin/linkedin-post",
            `job-id-${latestJobs[0].id}`
        )
        const imageDescription = getMultipleFormattedJob(latestJobs)
        const postId = await postToLinkedIn(imagePath, imageDescription)
        await updateJob(latestJobs)
        return NextResponse.json({
            message: `Job ${latestJobs
                .map((job) => job.id)
                .join(", ")} posted successfully to linkedin: ${postId}`,
        })
    } catch (error) {
        return NextResponse.json({ message: "Internal server error", error }, { status: 500 })
    }
}

const getLatestJob = async (count: number): Promise<Jobs[] | null> => {
    const latestJobs = await prisma.jobs.findMany({
        where: {
            isLinkedInPosted: false,
        },
        orderBy: {
            postedDate: "desc",
        },
        take: count,
    })
    const jobs: Jobs[] = []
    latestJobs.forEach((job) => job.company && job.title && job.jobLink && jobs.push(job))
    return jobs
}

const postToLinkedIn = async (imagePath: string, imageDescription: string) => {
    try {
        // create image upload link
        const registeredURL = await registerLinkedInUpload()
        const asset = registeredURL.asset
        const uploadUrl =
            registeredURL.uploadMechanism[
                "com.linkedin.digitalmedia.uploading.MediaUploadHttpRequest"
            ].uploadUrl
        // upload image
        await uploadImageToLinkedIn(uploadUrl, imagePath)
        // post to linkedin
        const uploadedPost = await createLinkedInPost(asset, imageDescription)
        return uploadedPost.id
    } catch (error) {
        console.log(`[ERROR]: ${error}`)
    }
}

async function registerLinkedInUpload() {
    const token = process.env.LINKEDIN_ACCESS_TOKEN
    const organizationURN = process.env.LINKEDIN_ORGANIZATION_URN
    if (!token) throw new Error("LinkedIn access token is not set in environment variables.")
    if (!organizationURN)
        throw new Error("LinkedIn organization urn is not set in environment variables.")

    const url = "https://api.linkedin.com/v2/assets?action=registerUpload"
    const requestBody = {
        registerUploadRequest: {
            recipes: ["urn:li:digitalmediaRecipe:feedshare-image"],
            owner: organizationURN,
            serviceRelationships: [
                {
                    relationshipType: "OWNER",
                    identifier: "urn:li:userGeneratedContent",
                },
            ],
        },
    }
    const response = await axios.post(url, requestBody, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    })
    return response.data.value
}

async function uploadImageToLinkedIn(uploadUrl: string, imageUrl: string) {
    const imageBuffer = await fetch(imageUrl).then((res) => res.arrayBuffer())
    const response = await axios.put(uploadUrl, imageBuffer, {
        headers: {
            "Content-Type": "image/jpeg",
        },
    })
    return response.data
}

async function createLinkedInPost(asset: string, imageDescription: string) {
    const token = process.env.LINKEDIN_ACCESS_TOKEN
    const organizationURN = process.env.LINKEDIN_ORGANIZATION_URN
    if (!token) throw new Error("LinkedIn access token is not set in environment variables.")
    if (!organizationURN)
        throw new Error("LinkedIn organization urn is not set in environment variables.")
    const url = "https://api.linkedin.com/v2/ugcPosts"
    const requestBody = {
        author: organizationURN,
        lifecycleState: "PUBLISHED",
        specificContent: {
            "com.linkedin.ugc.ShareContent": {
                shareCommentary: {
                    text: imageDescription,
                },
                shareMediaCategory: "IMAGE",
                media: [
                    {
                        status: "READY",
                        description: {
                            text: "job title!",
                        },
                        media: asset,
                        title: {
                            text: "job description!",
                        },
                    },
                ],
            },
        },
        visibility: {
            "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC",
        },
    }
    const response = await axios.post(url, requestBody, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    })
    return response.data
}

const updateJob = async (jobs: Jobs[]) => {
    const jobIds = jobs.map((job) => job.id)
    await prisma.jobs.updateMany({
        where: {
            id: {
                in: jobIds,
            },
        },
        data: {
            isLinkedInPosted: true,
        },
    })
}
