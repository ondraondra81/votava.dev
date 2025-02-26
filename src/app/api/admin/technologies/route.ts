// src/app/api/admin/technologies/route.ts
import { NextResponse } from 'next/server'
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {

        // Získání všech technologií z projektů
        const projects = await prisma.project.findMany({
            select: {
                technologies: true
            }
        })

        // Získání všech technologií z pracovních zkušeností
        const experiences = await prisma.experience.findMany({
            select: {
                technologies: true
            }
        })

        // Vytvoření seznamu unikátních technologií
        const projectTechnologies = projects.flatMap(project => project.technologies)
        const experienceTechnologies = experiences.flatMap(exp => exp.technologies)
        const allTechnologies = [...projectTechnologies, ...experienceTechnologies]
        const uniqueTechnologies = [...new Set(allTechnologies)].sort()

        return NextResponse.json(uniqueTechnologies)
    } catch (error) {
        console.error('Error fetching technologies:', error)
        return NextResponse.json(
            { error: 'Failed to fetch technologies' },
            { status: 500 }
        )
    }
}