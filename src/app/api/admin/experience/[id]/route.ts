import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import {prisma} from "@/lib/prisma";

export async function GET(
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

        const experience = await prisma.experience.findUnique({
            where: {
                id: parseInt(params.id)
            }
        })

        if (!experience) {
            return NextResponse.json(
                { error: 'Experience not found' },
                { status: 404 }
            )
        }

        return NextResponse.json(experience)
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch experience' },
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

        const experience = await prisma.experience.update({
            where: {
                id: parseInt(params.id)
            },
            data: {
                company: data.company,
                position: data.position,
                period: data.period,
                description: data.description,
                responsibilities: data.responsibilities,
                order: data.order,
                isPublished: data.isPublished
            }
        })

        return NextResponse.json(experience)
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to update experience' },
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

        await prisma.experience.delete({
            where: {
                id: parseInt(params.id)
            }
        })

        return NextResponse.json(
            { message: 'Experience deleted successfully' }
        )
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to delete experience' },
            { status: 500 }
        )
    }
}