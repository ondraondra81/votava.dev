// src/lib/dataProviders.ts
import {prisma} from "@/lib/prisma";
import {Experience} from "@/types/experience";
import {JsonValue} from "@prisma/client/runtime/library";
import {Skill} from "@/types/dbTypes";

// Fallback data for build time
const FALLBACK_PROFILE = {
    id: 0,
    title: "Senior IT & Business Analyst",
    summary: "Fallback content for static generation. This will be replaced with real data at runtime.",
    motto: "Turning complex problems into elegant solutions",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
};

const FALLBACK_CONTACT = {
    id: 0,
    name: "Ondřej Votava",
    position: "Senior IT & Business Analyst",
    email: "contact@example.com",
    github: "https://github.com/pixidos",
    linkedin: "https://linkedin.com/in/example",
    phone: null,
    location: "Prague, Czech Republic",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
};

const FALLBACK_EXPERIENCES: Experience[] = [];
const FALLBACK_SKILLS = {};
const FALLBACK_CERTIFICATES = [];

// Helper function to detect build time vs runtime
const isBuildTime = () => {
    return process.env.NODE_ENV === 'production' && process.env.NEXT_PHASE === 'phase-production-build';
};

export const getProfile = async () => {
    try {
        // Use fallback during build
        if (isBuildTime()) {
            console.log('Using fallback profile data during build');
            return FALLBACK_PROFILE;
        }

        return await prisma.profile.findFirst({
            where: {
                isActive: true
            }
        }) || FALLBACK_PROFILE;
    } catch (error) {
        console.error('Error fetching profile:', error);
        return FALLBACK_PROFILE;
    }
};


export const getContact = async () => {
    try {
        // Use fallback during build
        if (isBuildTime()) {
            console.log('Using fallback contact data during build');
            return FALLBACK_CONTACT;
        }

        return await prisma.contact.findFirst({
            where: {
                isActive: true
            }
        }) || FALLBACK_CONTACT;
    } catch (error) {
        console.error('Error fetching Contact:', error);
        return FALLBACK_CONTACT;
    }
};

export const getExperience = async (): Promise<Experience[]> => {
    const parseDescription = (description: JsonValue): string => {
        if (typeof description === "string") return description;
        if (typeof description === "object" && description !== null) return JSON.stringify(description);
        return "";
    };

    try {
        // Use fallback during build
        if (isBuildTime()) {
            console.log('Using fallback experience data during build');
            return FALLBACK_EXPERIENCES;
        }

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
        });

        return rawExperiences.map(exp => ({
            ...exp,
            startDate: exp.startDate.toISOString().split("T")[0],
            endDate: exp.endDate ? exp.endDate.toISOString().split("T")[0] : undefined,
            description: parseDescription(exp.description),
            technologies: exp.technologies || [],
            projects: exp.projects.map(project => ({
                ...project,
                description: parseDescription(project.description),
                startDate: project.startDate ? project.startDate.toISOString().split("T")[0] : undefined,
                endDate: project.endDate ? project.endDate.toISOString().split("T")[0] : undefined
            }))
        }));
    } catch (error) {
        console.error('Error fetching Experiences:', error);
        return FALLBACK_EXPERIENCES;
    }
};

export const getSkills = async (): Promise<Record<string, Skill[]>> => {
    try {
        // Use fallback during build
        if (isBuildTime()) {
            console.log('Using fallback skills data during build');
            return FALLBACK_SKILLS;
        }

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
        }, {} as Record<string, Skill[]>);
    } catch (error) {
        console.error('Error fetching Skills:', error);
        return FALLBACK_SKILLS;
    }
};

export const getCertificates = async () => {
    try {
        // Use fallback during build
        if (isBuildTime()) {
            console.log('Using fallback certificates data during build');
            return FALLBACK_CERTIFICATES;
        }

        return await prisma.certificate.findMany({
            where: {
                isPublished: true
            },
            orderBy: {
                period: 'desc'
            }
        }) || FALLBACK_CERTIFICATES;
    } catch (error) {
        console.error('Error fetching Certificate:', error);
        return FALLBACK_CERTIFICATES;
    }
};