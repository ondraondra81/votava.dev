'use client'
import {Download} from "lucide-react";

export const DownloadPDFButton = () => {
    const handleDownloadPDF = () => {
        console.log('Stahování PDF...')
    }

    return (
        <button
            onClick={handleDownloadPDF}
            className="bg-red-700 text-white px-4 py-2 rounded-lg flex items-center hover:bg-red-800 transition-colors"
        >
            <Download className="w-4 h-4 mr-2" />
            Stáhnout PDF
        </button>
    )
}