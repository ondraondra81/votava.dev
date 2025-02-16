// src/components/SWRProvider.tsx
'use client'

import { SWRConfig } from 'swr'

export function SWRProvider({ children }: { children: React.ReactNode }) {
    return (
        <SWRConfig
            value={{
                refreshInterval: 30000,
                revalidateOnFocus: true,
                fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
            }}
        >
            {children}
        </SWRConfig>
    )
}