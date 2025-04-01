"use client"

import { useUser } from "@clerk/nextjs"
import { useEffect } from "react"
import { preload } from "swr"
import { SAVED_JOBS_ROUTE, TRACK_JOBS_ROUTE } from "../_lib/config/endpoint"
import { fetcher } from "../_lib/context-providers/SWRConfigProvider"

export default function PreloadData() {
    const user = useUser()
    useEffect(() => {
        user.isSignedIn && preload(SAVED_JOBS_ROUTE, fetcher)
        user.isSignedIn && preload(TRACK_JOBS_ROUTE, fetcher)
    }, [user])
    return null
}
