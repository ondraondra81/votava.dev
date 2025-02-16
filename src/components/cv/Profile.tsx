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
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{profile.title}</h3>
                <p className="text-gray-600">{profile.summary}</p>
            </div>
        </section>
    )
}