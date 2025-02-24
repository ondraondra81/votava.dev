// src/app/admin/experience/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { PlusCircle, Pencil, Trash2 } from 'lucide-react'
import { formatPeriod } from '@/lib/utils'
import type {Experience} from "@/types/experience";

export default function ExperiencePage() {
    const router = useRouter()
    const [experiences, setExperiences] = useState<Experience[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        fetchExperiences()
    }, [])

    const fetchExperiences = async () => {
        try {
            const response = await fetch('/api/admin/experience')
            if (!response.ok) throw new Error('Failed to fetch experiences')
            const data = await response.json()
            setExperiences(data)
        } catch (err) {
            console.error('Error fetching experiences:', err)
            setError('Failed to load experiences')
        } finally {
            setIsLoading(false)
        }
    }

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this experience?')) return

        try {
            const response = await fetch(`/api/admin/experience/${id}`, {
                method: 'DELETE'
            })

            if (!response.ok) throw new Error('Failed to delete experience')
            setExperiences(experiences.filter(exp => exp.id !== id))
        } catch (err) {
            console.error('Error deleting experience:', err)
            setError('Failed to delete experience')
        }
    }


    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error: {error}</div>

    return (
        <div>
            <div className="mb-6 flex justify-between items-center">
                <h1 className="text-2xl font-bold">Work Experience</h1>
                <button
                    onClick={() => router.push('/admin/experience/new')}
                    className="bg-red-700 text-white px-4 py-2 rounded-lg flex items-center hover:bg-red-800"
                >
                    <PlusCircle className="w-4 h-4 mr-2" />
                    Add Experience
                </button>
            </div>

            <div className="bg-white rounded-lg shadow">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                        <tr>
                            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Company
                            </th>
                            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Position
                            </th>
                            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Period
                            </th>
                            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Projects
                            </th>
                            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        {experiences.map((experience) => (
                            <tr key={experience.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {experience.company}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {experience.position}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {formatPeriod(
                                        experience.startDate,
                                        experience.endDate,
                                        experience.isPresent
                                    )}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {experience.projects.length}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        experience.isPublished
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {experience.isPublished ? 'Published' : 'Draft'}
                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button
                                        onClick={() => router.push(`/admin/experience/${experience.id}/edit`)}
                                        className="text-gray-600 hover:text-red-700 mr-4"
                                    >
                                        <Pencil className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(experience.id)}
                                        className="text-gray-600 hover:text-red-700"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
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