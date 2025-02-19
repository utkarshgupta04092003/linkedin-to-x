"use client"

import { ClerkProvider } from "@clerk/nextjs"
import { dark, neobrutalism } from "@clerk/themes"
import { useTheme, UseThemeProps } from "next-themes"
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
    return <ClerkProvider appearance={{ baseTheme: clerkTheme }}>{children}</ClerkProvider>
}
