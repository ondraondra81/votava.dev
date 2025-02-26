// src/app/api/certificates/route.ts
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import {prisma} from "@/lib/prisma";

export async function GET() {
    try {

        const certificates = await prisma.certificate.findMany({
            where: {
                isPublished: true
            },
            orderBy: {
                updatedAt: 'desc'
            }
        })

        return NextResponse.json(certificates)
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch certificates' },
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

        const certificate = await prisma.certificate.create({
            data: {
                name: data.name,
                issuer: data.issuer,
                period: data.period,
                skills: data.skills,
                isPublished: data.isPublished || false
            }
        })

        return NextResponse.json(certificate)
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to create certificate' },
            { status: 500 }
        )
    }
}