import { NextRequest, NextResponse } from 'next/server'
import { verifyAuth } from './lib/auth'

export async function middleware(request: NextRequest) {
  const getAuthToken = request.cookies.get('AccessToken')
  const { status } = await verifyAuth(request)

  //cookie oku
  if (!getAuthToken || !status) {
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }
}

export const config = {
  matcher: ['/admin/panel((?!api|_next/static|_next/image|favicon.ico).*)'],
}
 