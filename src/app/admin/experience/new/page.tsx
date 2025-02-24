// src/app/admin/experience/new/page.tsx
import EditExperiencePage from '../[id]/edit/page'

export default function NewExperiencePage() {
    const params = Promise.resolve({ id: 'new' })
    return <EditExperiencePage params={params} />
}