import {prisma} from "@/lib/prisma";
import {Experience} from "@/types/experience";
import {JsonValue} from "@prisma/client/runtime/library";

export const getProfile = async () => {
    try {

        return await prisma.profile.findFirst({
            where: {
                isActive: true
            }
        });
    } catch (error) {
        console.error('Error fetching profile:', error)
    }
};


export const getContact = async () => {
    try {

        return await prisma.contact.findFirst({
            where: {
                isActive: true
            }
        });
    } catch (error) {
        console.error('Error fetching Contact:', error)
    }
};

export const getExperience = async (): Promise<Experience[]> => {
    const parseDescription = (description: JsonValue): string => {
        if (typeof description === "string") return description;
        if (typeof description === "object" && description !== null) return JSON.stringify(description);
        return "";
    };

    try {

        const rawExperiences = await prisma.experience.findMany({
            where:{
                isPublished: true
            },
            include: {
                projects: true
            },
            orderBy: [
                { startDate: "desc" },
                { endDate: "desc" }
            ]
        })

        return rawExperiences.map(exp => ({
            ...exp,
            startDate: exp.startDate.toISOString().split("T")[0], // Převod Date na "YYYY-MM-DD"
            endDate: exp.endDate ? exp.endDate.toISOString().split("T")[0] : undefined,
            description: parseDescription(exp.description),
            projects: exp.projects.map(project => ({
                ...project,
                description: parseDescription(project.description),
                startDate: project.startDate ? project.startDate.toISOString().split("T")[0] : undefined,
                endDate: project.endDate ? project.endDate.toISOString().split("T")[0] : undefined
            }))
        }));

    } catch (error) {
        console.error('Error fetching Experiences:', error)
    }
};

export const getSkills = async () => {
    try {

        const skills = await prisma.skill.findMany({
            where: {
                isPublished: true
            },
            orderBy: [
                {
                    order: 'desc'
                }
            ]
        });

        // Group skills by category
        return skills.reduce((acc, skill) => {
            if (!acc[skill.category]) {
                acc[skill.category] = [];
            }
            acc[skill.category].push(skill);
            return acc;
        }, {} as Record<string, typeof skills>);
    } catch (error) {
        console.error('Error fetching Skills:', error)
    }
};

export const getCertificates = async () => {
    try {

       return await prisma.certificate.findMany({
            where: {
                isPublished: true
            },
            orderBy: {
                period: 'desc'
            }
        });

    } catch (error) {
        console.error('Error fetching Certificate:', error)
    }
};



