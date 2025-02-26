// src/app/api/admin/experience/[id]/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
    request: Request, props: { params: Promise<{ id: string }> }
) {
    try {
        const params = await props.params;
        const experience = await prisma.experience.findUnique({
            where: {
                id: parseInt(params.id)
            },
            include: {
                projects: true
            }
        })

        if (!experience) {
            return NextResponse.json({ error: 'Experience not found' }, { status: 404 })
        }

        return NextResponse.json(experience)
    } catch (error) {
        console.error('Error fetching experience:', error)
        return NextResponse.json({ error: 'Error fetching experience' }, { status: 500 })
    }
}

export async function PUT(
    request: Request,
    props: { params: Promise<{ id: string }> }
) {
    try {
        const params = await props.params;
        const data = await request.json()

        // Nejprve aktualizujeme základní data zkušenosti
        const experience = await prisma.experience.update({
            where: {
                id: parseInt(params.id)
            },
            data: {
                company: data.company,
                position: data.position,
                description: data.description,
                startDate: new Date(data.startDate),
                endDate: data.endDate ? new Date(data.endDate) : null,
                isPresent: data.isPresent,
                technologies: data.technologies || [],
                order: data.order,
                isPublished: data.isPublished
            }
        })

        // Smažeme všechny existující projekty
        await prisma.project.deleteMany({
            where: {
                experienceId: parseInt(params.id)
            }
        })

        // Vytvoříme nové projekty
        const updatedProjects = await Promise.all(
            data.projects.map((project: any) =>
                prisma.project.create({
                    data: {
                        experienceId: experience.id,
                        title: project.title,
                        description: project.description,
                        technologies: project.technologies,
                        startDate: project.starDate ? new Date(project.startDate): null,
                        endDate: project.endDate ? new Date(project.endDate) : null,
                        isPresent: project.isPresent,
                        order: project.order,
                        isPublished: project.isPublished
                    }
                })
            )
        )

        return NextResponse.json({ ...experience, projects: updatedProjects })
    } catch (error) {
        console.error('Error updating experience:', error)
        return NextResponse.json({ error: 'Error updating experience' }, { status: 500 })
    }
}

export async function DELETE(
    request: Request,
    props: { params: Promise<{ id: string }> }
) {
    const params = await props.params;
    try {
        await prisma.experience.delete({
            where: {
                id: parseInt(params.id)
            }
        })

        return NextResponse.json({ status: 'ok' })
    } catch (error) {
        console.error('Error deleting experience:', error)
        return NextResponse.json({ error: 'Error deleting experience' }, { status: 500 })
    }
}