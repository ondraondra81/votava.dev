// src/app/api/admin/contact/route.ts
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

export async function POST(request: Request) {
    try {
        const data = await request.json();

        // Deactivate current active contact if exists
        await prisma.contact.updateMany({
            where: { isActive: true },
            data: { isActive: false }
        });

        // Create new contact
        const contact = await prisma.contact.create({
            data: {
                name: data.name,
                position: data.position,
                email: data.email,
                github: data.github,
                linkedin: data.linkedin,
                phone: data.phone,
                location: data.location,
                isActive: true
            }
        });

        return NextResponse.json(contact);
    } catch (error) {
        console.error('Error creating contact:', error);
        return NextResponse.json(
            { error: 'Failed to create contact' },
            { status: 500 }
        );
    }
}

export async function PUT(request: Request) {
    try {
        const data = await request.json();

        const contact = await prisma.contact.update({
            where: {
                id: data.id
            },
            data: {
                name: data.name,
                position: data.position,
                email: data.email,
                github: data.github,
                linkedin: data.linkedin,
                phone: data.phone,
                location: data.location
            }
        });

        return NextResponse.json(contact);
    } catch (error) {
        console.error('Error updating contact:', error);
        return NextResponse.json(
            { error: 'Failed to update contact' },
            { status: 500 }
        );
    }
}