// src/app/api/projects/route.ts
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import prisma from '@/lib/prisma'

export async function GET() {
    try {
        const session = await getServerSession()

        if (!session) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            )
        }

        const projects = await prisma.project.findMany({
            where: {
                isPublished: true
            },
            orderBy: {
                order: 'asc'
            }
        })

        return NextResponse.json(projects)
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch projects' },
            { status: 500 }
        )
    }
}

export async function POST(request: Request) {
    try {
        const session = await getServerSession()

        if (!session) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            )
        }

        const data = await request.json()

        const project = await prisma.project.create({
            data: {
                company: data.company,
                title: data.title,
                period: data.period,
                description: data.description,
                responsibilities: data.responsibilities,
                order: data.order || 0,
                isPublished: data.isPublished || false
            }
        })

        return NextResponse.json(project)
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to create project' },
            { status: 500 }
        )
    }
}

