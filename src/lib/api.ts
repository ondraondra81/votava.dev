// src/lib/api.ts
export async function getProfile() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/public/profile`, {
        next: { revalidate: 60 } // revalidate every 60 seconds
    })
    if (!res.ok) throw new Error('Failed to fetch profile')
    return res.json()
}

export async function getContact() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/public/contact`, {
        next: { revalidate: 60 }
    })
    if (!res.ok) throw new Error('Failed to fetch contact')
    return res.json()
}

export async function getProjects() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/public/projects`, {
        next: { revalidate: 60 }
    })
    if (!res.ok) throw new Error('Failed to fetch projects')
    return res.json()
}

export async function getExperience() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/public/experience`, {
        next: { revalidate: 60 }
    })
    if (!res.ok) throw new Error('Failed to fetch experience')
    return res.json()
}

export async function getSkills() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/public/skills`, {
        next: { revalidate: 60 }
    })
    if (!res.ok) throw new Error('Failed to fetch skills')
    return res.json()
}

export async function getCertificates() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/public/certificates`, {
        next: { revalidate: 60 }
    })
    if (!res.ok) throw new Error('Failed to fetch certificates')
    return res.json()
}