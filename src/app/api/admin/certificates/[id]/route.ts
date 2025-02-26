// src/app/api/certificates/[id]/route.ts
import { NextResponse } from 'next/server'
import {prisma} from "@/lib/prisma";

export async function GET(request: Request, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    try {

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

export async function PUT(request: Request, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    try {

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

export async function DELETE(request: Request, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    try {

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