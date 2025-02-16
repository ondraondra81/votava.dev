// src/app/layout.tsx
import AuthProvider from '@/providers/SessionProvider'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin', 'latin-ext'] })

export default async function RootLayout({
                                             children,
                                         }: {
    children: React.ReactNode
}) {
    return (
        <html lang="cs">
        <body className={inter.className}>
        <AuthProvider>
            {children}
        </AuthProvider>
        </body>
        </html>
    )
}