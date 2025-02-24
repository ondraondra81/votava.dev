'use client'

import { useState, useEffect } from 'react'
import {
    Award,
    Code,
    ChevronRight,
    CheckCircle2,
    AlertCircle,
    FileEdit,
    Eye
} from 'lucide-react'

interface SectionStats {
    total: number
    published: number
}

interface DashboardData {
    experience: SectionStats
    skills: SectionStats
    certificates: SectionStats
}

export default function DashboardPage() {
    const [stats, setStats] = useState<DashboardData>({
        experience: { total: 0, published: 0 },
        skills: { total: 0, published: 0 },
        certificates: { total: 0, published: 0 }
    })
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        fetchStats()
    }, [])

    const fetchStats = async () => {
        try {
            const sections = ['experience', 'skills', 'certificates']
            const statsData: DashboardData = {
                experience: { total: 0, published: 0 },
                skills: { total: 0, published: 0 },
                certificates: { total: 0, published: 0 }
            }

            await Promise.all(
                sections.map(async (section) => {
                    const response = await fetch(`/api/admin/${section}`)
                    if (!response.ok) throw new Error(`Failed to fetch ${section}`)
                    const data = await response.json()
                    statsData[section as keyof DashboardData] = {
                        total: data.length,
                        published: data.filter((item: any) => item.isPublished).length
                    }
                })
            )

            setStats(statsData)
        } catch (err) {
            console.error('Error fetching dashboard data:', err)
            setError('Failed to load dashboard data')
        } finally {
            setIsLoading(false)
        }
    }

    const sections = [
        {
            name: 'Work Experience',
            path: '/admin/experience',
            icon: FileEdit,
            stats: stats.experience,
            color: 'bg-green-500'
        },
        {
            name: 'Skills',
            path: '/admin/skills',
            icon: Code,
            stats: stats.skills,
            color: 'bg-purple-500'
        },
        {
            name: 'Certificates',
            path: '/admin/certificates',
            icon: Award,
            stats: stats.certificates,
            color: 'bg-yellow-500'
        }
    ]

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error: {error}</div>

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {sections.map((section) => {
                    const Icon = section.icon
                    return (
                        <div
                            key={section.name}
                            className="bg-white rounded-lg shadow hover:shadow-md transition-shadow"
                        >
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div className={`p-3 rounded-lg ${section.color}`}>
                                        <Icon className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                                        <span className="text-sm text-gray-600">
                                            {section.stats.published} published
                                        </span>
                                    </div>
                                </div>

                                <h2 className="text-xl font-semibold mb-2">{section.name}</h2>

                                <div className="flex items
                                -center justify-between text-sm text-gray-600">
                                    <span>{section.stats.total} total items</span>
                                    {section.stats.total > 0 && section.stats.published < section.stats.total && (
                                        <span className="flex items-center text-yellow-600">
                                            <AlertCircle className="w-4 h-4 mr-1" />
                                            {section.stats.total - section.stats.published} drafts
                                        </span>
                                    )}
                                </div>

                                <div className="mt-4">
                                    <a
                                        href={section.path}
                                        className="inline-flex items-center text-sm font-medium text-red-700 hover:text-red-800"
                                    >
                                        Manage section
                                        <ChevronRight className="w-4 h-4 ml-1" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

            <div className="mt-8 bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <a
                        href="/admin/experience/new"
                        className="flex items-center p-4 border rounded-lg hover:bg-gray-50"
                    >
                        <FileEdit className="w-5 h-5 text-red-700 mr-3" />
                        <span>Add New Experience</span>
                    </a>
                    <a
                        href="/admin/skills/new"
                        className="flex items-center p-4 border rounded-lg hover:bg-gray-50"
                    >
                        <Code className="w-5 h-5 text-red-700 mr-3" />
                        <span>Add New Skill</span>
                    </a>
                    <a
                        href="/admin/certificates/new"
                        className="flex items-center p-4 border rounded-lg hover:bg-gray-50"
                    >
                        <Award className="w-5 h-5 text-red-700 mr-3" />
                        <span>Add New Certificate</span>
                    </a>
                </div>
            </div>

            <div className="mt-8 bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold">Website Preview</h2>
                    <a
                        href="/"
                        target="_blank"
                        className="inline-flex items-center text-sm font-medium text-red-700 hover:text-red-800"
                    >
                        <Eye className="w-4 h-4 mr-2" />
                        View Live Site
                    </a>
                </div>
                <div className="h-48 bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center">
                    <iframe
                        src="/"
                        className="w-full h-full rounded-lg"
                        title="Website Preview"
                    />
                </div>
            </div>
        </div>
    )
}