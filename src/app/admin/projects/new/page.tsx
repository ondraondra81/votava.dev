// src/app/admin/projects/new/page.tsx
import EditProjectPage from '../[id]/edit/page'

export default function NewProjectPage() {
    return <EditProjectPage params={{ id: 'new' }} />
}