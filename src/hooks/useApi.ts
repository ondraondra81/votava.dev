// src/hooks/useApi.ts
import useSWR from 'swr'

const fetcher = async (url: string) => {
    const res = await fetch(url)
    if (!res.ok) {
        throw new Error('An error occurred while fetching the data.')
    }
    return res.json()
}

// Zde je změna - přidáváme { useSWR } místo useSWR výchozího exportu
export function useProfile() {
    const { data, error, isLoading } = useSWR('/api/public/profile', fetcher)
    return { data, error, isLoading }
}

export function useContact() {
    const { data, error, isLoading } = useSWR('/api/public/contact', fetcher)
    return { data, error, isLoading }
}

export function useProjects() {
    const { data, error, isLoading } = useSWR('/api/public/projects', fetcher)
    return { data, error, isLoading }
}

export function useExperience() {
    const { data, error, isLoading } = useSWR('/api/public/experience', fetcher)
    return { data, error, isLoading }
}

export function useSkills() {
    const { data, error, isLoading } = useSWR('/api/public/skills', fetcher)
    return { data, error, isLoading }
}

export function useCertificates() {
    const { data, error, isLoading } = useSWR('/api/public/certificates', fetcher)
    return { data, error, isLoading }
}