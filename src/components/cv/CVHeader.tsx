// src/components/cv/CVHeader.tsx
import { Github, Linkedin, Mail } from 'lucide-react'
import { DownloadPDFButton } from './DownloadPDFButton'

interface Contact {
    name: string
    position: string
    email: string | null
    github: string | null
    linkedin: string | null
}

interface Props {
    contact: Contact
}

export function CVHeader({ contact }: Props) {
    return (
        <header className="bg-white shadow-sm">
            <div className="max-w-5xl mx-auto px-4 py-6">
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900"><a href={"/"}>{contact.name}</a></h1>
                        <p className="mt-2 text-xl text-gray-600">{contact.position}</p>
                        <div className="mt-4 flex space-x-4">
                            {contact.github && (
                                <a
                                    href={contact.github}
                                    className="text-gray-500 hover:text-red-700 flex items-center"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Github className="w-5 h-5 mr-2" />
                                    GitHub
                                </a>
                            )}
                            {contact.linkedin && (
                                <a
                                    href={contact.linkedin}
                                    className="text-gray-500 hover:text-red-700 flex items-center"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Linkedin className="w-5 h-5 mr-2" />
                                    LinkedIn
                                </a>
                            )}
                            {contact.email && (
                                <a
                                    href={`mailto:${contact.email}`}
                                    className="text-gray-500 hover:text-red-700 flex items-center"
                                >
                                    <Mail className="w-5 h-5 mr-2" />
                                    Kontakt
                                </a>
                            )}
                        </div>
                    </div>
                    <DownloadPDFButton />
                </div>
            </div>
        </header>
    )
}