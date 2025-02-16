'use client';

import { Github, Linkedin, Mail, Download } from 'lucide-react'

interface SocialLinks {
    github?: string
    linkedin?: string
    email?: string
}

const socialLinks: SocialLinks = {
    github: 'https://github.com/yourusername',
    linkedin: 'https://linkedin.com/in/yourusername',
    email: 'mailto:your.email@domain.com'
}

export function CVHeader() {
    const handleDownloadPDF = () => {
        console.log('Stahování PDF...')
    }

    return (
        <header className="bg-white shadow-sm">
            <div className="max-w-5xl mx-auto px-4 py-6">
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Ondřej Votava</h1>
                        <p className="mt-2 text-xl text-gray-600">Senior IT Analytik / Business Analytik</p>
                        <div className="mt-4 flex space-x-4">
                            {socialLinks.github && (
                                <a
                                    href={socialLinks.github}
                                    className="text-gray-500 hover:text-red-700 flex items-center"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Github className="w-5 h-5 mr-2" />
                                    GitHub
                                </a>
                            )}
                            {socialLinks.linkedin && (
                                <a
                                    href={socialLinks.linkedin}
                                    className="text-gray-500 hover:text-red-700 flex items-center"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Linkedin className="w-5 h-5 mr-2" />
                                    LinkedIn
                                </a>
                            )}
                            {socialLinks.email && (
                                <a
                                    href={socialLinks.email}
                                    className="text-gray-500 hover:text-red-700 flex items-center"
                                >
                                    <Mail className="w-5 h-5 mr-2" />
                                    Kontakt
                                </a>
                            )}
                        </div>
                    </div>
                    <button
                        onClick={handleDownloadPDF}
                        className="bg-red-700 text-white px-4 py-2 rounded-lg flex items-center hover:bg-red-800 transition-colors"
                    >
                        <Download className="w-4 h-4 mr-2" />
                        Stáhnout PDF
                    </button>
                </div>
            </div>
        </header>
    )
}