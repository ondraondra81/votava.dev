// src/app/cv/pdf/page.tsx
import {
    getContact,
    getProfile,
    getExperience,
    getSkills,
    getCertificates
} from '@/lib/dataProviders'
import { formatPeriod } from "@/lib/utils"
import type { Experience } from "@/types/experience"

export default async function PDFVersion() {
    const [contact, profile, experiences, skills, certificates] = await Promise.all([
        getContact(),
        getProfile(),
        getExperience(),
        getSkills(),
        getCertificates(),
    ])

    return (
        <div className="pdf-container bg-white mx-auto">
            {/* Moderní header s gradientem */}
            <div className="bg-gradient-to-r from-red-700 to-red-900 text-white p-12">
                <h1 className="text-4xl font-bold tracking-tight">{contact.name}</h1>
                <p className="text-xl mt-2 text-red-100">{contact.position}</p>
                <div className="flex gap-6 mt-4 text-red-100">
                    {contact.email && (
                        <a href={`mailto:${contact.email}`} className="hover:text-white">
                            {contact.email}
                        </a>
                    )}
                    {contact.phone && (
                        <span>{contact.phone}</span>
                    )}
                    {contact.location && (
                        <span>{contact.location}</span>
                    )}
                </div>
                <div className="flex gap-4 mt-4">
                    {contact.github && (
                        <a
                            href={contact.github}
                            className="bg-white text-red-900 px-4 py-2 rounded-full text-sm font-medium hover:bg-red-50"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {contact.github}
                        </a>
                    )}
                    <a
                        href="https://github.com/pixidos"
                        className="bg-white text-red-900 px-4 py-2 rounded-full text-sm font-medium hover:bg-red-50"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        https://github.com/pixidos
                    </a>
                    {contact.linkedin && (
                        <a
                            href={contact.linkedin}
                            className="bg-white text-red-900 px-4 py-2 rounded-full text-sm font-medium hover:bg-red-50"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {contact.linkedin}
                        </a>
                    )}
                    <a
                        href="https://ondra.votava.dev"
                        className="bg-white text-red-900 px-4 py-2 rounded-full text-sm font-medium hover:bg-red-50"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        https://ondra.votava.dev
                    </a>
                </div>
            </div>

            <div className="p-12 space-y-16">
                {/* Profile section */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-red-900 pb-2 mb-6">Profil</h2>
                    <p className="text-gray-700 leading-relaxed">{profile.summary}</p>
                </section>

                {/* Experience section */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-red-900 pb-2 mb-6">
                        Pracovní zkušenosti & Projekty
                    </h2>
                    <div className="space-y-8">
                        {experiences.map((exp: Experience) => (
                            <div key={exp.id} className="relative pl-8 border-l-2 border-red-200">
                                <div className="absolute -left-2 top-0 w-4 h-4 bg-red-600 rounded-full"></div>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900">{exp.company}</h3>
                                        <p className="text-red-700 font-medium">{exp.position}</p>
                                    </div>
                                    <div className="text-gray-600 font-medium">
                                        {formatPeriod(exp.startDate, exp.endDate, exp.isPresent)}
                                    </div>
                                </div>
                                <div
                                    className="mt-2 text-gray-700"
                                    dangerouslySetInnerHTML={{ __html: exp.description as string }}
                                />

                                {exp.technologies && exp.technologies.length > 0 && (
                                    <div className="mt-2 flex flex-wrap gap-2">
                                        {exp.technologies.map((tech, index) => (
                                            <span
                                                key={index}
                                                className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                {exp.projects && exp.projects.length > 0 && (
                                    <div className="mt-4 space-y-4">
                                        {exp.projects.map((project) => (
                                            <div key={project.id} className="bg-gray-50 rounded-lg p-4 border-l-4 border-red-600">
                                                <div className="flex justify-between items-start">
                                                    <h4 className="text-lg font-semibold text-gray-900">{project.title}</h4>
                                                    <span className="text-sm text-gray-600">
                                                        {formatPeriod(
                                                            project.startDate,
                                                            project.endDate,
                                                            project.isPresent
                                                        )}
                                                    </span>
                                                </div>
                                                <div
                                                    className="mt-2 text-gray-700"
                                                    dangerouslySetInnerHTML={{ __html: project.description as string }}
                                                />
                                                {project.technologies && project.technologies.length > 0 && (
                                                    <div className="mt-2 flex flex-wrap gap-2">
                                                        {project.technologies.map((tech, index) => (
                                                            <span
                                                                key={index}
                                                                className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full"
                                                            >
                                                                {tech}
                                                            </span>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>

                {/* Skills section */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-red-900 pb-2 mb-6">Dovednosti</h2>
                    <div className="grid grid-cols-2 gap-8">
                        {Object.entries(skills).map(([category, categorySkills]) => (
                            <div key={category} className="bg-gray-50 rounded-lg p-6">
                                <h3 className="font-bold text-red-900 mb-4">{category}</h3>
                                <div className="space-y-3">
                                    {categorySkills.map((skill) => (
                                        <div key={skill.id}>
                                            <div className="flex justify-between mb-1">
                                                <span className="font-medium text-gray-700">{skill.name}:&nbsp;</span>
                                                <span className="font-medium text-gray-700">{skill.description}</span>
                                            </div>
                                            <div className="h-2 bg-gray-200 rounded-full">
                                                <div
                                                    className="h-2 bg-gradient-to-r from-gray-600 to-gray-400 rounded-full"
                                                    style={{ width: `${skill.level}%` }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Certificates section */}
                <section>
                    <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-red-900 pb-2 mb-6">Certifikace</h2>
                    <div className="grid grid-cols-2 gap-6">
                        {certificates.map((cert) => (
                            <div key={cert.id} className="bg-gray-50 p-4 rounded-lg">
                                <h3 className="font-bold text-gray-900">{cert.name}</h3>
                                <p className="text-gray-700">{cert.issuer} <small>{cert.period}</small></p>
                                {cert.skills && cert.skills.length > 0 && (
                                    <div className="mt-2 flex flex-wrap gap-1">
                                        {cert.skills.map((skill, index) => (
                                            <span
                                                key={index}
                                                className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    )
}