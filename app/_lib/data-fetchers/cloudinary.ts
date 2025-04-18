import { v2 as cloudinary } from "cloudinary"

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

export const uploadToCloudinary = (
    base64Image: string,
    folderName: string,
    fileName: string
): Promise<string> => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(
            base64Image,
            {
                folder: folderName,
                public_id: fileName,
            },
            (error, result) => {
                if (error || !result) reject(error)
                else resolve(result.secure_url)
            }
        )
    })
}
