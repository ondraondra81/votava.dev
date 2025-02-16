// src/app/admin/contact/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { Github, Linkedin, Mail, Phone, MapPin } from 'lucide-react'

interface ContactData {
    id?: number
    name: string
    position: string
    email: string | null
    github: string | null
    linkedin: string | null
    phone: string | null
    location: string | null
}

export default function ContactPage() {
    const [formData, setFormData] = useState<ContactData>({
        name: '',
        position: '',
        email: '',
        github: '',
        linkedin: '',
        phone: '',
        location: ''
    })
    const [isLoading, setIsLoading] = useState(true)
    const [isSaving, setIsSaving] = useState(false)
    const [error, setError] = useState('')
    const [saveMessage, setSaveMessage] = useState('')

    useEffect(() => {
        const fetchContact = async () => {
            try {
                const response = await fetch('/api/admin/contact')
                if (!response.ok) throw new Error('Failed to fetch contact')
                const data = await response.json()
                if (data) {
                    setFormData(data)
                }
            } catch (err) {
                setError('Failed to load contact')
                console.error('Error:', err)
            } finally {
                setIsLoading(false)
            }
        }

        fetchContact()
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSaving(true)
        setSaveMessage('')
        setError('')

        try {
            const method = formData.id ? 'PUT' : 'POST'
            const response = await fetch('/api/admin/contact', {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })

            if (!response.ok) throw new Error('Failed to save contact')

            const savedData = await response.json()
            setFormData(savedData)
            setSaveMessage('Contact information saved successfully')
        } catch (err) {
            setError('Failed to save contact')
            console.error('Error:', err)
        } finally {
            setIsSaving(false)
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    if (isLoading) return <div>Loading...</div>

    return (
        <div className="max-w-2xl mx-auto py-8">
            <h1 className="text-2xl font-bold mb-6">Edit Contact Information</h1>

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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            <div className="flex items-center">
                                <Mail className="w-4 h-4 mr-2" />
                                Email
                            </div>
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email || ''}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 bg-white shadow-sm focus:border-red-500 focus:ring-red-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            <div className="flex items-center">
                                <Github className="w-4 h-4 mr-2" />
                                GitHub
                            </div>
                        </label>
                        <input
                            type="text"
                            name="github"
                            value={formData.github || ''}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 bg-white shadow-sm focus:border-red-500 focus:ring-red-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            <div className="flex items-center">
                                <Linkedin className="w-4 h-4 mr-2" />
                                LinkedIn
                            </div>
                        </label>
                        <input
                            type="text"
                            name="linkedin"
                            value={formData.linkedin || ''}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 bg-white shadow-sm focus:border-red-500 focus:ring-red-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            <div className="flex items-center">
                                <Phone className="w-4 h-4 mr-2" />
                                Phone
                            </div>
                        </label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone || ''}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 bg-white shadow-sm focus:border-red-500 focus:ring-red-500"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-2" />
                            Location
                        </div>
                    </label>
                    <input
                        type="text"
                        name="location"
                        value={formData.location || ''}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border border-gray-300 bg-white shadow-sm focus:border-red-500 focus:ring-red-500"
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