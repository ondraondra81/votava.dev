// src/components/cv/Experience.tsx
interface Experience {
    id: number
    company: string
    position: string
    period: string
    description: string
    responsibilities: string[]
}

interface Props {
    experience: Experience[]
}

export function Experience({ experience }: Props) {
    return (
        <section className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Pracovní zkušenosti</h2>
            <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-red-700"></div>
                <div className="space-y-12">
                    {experience.map((exp) => (
                        <div key={exp.id} className="relative pl-12">
                            <div className="absolute left-2 w-4 h-4 bg-red-700 rounded-full border-4 border-white"></div>
                            <div className="flex flex-col md:flex-row md:justify-between">
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-900">{exp.company}</h3>
                                    <p className="text-red-700 font-medium">{exp.position}</p>
                                </div>
                                <p className="text-gray-500">{exp.period}</p>
                            </div>
                            <p className="mt-2 text-gray-600">{exp.description}</p>
                            <ul className="mt-2 list-disc list-inside text-gray-600">
                                {exp.responsibilities.map((resp, idx) => (
                                    <li key={idx}>{resp}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}