import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

const secret = process.env.NEXTAUTH_SECRET

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  // Fetch the token from cookies
  const token = await getToken({ req: request, secret })


  // If there's no token, redirect to the login page
  if (!token) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // If authenticated, continue to the requested route
  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/dashboard/:path*'],
}
