import type { Metadata } from "next"
import { ThemeProvider } from "next-themes"
import type React from "react"
import ClerkThemeProvider from "./_lib/context-providers/ClerkThemeProvider"
import SWRConfigProvider from "./_lib/context-providers/SWRConfigProvider"
import ToastProvider from "./_lib/context-providers/ToastProvider"
import Navbar from "./components/Navbar"
import PreloadData from "./components/PreloadData"
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
                    <ToastProvider>
                        <ClerkThemeProvider>
                            <SWRConfigProvider>
                                <PreloadData />
                                <Navbar />
                                {children}
                            </SWRConfigProvider>
                        </ClerkThemeProvider>
                    </ToastProvider>
                </ThemeProvider>
            </body>
        </html>
    )
}
