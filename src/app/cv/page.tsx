// src/app/cv/page.tsx
import {
    getContact,
    getProfile,
    getExperience,
    getSkills,
    getCertificates
} from '@/lib/dataProviders'
import { CVHeader } from '@/components/cv/CVHeader'
import { Profile } from '@/components/cv/Profile'
import { Experience } from '@/components/cv/Experience'
import { Skills } from '@/components/cv/Skills'
import { Certificates } from '@/components/cv/Certificates'
import { Footer } from '@/components/Footer'

// Set to dynamic to prevent static generation issues
export const dynamic = 'force-dynamic';

export const metadata = {
    title: 'Curriculum Vitae',
    description: 'Jsem seniorní vývojář s více než 20 lety zkušeností ve vývoji webových aplikací, informačních systémů a e-commerce řešení.'
}

export default async function CVPage() {
    // Načteme všechna data paralelně
    const [contact, profile, experiences, skills, certificates] = await Promise.all([
        getContact(),
        getProfile(),
        getExperience(),
        getSkills(),
        getCertificates(),
    ])

    return (
        <div className="min-h-screen bg-gray-50">
            <CVHeader contact={contact}/>
            <main className="max-w-5xl mx-auto px-4 py-8">
                <Profile profile={profile}/>
                <Experience experiences={experiences}/>
                <Skills skills={skills}/>
                <Certificates certificates={certificates}/>
            </main>
            <Footer/>
        </div>
    );
}

