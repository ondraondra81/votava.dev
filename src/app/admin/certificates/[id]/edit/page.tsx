// src/app/admin/certificates/[id]/edit/page.tsx
'use client'

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation'
import { ArrowLeft, Plus, Minus } from 'lucide-react'

interface CertificateFormData {
    name: string
    issuer: string
    period: string
    skills: string[]
    isPublished: boolean
}

export default function EditCertificatePage(props: { params: Promise<{ id: string }> }) {
    const params = use(props.params);
    const router = useRouter()
    const [formData, setFormData] = useState<CertificateFormData>({
        name: '',
        issuer: '',
        period: '',
        skills: [''],
        isPublished: false
    })
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState('')
    const [isSaving, setIsSaving] = useState(false)

    useEffect(() => {
        if (params.id !== 'new') {
            fetchCertificate()
        } else {
            setIsLoading(false)
        }
    }, [params.id])

    const fetchCertificate = async () => {
        try {
            const response = await fetch(`/api/admin/certificates/${params.id}`)
            if (!response.ok) throw new Error('Failed to fetch certificate')
            const data = await response.json()
            setFormData(data)
        } catch (err) {
            setError('Failed to load certificate')
        } finally {
            setIsLoading(false)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSaving(true)

        try {
            const url = params.id === 'new'
                ? '/api/admin/certificates'
                : `/api/admin/certificates/${params.id}`

            const method = params.id === 'new' ? 'POST' : 'PUT'

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })

            if (!response.ok) throw new Error('Failed to save certificate')

            router.push('/admin/certificates')
        } catch (err) {
            setError('Failed to save certificate')
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

    const handleSkillChange = (index: number, value: string) => {
        const newSkills = [...formData.skills]
        newSkills[index] = value
        setFormData(prev => ({
            ...prev,
            skills: newSkills
        }))
    }

    const addSkill = () => {
        setFormData(prev => ({
            ...prev,
            skills: [...prev.skills, '']
        }))
    }

    const removeSkill = (index: number) => {
        if (formData.skills.length > 1) {
            const newSkills = formData.skills.filter((_, i) => i !== index)
            setFormData(prev => ({
                ...prev,
                skills: newSkills
            }))
        }
    }

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error: {error}</div>

    return (
        <div className="max-w-2xl mx-auto py-8">
            <div className="flex items-center mb-6">
                <button
                    onClick={() => router.push('/admin/certificates')}
                    className="text-gray-600 hover:text-red-700 mr-4"
                >
                    <ArrowLeft className="w-6 h-6" />
                </button>
                <h1 className="text-2xl font-bold">
                    {params.id === 'new' ? 'New Certificate' : 'Edit Certificate'}
                </h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border border-gray-300 bg-white shadow-sm focus:border-red-500 focus:ring-red-500"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Issuer
                    </label>
                    <input
                        type="text"
                        name="issuer"
                        value={formData.issuer}
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Skills
                    </label>
                    {formData.skills.map((skill, index) => (
                        <div key={index} className="flex gap-2 mb-2">
                            <input
                                type="text"
                                value={skill}
                                onChange={(e) => handleSkillChange(index, e.target.value)}
                                className="flex-1 rounded-md border border-gray-300 bg-white shadow-sm focus:border-red-500 focus:ring-red-500"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => removeSkill(index)}
                                className="text-gray-600 hover:text-red-700"
                                disabled={formData.skills.length === 1}
                            >
                                <Minus className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addSkill}
                        className="mt-2 text-red-700 hover:text-red-800 flex items-center"
                    >
                        <Plus className="w-4 h-4 mr-1" />
                        Add Skill
                    </button>
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
                        onClick={() => router.push('/admin/certificates')}
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