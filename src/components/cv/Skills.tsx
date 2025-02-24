// src/components/cv/Skills.tsx
interface Skill {
    id: number
    name: string
    description: string
    level: number
    category: string
}

type GroupedSkills = Record<string, Skill[]>

interface Props {
    skills: GroupedSkills
}

export function Skills({ skills }: Props) {
    return (
        <section className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Technické dovednosti</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {Object.entries(skills).map(([category, categorySkills]) => (
                    <div key={category}>
                        <h3 className="font-semibold text-gray-900 mb-4">{category}</h3>
                        <ul className="space-y-6">
                            {categorySkills.map((skill) => (
                                <li key={skill.id}>
                                    <div className="mb-2">
                                        <div className="flex items-start">
                                            <span className="font-medium text-gray-900">{skill.name}:&nbsp;</span>
                                            <span className="text-gray-600">{skill.description}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                                            <div
                                                className="bg-red-700 h-2 rounded-full"
                                                style={{ width: `${skill.level}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </section>
    )
}