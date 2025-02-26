// src/app/admin/experience/[id]/edit/page.tsx
'use client'

import {use, useEffect} from 'react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { RichTextEditor } from '@/components/form/RichTextEditor'
import { ProjectsSection } from '@/components/form/cv/ProjectsSection'
import type { Experience, Project } from '@/types/experience'
import {MonthYearPicker} from "@/components/form/MonthYearPicker";
import { TechnologyInput } from "@/components/form/cv/TechnologyInput";

export default function EditExperiencePage(props: { params: Promise<{ id: string }> }) {
    const params = use(props.params)
    const router = useRouter()
    const [formData, setFormData] = useState<Experience>({
        company: '',
        position: '',
        description: '',
        startDate: '',
        endDate: '',
        isPresent: false,
        technologies: [],
        projects: [],
        order: 0,
        isPublished: true
    })
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState('')
    const [isSaving, setIsSaving] = useState(false)

    const fetchExperienceAction = async () => {
        try {
            const response = await fetch(`/api/admin/experience/${params.id}`)
            if (!response.ok) throw new Error('Failed to fetch experience')
            const data = await response.json()
            setFormData(data)
        } catch (err) {
            console.error(err)
            setError('Failed to load experience')
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if (params.id !== 'new') {
            fetchExperienceAction()
        } else {
            setIsLoading(false)  // Pro nový záznam nastavíme loading na false
        }
    }, [params.id])  // Dependency array s params.id

    const handleProjectChangeAction = async (projects: Project[]) => {
        setFormData(prev => ({ ...prev, projects }))
    }

    const updateExperienceAction = async (data: Partial<Experience>) => {
        setFormData(prev => ({ ...prev, ...data }))
    }

    const handleSubmitAction = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSaving(true)

        try {
            const url = params.id === 'new'
                ? '/api/admin/experience'
                : `/api/admin/experience/${params.id}`

            const method = params.id === 'new' ? 'POST' : 'PUT'

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })

            if (!response.ok) throw new Error('Failed to save experience')
            router.push('/admin/experience')
        } catch (err) {
            setError('Failed to save experience')
        } finally {
            setIsSaving(false)
        }
    }

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error: {error}</div>

    return (
        <div className="max-w-4xl mx-auto py-8">
            <div className="flex items-center mb-6">
                <button
                    onClick={() => router.push('/admin/experience')}
                    className="text-gray-600 hover:text-red-700 mr-4"
                >
                    <ArrowLeft className="w-6 h-6" />
                </button>
                <h1 className="text-2xl font-bold">
                    {params.id === 'new' ? 'New Experience' : 'Edit Experience'}
                </h1>
            </div>

            <form onSubmit={handleSubmitAction} className="space-y-6">
                <div className="grid grid-cols-1 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Company</label>
                        <input
                            type="text"
                            value={formData.company}
                            onChange={async (e) => await updateExperienceAction({ company: e.target.value })}
                            className="mt-1 block w-full rounded-md border border-gray-300 bg-white"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Position</label>
                        <input
                            type="text"
                            value={formData.position}
                            onChange={async (e) => await updateExperienceAction({ position: e.target.value })}
                            className="mt-1 block w-full rounded-md border border-gray-300 bg-white"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <RichTextEditor
                            content={formData.description}
                            onChangeAction={async (content) => await updateExperienceAction({ description: content })}
                            placeholder="Enter role description..."
                        />
                    </div>
                    <div>
                        <TechnologyInput
                            technologies={formData.technologies}
                            onChange={async (newTechnologies) => {
                                await updateExperienceAction({ technologies: newTechnologies });
                            }}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Start Date</label>
                            <MonthYearPicker
                                value={formData.startDate}
                                onChangeAction={async (value) => await updateExperienceAction({ startDate: value })}
                                required={true}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">End Date</label>
                            <MonthYearPicker
                                value={formData.endDate}
                                onChangeAction={async (value) => await updateExperienceAction({ endDate: value })}
                                disabled={formData.isPresent}
                            />
                            <div className="mt-2">
                                <input
                                    type="checkbox"
                                    checked={formData.isPresent}
                                    onChange={async (e) => await updateExperienceAction({
                                        isPresent: e.target.checked,
                                        endDate: e.target.checked ? null : formData.endDate
                                    })}
                                    className="mr-2"
                                />
                                <label className="text-sm text-gray-600">Current Position</label>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            checked={formData.isPublished}
                            onChange={async (e) => await updateExperienceAction({ isPublished: e.target.checked })}
                            className="h-4 w-4 text-red-700 focus:ring-red-500 border-gray-300 rounded bg-white"
                        />
                        <label className="ml-2 block text-sm text-gray-700">
                            Published
                        </label>
                    </div>
                </div>

                <ProjectsSection
                    projects={formData.projects}
                    onProjectChangeAction={handleProjectChangeAction}
                />

                <div className="flex justify-end space-x-4">
                    <button
                        type="button"
                        onClick={() => router.push('/admin/experience')}
                        className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={isSaving}
                        className="bg-red-700 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-red-800"
                    >
                        {isSaving ? 'Saving...' : 'Save'}
                    </button>
                </div>
            </form>
        </div>
    )
}