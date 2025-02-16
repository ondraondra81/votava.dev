// src/app/admin/certificates/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { PlusCircle, Pencil, Trash2 } from 'lucide-react'

interface Certificate {
    id: number
    name: string
    issuer: string
    period: string
    skills: string[]
    isPublished: boolean
}

export default function CertificatesPage() {
    const [certificates, setCertificates] = useState<Certificate[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        fetchCertificates()
    }, [])

    const fetchCertificates = async () => {
        try {
            const response = await fetch('/api/admin/certificates')
            if (!response.ok) throw new Error('Failed to fetch certificates')
            const data = await response.json()
            setCertificates(data)
        } catch (err) {
            setError('Failed to load certificates')
        } finally {
            setIsLoading(false)
        }
    }

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this certificate?')) return

        try {
            const response = await fetch(`/api/admin/certificates/${id}`, {
                method: 'DELETE'
            })

            if (!response.ok) throw new Error('Failed to delete certificate')

            setCertificates(certificates.filter(cert => cert.id !== id))
        } catch (err) {
            setError('Failed to delete certificate')
        }
    }

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error: {error}</div>

    return (
        <div>
            <div className="mb-6 flex justify-between items-center">
                <h1 className="text-2xl font-bold">Certificates</h1>
                <a
                    href="/admin/certificates/new"
                    className="bg-red-700 text-white px-4 py-2 rounded-lg flex items-center hover:bg-red-800"
                >
                    <PlusCircle className="w-4 h-4 mr-2" />
                    Add Certificate
                </a>
            </div>

            <div className="bg-white rounded-lg shadow">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                        <tr>
                            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Name
                            </th>
                            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Issuer
                            </th>
                            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Period
                            </th>
                            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Skills
                            </th>
                            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        {certificates.map((certificate) => (
                            <tr key={certificate.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {certificate.name}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {certificate.issuer}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {certificate.period}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-900">
                                    <div className="flex flex-wrap gap-1">
                                        {certificate.skills.map((skill, index) => (
                                            <span
                                                key={index}
                                                className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800"
                                            >
                                                    {skill}
                                                </span>
                                        ))}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                            certificate.isPublished
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-yellow-100 text-yellow-800'
                                        }`}>
                                            {certificate.isPublished ? 'Published' : 'Draft'}
                                        </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <div className="flex space-x-2">
                                        <a
                                            href={`/admin/certificates/${certificate.id}/edit`}
                                            className="text-gray-600 hover:text-red-700"
                                        >
                                            <Pencil className="w-4 h-4" />
                                        </a>
                                        <button
                                            onClick={() => handleDelete(certificate.id)}
                                            className="text-gray-600 hover:text-red-700"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}