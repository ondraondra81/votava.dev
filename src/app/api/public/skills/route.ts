// src/app/api/skills/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
    try {
        const skills = await prisma.skill.findMany({
            where: {
                isPublished: true
            },
            orderBy: [
                {
                    category: 'asc'
                },
                {
                    order: 'asc'
                }
            ]
        });

        // Group skills by category
        const groupedSkills = skills.reduce((acc, skill) => {
            if (!acc[skill.category]) {
                acc[skill.category] = [];
            }
            acc[skill.category].push(skill);
            return acc;
        }, {} as Record<string, typeof skills>);

        return NextResponse.json(groupedSkills);
    } catch (error) {
        console.error('Error fetching skills:', error);
        return NextResponse.json(
            { error: 'Failed to fetch skills' },
            { status: 500 }
        );
    }
}