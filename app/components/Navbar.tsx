"use client"

import { SignedIn, SignedOut, SignInButton, UserButton, useSession } from "@clerk/nextjs"
import { MoonIcon, SunIcon, UserCircleIcon } from "@heroicons/react/24/outline"
import { useTheme } from "next-themes"
import Link from "next/link"
import { useState } from "react"

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const { theme, setTheme } = useTheme()
    const { isLoaded } = useSession()
    return (
        <nav className="sticky top-0 z-50 bg-white dark:bg-bg-primary-dark border-b border-gray-200 dark:border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link href="/" className="flex items-center">
                            <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                JobHub
                            </span>
                        </Link>
                    </div>
                    {/* Navigation Links */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navigationUrls.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                    {/* Right section */}
                    <div className="flex items-center space-x-4">
                        {/* Theme Toggle */}
                        <button
                            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                            className="p-2 rounded-full text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                        >
                            {theme === "dark" ? (
                                <SunIcon className="h-5 w-5" />
                            ) : (
                                <MoonIcon className="h-5 w-5" />
                            )}
                        </button>
                        {/* User Menu */}
                        <div className="relative">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="flex items-center"
                            >
                                {isLoaded ? (
                                    <>
                                        <SignedOut>
                                            <SignInButton />
                                        </SignedOut>
                                        <SignedIn>
                                            <UserButton />
                                        </SignedIn>
                                    </>
                                ) : (
                                    <UserCircleIcon className="h-8 w-8 text-gray-700 dark:text-gray-200" />
                                )}
                            </button>
                            {/* Dropdown Menu */}
                            {false && (
                                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-bg-primary-dark border border-gray-200 dark:border-gray-700">
                                    <div className="py-1">
                                        {dropdownUrls.map((link) => (
                                            <Link
                                                key={link.name}
                                                href={link.href}
                                                className={`block w-full text-left px-4 py-2 text-sm ${
                                                    link.name === "Sign Out"
                                                        ? "text-red-600 dark:text-red-400"
                                                        : "text-gray-700 dark:text-gray-200"
                                                } hover:bg-bg-secondary-light dark:hover:bg-bg-secondary-dark`}
                                            >
                                                {link.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

const navigationUrls = [
    { name: "Home", href: "/" },
    { name: "Jobs", href: "/jobs" },
    { name: "Track", href: "/track" },
]

const dropdownUrls = [
    { name: "Home", href: "/" },
    { name: "Jobs", href: "/jobs" },
    { name: "Track", href: "/track" },
    { name: "Discover", href: "/discover" },
    { name: "Sign Out", href: "/signout" },
]
