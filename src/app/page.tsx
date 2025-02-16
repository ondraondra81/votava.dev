import { Briefcase, FileText, Github, Mail } from 'lucide-react'
import Link from 'next/link'

export default function HomePage() {
    return (
        <div className="min-h-screen bg-gray-50">
            <main className="max-w-5xl mx-auto px-4 pt-20 pb-16">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Ondřej Votava
                    </h1>
                    <p className="text-xl text-gray-600 mb-8">
                        Senior IT & Business Analyst
                    </p>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Specializuji se na analýzu a vývoj informačních systémů s více než 15 lety
                        zkušeností v bankovnictví, telekomunikacích a pojišťovnictví.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    <div className="bg-white rounded-lg shadow p-6">
                        <Briefcase className="w-8 h-8 text-red-700 mb-4" />
                        <h2 className="text-xl font-semibold mb-2">Projektová zkušenost</h2>
                        <p className="text-gray-600">
                            Vedení komplexních IT projektů v bankovnictví a telekomunikacích.
                            Specializace na integraci systémů a analýzu business požadavků.
                        </p>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <FileText className="w-8 h-8 text-red-700 mb-4" />
                        <h2 className="text-xl font-semibold mb-2">Technická expertíza</h2>
                        <p className="text-gray-600">
                            Hluboké znalosti v oblasti systémové analýzy, návrhu řešení
                            a vývoje enterprise aplikací.
                        </p>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <Mail className="w-8 h-8 text-red-700 mb-4" />
                        <h2 className="text-xl font-semibold mb-2">Spolupráce</h2>
                        <p className="text-gray-600">
                            Otevřený novým výzvám a projektům. Specializuji se na dlouhodobou
                            spolupráci a komplexní řešení.
                        </p>
                    </div>
                </div>

                <div className="text-center">
                    <Link
                        href="/cv"
                        className="inline-block bg-red-700 text-white px-8 py-3 rounded-lg font-medium hover:bg-red-800 mb-8"
                    >
                        Zobrazit CV
                    </Link>

                    <div className="flex justify-center space-x-6">
                        <a
                            href="https://github.com/yourusername"
                            className="text-gray-600 hover:text-red-700"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Github className="w-6 h-6" />
                        </a>
                        <a
                            href="mailto:your.email@domain.com"
                            className="text-gray-600 hover:text-red-700"
                        >
                            <Mail className="w-6 h-6" />
                        </a>
                    </div>
                </div>
            </main>
        </div>
    )
}