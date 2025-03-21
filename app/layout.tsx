import type { Metadata } from "next"
import { ThemeProvider } from "next-themes"
import type React from "react"
import ClerkThemeProvider from "./_lib/context-providers/ClerkThemeProvider"
import SWRConfigProvider from "./_lib/context-providers/SWRConfigProvider"
import Navbar from "./components/Navbar"
import "./globals.css"

export const metadata: Metadata = {
    title: "Onedotjob",
    description: "Get All LinkedIn Jobs in One Step, Easily",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body>
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                    <ClerkThemeProvider>
                        <SWRConfigProvider>
                            <Navbar />
                            {children}
                        </SWRConfigProvider>
                    </ClerkThemeProvider>
                </ThemeProvider>
            </body>
        </html>
    )
}
