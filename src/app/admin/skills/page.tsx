// src/app/admin/skills/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { PlusCircle, Pencil, Trash2 } from 'lucide-react'

interface Skill {
    id: number
    name: string
    level: number
    category: string
    order: number
    isPublished: boolean
}

export default function SkillsPage() {
    const [skills, setSkills] = useState<Skill[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        fetchSkills()
    }, [])

    const fetchSkills = async () => {
        try {
            const response = await fetch('/api/admin/skills')
            if (!response.ok) throw new Error('Failed to fetch skills')
            const data = await response.json()
            setSkills(data)
        } catch (err) {
            setError('Failed to load skills')
        } finally {
            setIsLoading(false)
        }
    }

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this skill?')) return

        try {
            const response = await fetch(`/api/admin/skills/${id}`, {
                method: 'DELETE'
            })

            if (!response.ok) throw new Error('Failed to delete skill')

            setSkills(skills.filter(skill => skill.id !== id))
        } catch (err) {
            setError('Failed to delete skill')
        }
    }

    const groupedSkills = skills.reduce((acc, skill) => {
        if (!acc[skill.category]) {
            acc[skill.category] = []
        }
        acc[skill.category].push(skill)
        return acc
    }, {} as Record<string, Skill[]>)

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error: {error}</div>

    return (
        <div>
            <div className="mb-6 flex justify-between items-center">
                <h1 className="text-2xl font-bold">Skills</h1>
                <a
                    href="/admin/skills/new"
                    className="bg-red-700 text-white px-4 py-2 rounded-lg flex items-center hover:bg-red-800"
                >
                    <PlusCircle className="w-4 h-4 mr-2" />
                    Add Skill
                </a>
            </div>

            <div className="space-y-6">
                {Object.entries(groupedSkills).map(([category, categorySkills]) => (
                    <div key={category} className="bg-white rounded-lg shadow">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h2 className="text-lg font-semibold text-gray-900">{category}</h2>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead>
                                <tr>
                                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Name
                                    </th>
                                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Level
                                    </th>
                                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Order
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
                                {categorySkills.map((skill) => (
                                    <tr key={skill.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {skill.name}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                                                <div
                                                    className="bg-red-700 h-2.5 rounded-full"
                                                    style={{ width: `${skill.level}%` }}
                                                ></div>
                                            </div>
                                            <span className="text-xs text-gray-500 mt-1">
                                                    {skill.level}%
                                                </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {skill.order}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                    skill.isPublished
                                                        ? 'bg-green-100 text-green-800'
                                                        : 'bg-yellow-100 text-yellow-800'
                                                }`}>
                                                    {skill.isPublished ? 'Published' : 'Draft'}
                                                </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            <div className="flex space-x-2">
                                                <a
                                                    href={`/admin/skills/${skill.id}/edit`}
                                                    className="text-gray-600 hover:text-red-700"
                                                >
                                                    <Pencil className="w-4 h-4" />
                                                </a>
                                                <button
                                                    onClick={() => handleDelete(skill.id)}
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
                ))}
            </div>
        </div>
    )
}