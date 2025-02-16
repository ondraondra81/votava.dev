// src/app/cv/page.tsx
import {
    getContact,
    getProfile,
    getProjects,
    getExperience,
    getSkills,
    getCertificates
} from '@/lib/api'
import { CVHeader } from '@/components/cv/CVHeader'
import { Profile } from '@/components/cv/Profile'
import { Projects } from '@/components/cv/Projects'
import { Experience } from '@/components/cv/Experience'
import { Skills } from '@/components/cv/Skills'
import { Certificates } from '@/components/cv/Certificates'
import { Footer } from '@/components/Footer'

export default async function CVPage() {
    // Načteme všechna data paralelně
    const [contact, profile, projects, experience, skills, certificates] = await Promise.all([
        getContact(),
        getProfile(),
        getProjects(),
        getExperience(),
        getSkills(),
        getCertificates()
    ])

    return (
        <div className="min-h-screen bg-gray-50">
            <CVHeader contact={contact} />
            <main className="max-w-5xl mx-auto px-4 py-8">
                <Profile profile={profile} />
                <Projects projects={projects} />
                <Experience experience={experience} />
                <Skills skills={skills} />
                <Certificates certificates={certificates} />
            </main>
            <Footer />
        </div>
    )
}

// Metadata pro lepší SEO
export const metadata = {
    title: 'Ondřej Votava - CV',
    description: 'Senior IT & Business Analyst s více než 15 lety zkušeností v oblasti analýzy a vývoje informačních systémů.'
}