// src/app/api/certificates/[id]/route.ts
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

        const certificate = await prisma.certificate.findUnique({
            where: {
                id: parseInt(params.id)
            }
        })

        if (!certificate) {
            return NextResponse.json(
                { error: 'Certificate not found' },
                { status: 404 }
            )
        }

        return NextResponse.json(certificate)
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch certificate' },
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

        const certificate = await prisma.certificate.update({
            where: {
                id: parseInt(params.id)
            },
            data: {
                name: data.name,
                issuer: data.issuer,
                period: data.period,
                skills: data.skills,
                isPublished: data.isPublished
            }
        })

        return NextResponse.json(certificate)
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to update certificate' },
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

        await prisma.certificate.delete({
            where: {
                id: parseInt(params.id)
            }
        })

        return NextResponse.json(
            { message: 'Certificate deleted successfully' }
        )
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to delete certificate' },
            { status: 500 }
        )
    }
}