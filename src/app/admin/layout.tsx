// src/app/admin/layout.tsx
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'

export default async function AdminLayout({
                                              children,
                                          }: {
    children: React.ReactNode
}) {
    const session = await getServerSession()

    if (!session) {
        redirect('/auth/login')
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-white shadow">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex h-16 items-center justify-between">
                        <div className="flex items-center">
                            <span className="text-xl font-bold">votava.dev Admin</span>
                            <div className="ml-10 flex space-x-4">
                                <a href="/admin" className="text-gray-700 hover:text-red-700">Dashboard</a>
                                <a href="/admin/profile" className="text-gray-700 hover:text-red-700">Profile</a>
                                <a href="/admin/contact" className="text-gray-700 hover:text-red-700">Contact</a>
                                <a href="/admin/experience" className="text-gray-700 hover:text-red-700">Work Experiences</a>
                                <a href="/admin/skills" className="text-gray-700 hover:text-red-700">Skills</a>
                                <a href="/admin/certificates" className="text-gray-700 hover:text-red-700">Certificates</a>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            <main className="max-w-7xl mx-auto py-6 px-4">
                {children}
            </main>
        </div>
    )
}