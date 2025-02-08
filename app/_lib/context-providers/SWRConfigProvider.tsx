"use client"

import React from "react"
import { SWRConfig } from "swr"

export const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function SWRConfigProvider({ children }: { children: React.ReactNode }) {
    return (
        <SWRConfig
            value={{
                fetcher: fetcher,
            }}
        >
            {children}
        </SWRConfig>
    )
}
