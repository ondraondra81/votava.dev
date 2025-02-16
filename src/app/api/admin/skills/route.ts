// src/app/api/skills/route.ts
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import prisma from '@/lib/prisma'

export async function GET() {
    try {
        const skills = await prisma.skill.findMany({
            where: {
                isPublished: true
            },
            orderBy: [
                { category: 'asc' },
                { order: 'asc' }
            ]
        })

        return NextResponse.json(skills)
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch skills' },
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

        const skill = await prisma.skill.create({
            data: {
                name: data.name,
                level: data.level,
                category: data.category,
                order: data.order || 0,
                isPublished: data.isPublished || false
            }
        })

        return NextResponse.json(skill)
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to create skill' },
            { status: 500 }
        )
    }
}