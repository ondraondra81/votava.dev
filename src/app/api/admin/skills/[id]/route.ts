// src/app/api/skills/[id]/route.ts
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import {prisma} from "@/lib/prisma";

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const skill = await prisma.skill.findUnique({
            where: {
                id: parseInt(params.id)
            }
        })

        if (!skill) {
            return NextResponse.json(
                { error: 'Skill not found' },
                { status: 404 }
            )
        }

        return NextResponse.json(skill)
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch skill' },
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
        const id = await params.id
        const data = await request.json()

        const skill = await prisma.skill.update({
            where: {
                id: parseInt(params.id)
            },
            data: {
                name: data.name,
                description: data.description,
                level: data.level,
                category: data.category,
                order: data.order,
                isPublished: data.isPublished
            }
        })

        return NextResponse.json(skill)
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to update skill' },
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

        await prisma.skill.delete({
            where: {
                id: parseInt(params.id)
            }
        })

        return NextResponse.json(
            { message: 'Skill deleted successfully' }
        )
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to delete skill' },
            { status: 500 }
        )
    }
}