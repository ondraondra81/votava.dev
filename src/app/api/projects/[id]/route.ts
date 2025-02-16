// src/app/api/projects/[id]/route.ts
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import prisma from '@/lib/prisma'

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const project = await prisma.project.findUnique({
            where: {
                id: parseInt(params.id)
            }
        })

        if (!project) {
            return NextResponse.json(
                { error: 'Project not found' },
                { status: 404 }
            )
        }

        return NextResponse.json(project)
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch project' },
            { status: 500 }
        )
    }
}

export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const session = await getServerSession()

        if (!session) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            )
        }

        const data = await request.json()

        const project = await prisma.project.update({
            where: {
                id: parseInt(params.id)
            },
            data: {
                company: data.company,
                title: data.title,
                period: data.period,
                description: data.description,
                responsibilities: data.responsibilities,
                order: data.order,
                isPublished: data.isPublished
            }
        })

        return NextResponse.json(project)
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to update project' },
            { status: 500 }
        )
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const session = await getServerSession()

        if (!session) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            )
        }

        await prisma.project.delete({
            where: {
                id: parseInt(params.id)
            }
        })

        return NextResponse.json(
            { message: 'Project deleted successfully' }
        )
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to delete project' },
            { status: 500 }
        )
    }
}