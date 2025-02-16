// src/components/cv/Experience.tsx
export function Experience() {
    const experiences = [
        {
            company: 'ČSOB Leasing',
            position: 'Senior IT Analytik',
            period: '2022 - 2023',
            description: 'Analýza změn potřebných pro reintegraci aplikací do nového core systému.',
            responsibilities: [
                'Vytváření detailních návrhových dokumentů',
                'Analýza chyb a přiřazování úkolů vývojářům',
                'Release management a správa nasazení na ACC a PROD prostředí'
            ]
        },
        {
            company: 'MEDIA FACTORY Czech Republic a.s.',
            position: 'IT Analytik, Senior developer - Team leader',
            period: '2017 - 2022',
            description: 'Vedení týmu 8 IT profesionálů v oblasti IT služeb.',
            responsibilities: [
                'Business analýza a návrh řešení',
                'Vysokoúrovňový a detailní funkční design',
                'Návrh aplikací a vývoj software',
                'Odhad nákladů na projekty'
            ]
        }
    ]

    return (
        <section className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Pracovní zkušenosti</h2>
            <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-red-700"></div>
                <div className="space-y-12">
                    {experiences.map((exp, index) => (
                        <div key={index} className="relative pl-12">
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