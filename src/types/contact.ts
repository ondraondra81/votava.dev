// src/types/contact.ts
export interface Contact {
    id: number;
    name: string;
    position: string;
    email: string | null;
    github: string | null;
    linkedin: string | null;
    phone: string | null;
    location: string | null;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}