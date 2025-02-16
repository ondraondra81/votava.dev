// src/app/api/public/contact/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
    try {
        const contact = await prisma.contact.findFirst({
            where: {
                isActive: true
            }
        });

        return NextResponse.json(contact);
    } catch (error) {
        console.error('Error fetching contact:', error);
        return NextResponse.json(
            { error: 'Failed to fetch contact' },
            { status: 500 }
        );
    }
}