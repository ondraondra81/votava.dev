// src/components/cv/Skills.tsx
export function Skills() {
    const skillCategories = [
        {
            name: 'Analýza a dokumentace',
            skills: [
                { name: 'Business Analýza', level: 95 },
                { name: 'System Design', level: 90 },
                { name: 'UML', level: 85 }
            ]
        },
        {
            name: 'Technologie',
            skills: [
                { name: 'Docker', level: 85 },
                { name: 'Git', level: 90 },
                { name: 'MS SharePoint', level: 80 }
            ]
        }
    ]

    return (
        <section className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Technické dovednosti</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {skillCategories.map((category, index) => (
                    <div key={index}>
                        <h3 className="font-semibold text-gray-900 mb-2">{category.name}</h3>
                        <ul className="space-y-2">
                            {category.skills.map((skill, idx) => (
                                <li key={idx} className="flex items-center">
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



