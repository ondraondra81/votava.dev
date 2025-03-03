// src/app/layout.tsx
import { Inter } from 'next/font/google'
import { getServerSession } from 'next-auth'
import { headers } from 'next/headers'
import AuthProvider from '@/components/AuthProvider'
import './globals.css'

const inter = Inter({ subsets: ['latin', 'latin-ext'] })
export const metadata = {
    title: {
        default: 'Ondřej Votava | Senior IT & Business Analyst',
        template: '%s | Ondřej Votava'
    },
    description: 'Portfolio a profesní profil Ondřeje Votavy - Senior IT & Business Analyst ',
    keywords: ['IT Analyst', 'Business Analyst', 'Software Developer', 'Projektový manažer', 'CV', 'Ondřej Votava'],
    authors: [{ name: 'Ondřej Votava' }],
    creator: 'Ondřej Votava',
    openGraph: {
        type: 'website',
        locale: 'cs_CZ',
        url: 'https://ondra.votava.dev',
        siteName: 'Ondřej Votava | Senior Developer, IT & Business Analyst',
        title: 'Ondřej Votava | Senior Developer, IT & Business Analyst',
        description: 'Portfolio a profesní profil Ondřeje Votavy - Senior IT & Business Analyst'
    }
}


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