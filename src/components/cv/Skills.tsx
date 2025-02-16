// src/components/cv/Skills.tsx
interface Skill {
    id: number
    name: string
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(skills).map(([category, categorySkills]) => (
                    <div key={category}>
                        <h3 className="font-semibold text-gray-900 mb-2">{category}</h3>
                        <ul className="space-y-2">
                            {categorySkills.map((skill) => (
                                <li key={skill.id} className="flex items-center">
                                    <span className="w-32 text-gray-600">{skill.name}</span>
                                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                                        <div
                                            className="bg-red-700 h-2 rounded-full"
                                            style={{ width: `${skill.level}%` }}
                                        ></div>
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