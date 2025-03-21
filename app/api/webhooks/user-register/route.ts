import { prisma } from "@/app/_lib/utils/globals"
import { WebhookEvent } from "@clerk/nextjs/server"
import { UserType } from "@prisma/client"
import { headers } from "next/headers"
import { NextResponse } from "next/server"
import { Webhook } from "svix"

export async function POST(req: Request) {
    const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET
    if (!WEBHOOK_SECRET) {
        throw new Error("Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local")
    }
    const headerPayload = await headers()
    const svix_id = headerPayload.get("svix-id")
    const svix_timestamp = headerPayload.get("svix-timestamp")
    const svix_signature = headerPayload.get("svix-signature")
    if (!svix_id || !svix_timestamp || !svix_signature) {
        return NextResponse.json({ message: "Error occurred -- no svix headers" }, { status: 400 })
    }
    const payload = await req.json()
    const body = JSON.stringify(payload)
    const wh = new Webhook(WEBHOOK_SECRET)
    let evt: WebhookEvent
    try {
        evt = wh.verify(body, {
            "svix-id": svix_id,
            "svix-timestamp": svix_timestamp,
            "svix-signature": svix_signature,
        }) as WebhookEvent
    } catch (err) {
        return NextResponse.json(
            { message: "Error occurred in verifying webhook" },
            { status: 400 }
        )
    }

    const { id } = evt.data
    const eventType = evt.type

    // console.log(`Webhook with an ID of ${id} and type of ${eventType}`)
    // console.log("Webhook body:", body)
    // Handling 'user.created' event
    if (eventType === "user.created") {
        try {
            const { email_addresses, primary_email_address_id } = evt.data
            // console.log(evt.data)
            // Safely find the primary email address
            const primaryEmail = email_addresses.find(
                (email) => email.id === primary_email_address_id
            )
            // console.log("Primary email:", primaryEmail)
            // console.log("Email addresses:", primaryEmail?.email_address)
            if (!primaryEmail) {
                console.error("No primary email found")
                return NextResponse.json({ message: "No primary email found" }, { status: 400 })
            }

            // Create the user in the database
            const newUser = await prisma.user.create({
                data: {
                    clerkUserId: evt.data.id!,
                    email: primaryEmail.email_address,
                    firstName: evt.data.first_name ?? "firstName",
                    lastName: evt.data.last_name ?? "lastName",
                    userType: UserType.Standard,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            })
            console.log("New user created:", newUser)
        } catch (error) {
            // console.error("Error creating user in database:", error)
            return NextResponse.json({ message: "Error creating user" }, { status: 500 })
        }
    }
    return NextResponse.json({ message: "Webhook received successfully" }, { status: 200 })
}
