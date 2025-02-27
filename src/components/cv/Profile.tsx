// src/components/cv/Profile.tsx
interface Profile {
    title: string
    summary: string
}

interface Props {
    profile: Profile
}

export function Profile({ profile }: Props) {
    return (
        <section className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Profil</h2>
            <div>
                {profile.summary && (profile.summary.split('\n')
                    .filter(paragraph => paragraph.trim() !== '') // Remove empty paragraphs
                    .map((paragraph, index) => (
                        <p className="text-gray-600 pb-5" key={index}>{paragraph.trim()}</p>
                    )))}
            </div>
        </section>
    )
}