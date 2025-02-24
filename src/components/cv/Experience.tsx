// src/components/cv/Experience.tsx
import { formatPeriod } from "@/lib/utils";
import type {Experience} from "@/types/experience"


interface Props {
    experiences: Experience[];
}


export function Experience({ experiences }: Props) {
    return (
        <section className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Pracovní zkušenosti & Projekty</h2>
            <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-red-700"></div>
                <div className="space-y-12">
                    {experiences.map((exp) => (
                        <div key={exp.id} className="relative pl-12">
                            <div className="absolute left-2 w-4 h-4 bg-red-700 rounded-full border-4 border-white"></div>
                            <div className="flex flex-col md:flex-row md:justify-between">
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-900">{exp.company}</h3>
                                    <p className="text-red-700 font-medium">{exp.position}</p>
                                </div>
                                <p className="text-gray-500">
                                    {formatPeriod(
                                        exp.startDate,
                                        exp.endDate,
                                        exp.isPresent
                                    )}
                                </p>
                            </div>
                            <div className="mt-2 text-gray-600" dangerouslySetInnerHTML={{ __html: exp.description }}></div>

                            {exp.projects.length > 0 && (
                                <div className="mt-6">
                                    <h4 className="text-lg font-semibold text-gray-900">Projekty:</h4>
                                    <div className="space-y-4 mt-2">
                                        {exp.projects.map((project) => (
                                            <div key={project.id} className="border-l-2 border-gray-500 pl-4">
                                                <h5 className="text-lg font-semibold text-gray-900">{project.title}</h5>
                                                <p className="text-gray-500">
                                                    {formatPeriod(
                                                        project.startDate,
                                                        project.endDate,
                                                        project.isPresent
                                                    )}
                                                </p>
                                                <div className="mt-2 text-gray-600" dangerouslySetInnerHTML={{ __html: project.description }}></div>
                                                {project.technologies.length > 0 && (
                                                    <p className="mt-2 text-sm text-gray-500">
                                                        <strong>Technologie:</strong> {project.technologies.join(", ")}
                                                    </p>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
