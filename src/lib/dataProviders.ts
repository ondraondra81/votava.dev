import {prisma} from "@/lib/prisma";

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

export const getExperience = async () => {
    try {

        return await prisma.experience.findMany({
            where: {
                isPublished: true
            },
            orderBy: {
                order: 'asc'
            }
        });

    } catch (error) {
        console.error('Error fetching Experiences:', error)
    }
};

export const getProjects = async () => {
    try {

        return await prisma.project.findMany({
            where: {
                isPublished: true
            },
            orderBy: {
                order: 'asc'
            }
        });
    } catch (error) {
        console.error('Error fetching Projects:', error)
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
                    category: 'asc'
                },
                {
                    order: 'asc'
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



