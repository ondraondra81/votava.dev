// src/components/cv/Certificates.tsx
export function Certificates() {
    const certificates = [
        {
            name: 'Microsoft® Certified Solutions Associate (MSCA)',
            issuer: 'Microsoft (Prometric)',
            skills: ['SharePoint', 'Windows', 'Office 365']
        },
        {
            name: 'Kerio Certified Security Professional',
            issuer: 'Kerio (Prometric)',
            skills: ['Bezpečnost', 'Správa systémů']
        },
        {
            name: 'MS Exam 70-667',
            issuer: 'Microsoft',
            skills: ['SharePoint 2010', 'Konfigurace']
        },
        {
            name: 'MS Exam 70-688',
            issuer: 'Microsoft',
            skills: ['Windows 8', 'Správa systému']
        }
    ]

    return (
        <section className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Certifikace</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {certificates.map((cert, index) => (
                    <div key={index} className="border rounded-lg p-4">
                        <h3 className="font-semibold text-gray-900">{cert.name}</h3>
                        <p className="text-gray-600">{cert.issuer}</p>
                        <p className="text-sm text-gray-500 mt-2">
                            {cert.skills.join(', ')}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    )
}