import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import {prisma} from "@/lib/prisma";

export async function GET() {
    try {
        const session = await getServerSession()

        if (!session) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            )
        }

        const experiences = await prisma.experience.findMany({
            where: {
                isPublished: true
            },
            orderBy: {
                order: 'asc'
            }
        })

        return NextResponse.json(experiences)
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch experiences' },
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

        const experience = await prisma.experience.create({
            data: {
                company: data.company,
                position: data.position,
                period: data.period,
                description: data.description,
                responsibilities: data.responsibilities,
                order: data.order || 0,
                isPublished: data.isPublished || false
            }
        })

        return NextResponse.json(experience)
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to create experience' },
            { status: 500 }
        )
    }
}