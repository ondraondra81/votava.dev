'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'

interface SkillFormData {
    name: string
    description: string
    level: number
    category: string
    order: number
    isPublished: boolean
}

const PREDEFINED_CATEGORIES = [
    'Analytické dovednosti',
    'Vývojářské dovednosti',
    'Soft Skills'
]

export default function EditSkillPage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter()
    const [id, setId] = useState<string | null>(null)
    const [formData, setFormData] = useState<SkillFormData>({
        name: '',
        description: '',
        level: 75,
        category: PREDEFINED_CATEGORIES[0],
        order: 0,
        isPublished: false
    })
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState('')
    const [isSaving, setIsSaving] = useState(false)
    const [newCategory, setNewCategory] = useState('')
    const [showNewCategoryInput, setShowNewCategoryInput] = useState(false)

    useEffect(() => {
        params.then(({ id }) => {
            setId(id)
            if (id !== 'new') {
                fetchSkill(id)
            } else {
                setIsLoading(false)
            }
        })
    }, [params])

    const fetchSkill = async (skillId: string) => {
        try {
            const response = await fetch(`/api/admin/skills/${skillId}`)
            if (!response.ok) throw new Error('Failed to fetch skill')

            const data = await response.json()
            setFormData({
                name: data.name || '',
                description: data.description || '',
                level: data.level ?? 75,
                category: data.category || PREDEFINED_CATEGORIES[0],
                order: data.order ?? 0,
                isPublished: data.isPublished ?? false
            })

            if (!PREDEFINED_CATEGORIES.includes(data.category)) {
                setShowNewCategoryInput(true)
                setNewCategory(data.category)
            }
        } catch (err) {
            setError('Failed to load skill')
        } finally {
            setIsLoading(false)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSaving(true)

        try {
            const url = id === 'new'
                ? '/api/admin/skills'
                : `/api/admin/skills/${id}`

            const method = id === 'new' ? 'POST' : 'PUT'

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    category: showNewCategoryInput ? newCategory : formData.category
                }),
            })

            if (!response.ok) throw new Error('Failed to save skill')

            router.push('/admin/skills')
        } catch (err) {
            setError('Failed to save skill')
        } finally {
            setIsSaving(false)
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: type === 'number' || type === 'range' ? Number(value) : value
        }))
    }

    if (!id || isLoading) return <div>Loading...</div>
    if (error) return <div>Error: {error}</div>

    return (
        <div className="max-w-2xl mx-auto py-8">
            <div className="flex items-center mb-6">
                <button
                    onClick={() => router.push('/admin/skills')}
                    className="text-gray-600 hover:text-red-700 mr-4"
                >
                    <ArrowLeft className="w-6 h-6" />
                </button>
                <h1 className="text-2xl font-bold">
                    {id === 'new' ? 'New Skill' : 'Edit Skill'}
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
                        Description
                    </label>
                    <input
                        type="text"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border border-gray-300 bg-white shadow-sm focus:border-red-500 focus:ring-red-500"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Level (%)
                    </label>
                    <div className="flex items-center space-x-4">
                        <input
                            type="range"
                            name="level"
                            min="0"
                            max="100"
                            value={formData.level}
                            onChange={handleInputChange}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                        <span className="w-12 text-sm text-gray-600">{formData.level}%</span>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Category
                    </label>
                    <div className="mt-1 space-y-2">
                    <select
                        name="category"
                        value={showNewCategoryInput ? 'other' : formData.category}
                        onChange={(e) => {
                            if (e.target.value === 'other') {
                                setShowNewCategoryInput(true)
                                setNewCategory('')
                            } else {
                                setShowNewCategoryInput(false)
                                handleInputChange(e)
                            }
                        }}
                        className="block w-full rounded-md border border-gray-300 bg-white shadow-sm focus:border-red-500 focus:ring-red-500"
                    >
                        {PREDEFINED_CATEGORIES.map(category => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                        <option value="other">Other...</option>
                    </select>

                    {showNewCategoryInput && (
                        <input
                            type="text"
                            value={newCategory}
                            onChange={(e) => setNewCategory(e.target.value)}
                            placeholder="Enter new category"
                            className="block w-full rounded-md border border-gray-300 bg-white shadow-sm focus:border-red-500 focus:ring-red-500"
                            required
                        />
                    )}
                    </div>
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
                        onClick={() => router.push('/admin/skills')}
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
