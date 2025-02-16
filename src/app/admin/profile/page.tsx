// src/app/admin/profile/page.tsx
'use client'

import { useState, useEffect } from 'react'

interface ProfileData {
    id?: number
    title: string
    summary: string
    motto: string
}

export default function ProfilePage() {
    const [formData, setFormData] = useState<ProfileData>({
        title: '',
        summary: '',
        motto: ''
    })
    const [isLoading, setIsLoading] = useState(true)
    const [isSaving, setIsSaving] = useState(false)
    const [error, setError] = useState('')
    const [saveMessage, setSaveMessage] = useState('')

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await fetch('/api/admin/profile')
                if (!response.ok) throw new Error('Failed to fetch profile')
                const data = await response.json()
                if (data) {
                    setFormData(data)
                }
            } catch (err) {
                setError('Failed to load profile')
                console.error('Error:', err)
            } finally {
                setIsLoading(false)
            }
        }

        fetchProfile()
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSaving(true)
        setSaveMessage('')
        setError('')

        try {
            const method = formData.id ? 'PUT' : 'POST'
            const response = await fetch('/api/admin/profile', {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })

            if (!response.ok) throw new Error('Failed to save profile')

            const savedData = await response.json()
            setFormData(savedData)
            setSaveMessage('Profile saved successfully')
        } catch (err) {
            setError('Failed to save profile')
            console.error('Error:', err)
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

    if (isLoading) return <div>Loading...</div>

    return (
        <div className="max-w-2xl mx-auto py-8">
            <h1 className="text-2xl font-bold mb-6">Edit Profile</h1>

            {error && (
                <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-md">
                    {error}
                </div>
            )}

            {saveMessage && (
                <div className="mb-4 p-4 bg-green-50 text-green-700 rounded-md">
                    {saveMessage}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Title
                    </label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border border-gray-300 bg-white shadow-sm focus:border-red-500 focus:ring-red-500"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Motto
                    </label>
                    <textarea
                        name="motto"
                        value={formData.motto}
                        onChange={handleInputChange}
                        rows={6}
                        className="mt-1 block w-full rounded-md border border-gray-300 bg-white shadow-sm focus:border-red-500 focus:ring-red-500"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Summary
                    </label>
                    <textarea
                        name="summary"
                        value={formData.summary}
                        onChange={handleInputChange}
                        rows={12}
                        className="mt-1 block w-full rounded-md border border-gray-300 bg-white shadow-sm focus:border-red-500 focus:ring-red-500"
                        required
                    />
                </div>

                <div className="flex justify-end">
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