import { CVHeader } from '@/components/Header'
import { Profile } from '@/components/cv/Profile'
import { Projects } from '@/components/cv/Projects'
import { Experience } from '@/components/cv/Experience'
import { Skills } from '@/components/cv/Skills'
import { Certificates } from '@/components/cv/Certificates'
import { Footer } from '@/components/Footer'

export default function Home() {
    return (
        <div className="min-h-screen bg-gray-50">
            <CVHeader />
            <main className="max-w-5xl mx-auto px-4 py-8">
                <Profile />
                <Projects />
                <Experience />
                <Skills />
                <Certificates />
            </main>
            <Footer />
        </div>
    )
}