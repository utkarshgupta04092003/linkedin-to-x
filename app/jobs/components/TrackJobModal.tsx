"use client"

import { BriefcaseIcon, XMarkIcon } from "@heroicons/react/24/outline"
import { useEffect, useRef } from "react"

interface ApplicationModalProps {
    isOpen: boolean
    onClose: () => void
    onApplied: () => void
}

export function TrackJobModal({ isOpen, onClose, onApplied }: ApplicationModalProps) {
    const modalRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        const handleEscapeKey = (e: KeyboardEvent) => {
            if (e.key === "Escape" && isOpen) {
                onClose()
            }
        }
        document.addEventListener("keydown", handleEscapeKey)
        return () => document.removeEventListener("keydown", handleEscapeKey)
    }, [isOpen, onClose])

    if (!isOpen) return null
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 !mt-0">
            <div
                ref={modalRef}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-md rounded-rounded-primary bg-white dark:bg-bg-secondary-dark p-6 shadow-lg border border-border-primary-light dark:border-border-primary-dark"
            >
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                    aria-label="Close"
                >
                    <XMarkIcon className="h-5 w-5" />
                </button>
                <div className="flex flex-col items-center text-center">
                    <div className="mb-4 rounded-full bg-gray-100 dark:bg-gray-800 p-3">
                        <BriefcaseIcon className="h-8 w-8 text-blue-500 dark:text-blue-400" />
                    </div>

                    <h3 className="text-xl font-semibold text-text-primary-light dark:text-text-primary-dark mb-2">
                        Did you apply?
                    </h3>
                    <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark mb-6">
                        Let us know so we can help you track your application and refine future
                        recommendations for you.
                    </p>
                    <div className="grid w-full gap-3">
                        <button
                            onClick={onApplied}
                            className="w-full rounded-rounded-primary bg-green-500 hover:bg-green-600 py-3 text-white font-medium transition-colors"
                        >
                            Yes, I applied!
                        </button>
                        <button
                            onClick={onClose}
                            className="w-full rounded-rounded-primary bg-transparent border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 py-3 text-text-primary-light dark:text-text-primary-dark font-medium transition-colors"
                        >
                            No, I didn&apos;t apply
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
