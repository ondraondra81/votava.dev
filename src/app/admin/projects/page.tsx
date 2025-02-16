// src/app/admin/projects/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { PlusCircle, Pencil, Trash2 } from 'lucide-react'

interface Project {
    id: number
    company: string
    title: string
    period: string
    description: string
    responsibilities: string[]
    order: number
    isPublished: boolean
}

export default function ProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        fetchProjects()
    }, [])

    const fetchProjects = async () => {
        try {
            const response = await fetch('/api/admin/projects')
            if (!response.ok) throw new Error('Failed to fetch projects')
            const data = await response.json()
            setProjects(data)
        } catch (err) {
            setError('Failed to load projects')
        } finally {
            setIsLoading(false)
        }
    }

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this project?')) return

        try {
            const response = await fetch(`/api/admin/projects/${id}`, {
                method: 'DELETE'
            })

            if (!response.ok) throw new Error('Failed to delete project')

            setProjects(projects.filter(project => project.id !== id))
        } catch (err) {
            setError('Failed to delete project')
        }
    }

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error: {error}</div>

    return (
        <div>
            <div className="mb-6 flex justify-between items-center">
                <h1 className="text-2xl font-bold">Projects</h1>
                <a
                    href="/admin/projects/new"
                    className="bg-red-700 text-white px-4 py-2 rounded-lg flex items-center hover:bg-red-800"
                >
                    <PlusCircle className="w-4 h-4 mr-2" />
                    Add Project
                </a>
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
                                Title
                            </th>
                            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Period
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
                        {projects.map((project) => (
                            <tr key={project.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {project.company}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {project.title}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {project.period}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                            project.isPublished
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-yellow-100 text-yellow-800'
                                        }`}>
                                            {project.isPublished ? 'Published' : 'Draft'}
                                        </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <div className="flex space-x-2">
                                        <a
                                            href={`/admin/projects/${project.id}/edit`}
                                            className="text-gray-600 hover:text-red-700"
                                        >
                                            <Pencil className="w-4 h-4" />
                                        </a>
                                        <button
                                            onClick={() => handleDelete(project.id)}
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