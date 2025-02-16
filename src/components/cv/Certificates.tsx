// src/components/cv/Certificates.tsx
interface Certificate {
    id: number
    name: string
    issuer: string
    skills: string[]
}

interface Props {
    certificates: Certificate[]
}

export function Certificates({ certificates }: Props) {
    return (
        <section className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Certifikace</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {certificates.map((cert) => (
                    <div key={cert.id} className="border rounded-lg p-4">
                        <h3 className="font-semibold text-gray-900">{cert.name}</h3>
                        <p className="text-gray-600">{cert.issuer}</p>
                        <div className="mt-2 flex flex-wrap gap-2">
                            {cert.skills.map((skill, index) => (
                                <span
                                    key={index}
                                    className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}