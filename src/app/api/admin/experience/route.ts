// src/app/api/admin/experience/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'


export async function GET() {
    try {
        const experiences = await prisma.experience.findMany({
            include: {
                projects: true
            },
            orderBy: {
                order: 'asc'
            }
        })
        return NextResponse.json(experiences)
    } catch (error) {
        console.error('Error fetching experiences:', error)
        return NextResponse.json({ error: 'Error fetching experiences' }, { status: 500 })
    }
}

export async function POST(request: Request) {
    try {
        const data = await request.json()

        const experience = await prisma.experience.create({
            data: {
                company: data.company,
                position: data.position,
                description: data.description,
                startDate: data.startDate ? new Date(data.startDate) : null,
                endDate: data.endDate ? new Date(data.endDate) : null,
                isPresent: data.isPresent,
                order: data.order,
                isPublished: data.isPublished,
                projects: {
                    create: data.projects.map((project: any) => ({
                        title: project.title,
                        description: project.description,
                        technologies: project.technologies,
                        startDate: project.startDate ? new Date(project.startDate) : null,
                        endDate: project.endDate ? new Date(project.endDate) : null,
                        isPresent: project.isPresent,
                        order: project.order,
                        isPublished: project.isPublished
                    }))
                }
            },
            include: {
                projects: true
            }
        })

        return NextResponse.json(experience)
    } catch (error) {
        console.error('Error creating experience:', error)
        return NextResponse.json({ error: 'Error creating experience' }, { status: 500 })
    }
}