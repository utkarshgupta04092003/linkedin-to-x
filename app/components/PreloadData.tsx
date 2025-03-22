"use client"

import { useUser } from "@clerk/nextjs"
import { useEffect } from "react"
import { preload } from "swr"
import { fetcher } from "../_lib/context-providers/SWRConfigProvider"

export default function PreloadData() {
    const user = useUser()
    useEffect(() => {
        user.isSignedIn && preload("/api/v1/saved-jobs", fetcher)
    }, [user])
    return null
}
