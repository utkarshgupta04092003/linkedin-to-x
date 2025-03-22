"use client"

import React from "react"
import { Toaster } from "react-hot-toast"

export default function ToastProvider({ children }: { children: React.ReactNode }) {
    return (
        <>
            {children}
            <Toaster
                position="top-center"
                reverseOrder={false}
                gutter={12}
                containerClassName=""
                containerStyle={{}}
                toastOptions={{
                    className: "",
                    duration: 3000,
                    style: {
                        background: "#f0f9eb",
                        color: "#2D3748",
                        borderRadius: "8px",
                        boxShadow:
                            "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                        border: "1px solid #E2E8F0",
                        fontSize: "14px",
                        fontWeight: "600",
                    },
                }}
            />
        </>
    )
}
