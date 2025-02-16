// src/app/api/admin/profile/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
    try {
        const profile = await prisma.profile.findFirst({
            where: {
                isActive: true
            }
        });

        return NextResponse.json(profile);
    } catch (error) {
        console.error('Error fetching profile:', error);
        return NextResponse.json(
            { error: 'Failed to fetch profile' },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const data = await request.json();
        console.log(data);

        // Deactivate current active profile if exists
        await prisma.profile.updateMany({
            where: { isActive: true },
            data: { isActive: false }
        });

        // Create new profile
        const profile = await prisma.profile.create({
            data: {
                title: data.title,
                summary: data.summary,
                motto: data.motto,
                isActive: true
            }
        });

        return NextResponse.json(profile);
    } catch (error) {
        console.error('Error creating profile:', error);
        return NextResponse.json(
            { error: 'Failed to create profile' },
            { status: 500 }
        );
    }
}

export async function PUT(request: Request) {
    try {
        const data = await request.json();

        const profile = await prisma.profile.update({
            where: {
                id: data.id
            },
            data: {
                title: data.title,
                summary: data.summary,
                motto: data.motto,
            }
        });

        return NextResponse.json(profile);
    } catch (error) {
        console.error('Error updating profile:', error);
        return NextResponse.json(
            { error: 'Failed to update profile' },
            { status: 500 }
        );
    }
}