// src/app/admin/experience/[id]/edit/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Plus, Minus } from 'lucide-react'

interface ExperienceFormData {
    company: string
    position: string
    period: string
    description: string
    responsibilities: string[]
    order: number
    isPublished: boolean
}

export default function EditExperiencePage({ params }: { params: { id: string } }) {
    const router = useRouter()
    const [formData, setFormData] = useState<ExperienceFormData>({
        company: '',
        position: '',
        period: '',
        description: '',
        responsibilities: [''],
        order: 0,
        isPublished: false
    })
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState('')
    const [isSaving, setIsSaving] = useState(false)

    useEffect(() => {
        if (params.id !== 'new') {
            fetchExperience()
        } else {
            setIsLoading(false)
        }
    }, [params.id])

    const fetchExperience = async () => {
        try {
            const response = await fetch(`/api/admin/experience/${params.id}`)
            if (!response.ok) throw new Error('Failed to fetch experience')
            const data = await response.json()
            setFormData(data)
        } catch (err) {
            setError('Failed to load experience')
        } finally {
            setIsLoading(false)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
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

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleResponsibilityChange = (index: number, value: string) => {
        const newResponsibilities = [...formData.responsibilities]
        newResponsibilities[index] = value
        setFormData(prev => ({
            ...prev,
            responsibilities: newResponsibilities
        }))
    }

    const addResponsibility = () => {
        setFormData(prev => ({
            ...prev,
            responsibilities: [...prev.responsibilities, '']
        }))
    }

    const removeResponsibility = (index: number) => {
        if (formData.responsibilities.length > 1) {
            const newResponsibilities = formData.responsibilities.filter((_, i) => i !== index)
            setFormData(prev => ({
                ...prev,
                responsibilities: newResponsibilities
            }))
        }
    }

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error: {error}</div>

    return (
        <div className="max-w-2xl mx-auto py-8">
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

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Company
                    </label>
                    <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border border-gray-300 bg-white shadow-sm focus:border-red-500 focus:ring-red-500"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Position
                    </label>
                    <input
                        type="text"
                        name="position"
                        value={formData.position}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border border-gray-300 bg-white shadow-sm focus:border-red-500 focus:ring-red-500"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Period
                    </label>
                    <input
                        type="text"
                        name="period"
                        value={formData.period}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border border-gray-300 bg-white shadow-sm focus:border-red-500 focus:ring-red-500"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Description
                    </label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        rows={4}
                        className="mt-1 block w-full rounded-md border border-gray-300 bg-white shadow-sm focus:border-red-500 focus:ring-red-500"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Responsibilities
                    </label>
                    {formData.responsibilities.map((responsibility, index) => (
                        <div key={index} className="flex gap-2 mb-2">
                            <input
                                type="text"
                                value={responsibility}
                                onChange={(e) => handleResponsibilityChange(index, e.target.value)}
                                className="flex-1 rounded-md border border-gray-300 bg-white shadow-sm focus:border-red-500 focus:ring-red-500"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => removeResponsibility(index)}
                                className="text-gray-600 hover:text-red-700"
                                disabled={formData.responsibilities.length === 1}
                            >
                                <Minus className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addResponsibility}
                        className="mt-2 text-red-700 hover:text-red-800 flex items-center"
                    >
                        <Plus className="w-4 h-4 mr-1" />
                        Add Responsibility
                    </button>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Order
                    </label>
                    <input
                        type="number"
                        name="order"
                        value={formData.order}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border border-gray-300 bg-white shadow-sm focus:border-red-500 focus:ring-red-500"
                    />
                </div>

                <div className="flex items-center">
                    <input
                        type="checkbox"
                        name="isPublished"
                        checked={formData.isPublished}
                        onChange={(e) => setFormData(prev => ({ ...prev, isPublished: e.target.checked }))}
                        className="h-4 w-4 text-red-700 focus:ring-red-500 border-gray-300 rounded"
                    />
                    <label className="ml-2 block text-sm text-gray-700">
                        Published
                    </label>
                </div>

                <div className="flex justify-end space-x-4">
                    <button
                        type="button"
                        onClick={() => router.push('/admin/experience')}
                        className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={isSaving}
                        className="bg-red-700 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                        {isSaving ? 'Saving...' : 'Save'}
                    </button>
                </div>
            </form>
        </div>
    )
}