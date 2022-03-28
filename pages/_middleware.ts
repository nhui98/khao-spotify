import { NextResponse } from "next/server"

const signedInPages = [
    '/',
    '/playlist',
    '/library'
]

export default function middleware(req) {
    if (signedInPages.find(p => p === req.nextUrl.pathname)) {

        const token = req.cookies.COOKIE_TOKEN

        if (!token) {
            return NextResponse.redirect(`${req.nextUrl.origin}/signin`)
        }
    }
}