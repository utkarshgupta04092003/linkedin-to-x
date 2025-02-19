import { NextRequest, NextResponse } from "next/server"

// webhook for user details to db
export async function POST(req: NextRequest) {
    // const data = await req.json()
    // console.log(data)
    return NextResponse.json({ message: "ok" })
}
