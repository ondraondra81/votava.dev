// src/components/cv/Footer.tsx
import { Github, Linkedin, Mail } from 'lucide-react'
import {getContact} from "@/lib/dataProviders";


export async function Footer() {
    const contact = await getContact();

    return (
        <footer className="bg-red-900 text-white mt-12">
            <div className="max-w-5xl mx-auto px-4 py-8">
                <div className="flex justify-between items-center">
                    <p>&copy; {new Date().getFullYear()} {contact.name}</p>
                    <div className="flex space-x-4">
                        <a
                            href={contact.github}
                            className="hover:text-gray-300"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Github className="w-6 h-6" />
                        </a>
                        <a
                            href={contact.linkedin}
                            className="hover:text-gray-300"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Linkedin className="w-6 h-6" />
                        </a>
                        <a
                            href={contact.email}
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