// src/components/cv/DownloadPDFButton.tsx
'use client'

import { Download } from 'lucide-react'
import { useState } from 'react'

export function DownloadPDFButton() {
    const [isDownloading, setIsDownloading] = useState(false)

    const handleDownloadPDF = async () => {
        try {
            setIsDownloading(true)

            // Stáhneme PDF
            const response = await fetch('/api/pdf')

            console.log(response)
            if (!response.ok) {
                throw new Error('Failed to generate PDF')
            }

            // Vytvoříme blob a stáhneme ho
            const blob = await response.blob()
            const url = window.URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url
            a.download = 'Ondrej-Votava-CV.pdf'
            document.body.appendChild(a)
            a.click()
            window.URL.revokeObjectURL(url)
            document.body.removeChild(a)
        } catch (error) {
            alert('Došlo k chybě při generování PDF')
        } finally {
            setIsDownloading(false)
        }
    }

    return (
        <button
            onClick={handleDownloadPDF}
            disabled={isDownloading}
            className="bg-red-700 text-white px-4 py-2 rounded-lg flex items-center hover:bg-red-800 transition-colors disabled:opacity-50"
        >
            <Download className="w-4 h-4 mr-2" />
            {isDownloading ? 'Generuji PDF...' : 'Stáhnout PDF'}
        </button>
    )
}