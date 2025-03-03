// src/lib/prisma.ts
import { PrismaClient } from '@prisma/client'

// Check if we're in build mode
const isBuildTime = () => {
    return process.env.NODE_ENV === 'production' && process.env.NEXT_PHASE === 'phase-production-build';
};

// Create a mock Prisma client for build time
const createMockPrismaClient = () => {
    return {
        $connect: () => Promise.resolve(),
        $disconnect: () => Promise.resolve(),
        // Add other mock implementations as needed
    } as unknown as PrismaClient;
};

// For development and production (runtime)
const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined
}

// Use a mock client during build
export const prisma = isBuildTime()
    ? createMockPrismaClient()
    : globalForPrisma.prisma ?? new PrismaClient({
    log: ['error'],
    errorFormat: 'minimal',
});

// Only save the real client reference in dev
if (process.env.NODE_ENV !== 'production' && !isBuildTime()) {
    globalForPrisma.prisma = prisma;
}