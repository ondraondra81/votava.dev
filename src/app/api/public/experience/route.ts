import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
    try {
        const experiences = await prisma.experience.findMany({
            where: {
                isPublished: true
            },
            orderBy: {
                order: 'asc'
            }
        });

        return NextResponse.json(experiences);
    } catch (error) {
        console.error('Error fetching experiences:', error);
        return NextResponse.json(
            { error: 'Failed to fetch experiences' },
            { status: 500 }
        );
    }
}