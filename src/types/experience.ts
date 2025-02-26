export interface Project {
    id?: number
    title: string
    description: string
    technologies: string[]
    startDate?: string
    endDate?: string
    isPresent: boolean
    order: number
    isPublished: boolean
}

export interface Experience {
    id?: number
    company: string
    position: string
    description: string
    startDate: string
    endDate?: string
    isPresent: boolean
    technologies: string[]
    projects: Project[]
    order: number
    isPublished: boolean
}