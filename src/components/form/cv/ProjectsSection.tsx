// src/components/ui/ProjectsSection.tsx
'use client'

import { Plus, Minus } from 'lucide-react'
import { RichTextEditor } from '@/components/form/RichTextEditor'
import { MonthYearPicker } from '@/components/form/MonthYearPicker'
import type { Project } from '@/types/experience'
import {TechnologyInput} from "@/components/form/cv/TechnologyInput";

interface ProjectsSectionProps {
    projects: Project[]
    onProjectChangeAction: (projects: Project[]) => Promise<void>
}

export function ProjectsSection({ projects, onProjectChangeAction }: ProjectsSectionProps) {
    const addProject = async () => {
        const newProjects = [...projects, {
            title: '',
            description: '',
            technologies: [],
            startDate: '',
            endDate: '',
            isPresent: false,
            order: projects.length,
            isPublished: false
        }]
        await onProjectChangeAction(newProjects)
    }

    const updateProject = async (index: number, data: Partial<Project>) => {
        const newProjects = [...projects]
        newProjects[index] = { ...newProjects[index], ...data }
        await onProjectChangeAction(newProjects)
    }

    const removeProject = async (index: number) => {
        await onProjectChangeAction(projects.filter((_, i) => i !== index))
    }

    return (
        <div className="border-t pt-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium">Projects</h2>
            </div>

            <div className="space-y-6">
                {projects.map((project, index) => (
                    <div key={index} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-md font-medium">Project {index + 1}</h3>
                            <button
                                type="button"
                                onClick={() => removeProject(index)}
                                className="text-gray-400 hover:text-red-600"
                            >
                                <Minus className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Title</label>
                                <input
                                    type="text"
                                    value={project.title}
                                    onChange={async (e) => await updateProject(index, { title: e.target.value })}
                                    className="mt-1 block w-full rounded-md border border-gray-300 bg-white"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Description</label>
                                <RichTextEditor
                                    content={project.description}
                                    onChangeAction={async (content) => await updateProject(index, { description: content })}
                                    placeholder="Enter project description..."
                                />
                            </div>

                            <TechnologyInput
                                technologies={project.technologies}
                                onChange={async (newTechnologies) => {
                                    await updateProject(index, { technologies: newTechnologies });
                                }}
                            />

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Start Date</label>
                                    <MonthYearPicker
                                        value={project.startDate}
                                        onChangeAction={async (value) => await updateProject(index, { startDate: value })}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">End Date</label>
                                    <MonthYearPicker
                                        value={project.endDate}
                                        onChangeAction={async (value) => await updateProject(index, { endDate: value })}
                                        disabled={project.isPresent}
                                    />
                                    <div className="mt-2">
                                        <input
                                            type="checkbox"
                                            checked={project.isPresent}
                                            onChange={async (e) => await updateProject(index, {
                                                isPresent: e.target.checked,
                                                endDate: e.target.checked ? null : project.endDate
                                            })}
                                            className="mr-2"
                                        />
                                        <label className="text-sm text-gray-600">Current Project</label>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={project.isPublished}
                                    onChange={async (e) => await updateProject(index, { isPublished: e.target.checked })}
                                    className="h-4 w-4 text-red-700 focus:ring-red-500 border-gray-300 rounded"
                                />
                                <label className="ml-2 block text-sm text-gray-700">
                                    Published
                                </label>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className={"space-y-6 text-right"}>
                <button
                    type="button"
                    onClick={addProject}
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
                >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Project
                </button>
            </div>
        </div>
    )
}