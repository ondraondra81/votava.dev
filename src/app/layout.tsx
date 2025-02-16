// src/app/layout.tsx
import { Inter } from 'next/font/google'
import { getServerSession } from 'next-auth'
import { headers } from 'next/headers'
import AuthProvider from '@/components/AuthProvider'
import './globals.css'

const inter = Inter({ subsets: ['latin', 'latin-ext'] })

export default async function RootLayout({
                                             children,
                                         }: {
    children: React.ReactNode
}) {
    const session = await getServerSession()
    const headersList = await headers()

    return (
        <html lang="cs">
        <body className={inter.className}>
        <AuthProvider session={session}>
            {children}
        </AuthProvider>
        </body>
        </html>
    )
}