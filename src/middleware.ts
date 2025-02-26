import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
    async function middleware(req) {
        // Always allow access to auth pages
        if (req.nextUrl.pathname.startsWith("/auth/")) {
            return NextResponse.next()
        }

        const token = req.nextauth.token

        // Redirect to login if not authenticated and trying to access admin pages
        if (!token && req.nextUrl.pathname.startsWith("/admin")) {
            return NextResponse.redirect(new URL("/auth/login", req.url))
        }

        if (!token && req.nextUrl.pathname.startsWith("/api/admin/")) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            )
        }

        return NextResponse.next()
    },
    {
        callbacks: {
            authorized: ({ req, token }) => {
                if (req.nextUrl.pathname.startsWith("/auth/")) {
                    return true
                }
                return !!token
            },
        },
    }
)

export const config = {
    matcher: ["/admin/:path*", "/auth/:path*", "/api/admin/:path*"]
}