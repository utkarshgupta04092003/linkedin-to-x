"use client"

import { ClerkProvider } from "@clerk/nextjs"
import { dark, neobrutalism } from "@clerk/themes"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export default function ClerkThemeProvider({ children }: { children: React.ReactNode }) {
    const { theme } = useTheme()
    const [clerkTheme, setClerkTheme] = useState(dark)
    useEffect(() => {
        if (theme === "dark") {
            setClerkTheme(dark)
        } else {
            setClerkTheme(neobrutalism)
        }
    }, [theme])
    console.log("env", process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY)
    return (
        <ClerkProvider
            appearance={{ baseTheme: clerkTheme }}
            publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
        >
            {children}
        </ClerkProvider>
    )
}
