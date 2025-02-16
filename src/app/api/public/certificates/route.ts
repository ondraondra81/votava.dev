import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
    try {
        const certificates = await prisma.certificate.findMany({
            where: {
                isPublished: true
            },
            orderBy: {
                period: 'desc'
            }
        });

        return NextResponse.json(certificates);
    } catch (error) {
        console.error('Error fetching certificates:', error);
        return NextResponse.json(
            { error: 'Failed to fetch certificates' },
            { status: 500 }
        );
    }
}