// src/components/cv/Footer.tsx
import { Github, Linkedin, Mail } from 'lucide-react'

export function Footer() {
    const socialLinks = {
        github: 'https://github.com/yourusername',
        linkedin: 'https://linkedin.com/in/yourusername',
        email: 'mailto:your.email@domain.com'
    }

    return (
        <footer className="bg-red-900 text-white mt-12">
            <div className="max-w-5xl mx-auto px-4 py-8">
                <div className="flex justify-between items-center">
                    <p>&copy; {new Date().getFullYear()} Ondřej Votava</p>
                    <div className="flex space-x-4">
                        <a
                            href={socialLinks.github}
                            className="hover:text-gray-300"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Github className="w-6 h-6" />
                        </a>
                        <a
                            href={socialLinks.linkedin}
                            className="hover:text-gray-300"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Linkedin className="w-6 h-6" />
                        </a>
                        <a
                            href={socialLinks.email}
                            className="hover:text-gray-300"
                        >
                            <Mail className="w-6 h-6" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}