// src/app/api/skills/[id]/route.ts
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import {prisma} from "@/lib/prisma";

export async function GET(request: Request, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
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

export async function PUT(request: Request, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    try {
        const session = await getServerSession()

        if (!session) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            )
        }
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
        console.log(error)
        return NextResponse.json(
            { error: 'Failed to update skill' },
            { status: 500 }
        )
    }
}

export async function DELETE(request: Request, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
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