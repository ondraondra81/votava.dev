export interface Skill {
    id: number;
    name: string;
    description: string | null;
    level: number;
    category: string;
    order: number;
    isPublished: boolean;
}