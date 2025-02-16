// src/app/admin/certificates/new/page.tsx
import EditCertificatePage from '../[id]/edit/page'

export default function NewCertificatePage() {
    return <EditCertificatePage params={{ id: 'new' }} />
}