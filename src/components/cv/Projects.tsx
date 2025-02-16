// src/components/cv/Projects.tsx
interface Project {
    id: number
    company: string
    title: string
    period: string
    description: string
    responsibilities: string[]
}

interface Props {
    projects: Project[]
}

export function Projects({ projects }: Props) {
    return (
        <section className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Vybrané projekty</h2>
            <div className="space-y-8">
                {projects.map((project) => (
                    <div key={project.id} className="border-l-4 border-red-700 pl-4">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-xl font-semibold text-gray-900">
                                    {project.company} - {project.title}
                                </h3>
                                <p className="text-red-700">{project.period}</p>
                            </div>
                        </div>
                        <p className="mt-2 text-gray-600">{project.description}</p>
                        <ul className="mt-2 list-disc list-inside text-gray-600">
                            {project.responsibilities.map((resp, idx) => (
                                <li key={idx}>{resp}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </section>
    )
}