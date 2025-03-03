// src/components/cv/Footer.tsx
import {getContact} from "@/lib/dataProviders";
import {Github, LinkedIn, Mail} from "@/components/icons";



export async function Footer() {
    const contact = await getContact();

    return (
        <footer className="bg-red-900 text-white mt-12">
            <div className="max-w-5xl mx-auto px-4 py-8">
                <div className="flex justify-between items-center">
                    <p>&copy; {new Date().getFullYear()} {contact.name}</p>
                    <div className="flex space-x-4">
                        <a
                            href={contact?.github || 'https://github.com/ondraondra81'}
                            className="hover:text-gray-300"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Github className="w-6 h-6" />
                        </a>
                        <a
                            href={contact?.linkedin || '#'}
                            className="hover:text-gray-300"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <LinkedIn className="w-6 h-6" />
                        </a>
                        <a
                            href={contact?.email || '#'}
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