// src/components/cv/Projects.tsx
export function Projects() {
    const projects = [
        {
            company: 'ČSOB Leasing CZ',
            title: 'PROJECT STAR',
            period: '2022-2023',
            description: 'Analýza dopadu přechodu na nový core systém STAR na podpůrné aplikace a jejich reintegrace do nového systému.',
            responsibilities: [
                'Vytváření detailních návrhů popisujících způsob reintegrace podpůrných aplikací do nového systému',
                'Analýza chyb, jejich popis a přiřazování úkolů vývojářům vedoucí k jejich odstranění',
                'Tvorba release notes a release management reintegrovaných aplikací na ACC a PROD prostředích'
            ]
        },
        {
            company: 'ČSOB CZ',
            title: 'PROJECT 8 BIN',
            period: '2022',
            description: 'Analýza dopadů na systém UniCard způsobených požadavkem karetních asociací Visa a Mastercard na změnu stávajícího 6místného BINu na 8místný.',
            responsibilities: [
                'Analýza všech procedur v systému UniCard, kde se vyhodnocuje a pracuje s 6místným BINem',
                'Analýza a následná identifikace nutných vývojových změn v UC systému'
            ]
        }
    ]

    return (
        <section className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Vybrané projekty</h2>
            <div className="space-y-8">
                {projects.map((project, index) => (
                    <div key={index} className="border-l-4 border-red-700 pl-4">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-xl font-semibold text-gray-900">{project.company} - {project.title}</h3>
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