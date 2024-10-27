import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// session_store = {[uuid_4_id]: {email: string, name: string; userId: string, expiresIn:Date}}
export const session_store: Record<string, any> = {};

export default async function (req: NextRequest) {
  const isLoginPage = req.nextUrl.pathname.startsWith('/auth');
  console.log(req.cookies);

  if (req.cookies.get('session')?.value == undefined && !isLoginPage) {
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  const sessionId = req.cookies.get('session')?.value as string;
  const session = session_store[sessionId];

  if (!session && !isLoginPage) {
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    {
      source:
        '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
    {
      source:
        '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
      has: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },

    {
      source:
        '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
      has: [{ type: 'header', key: 'x-present' }],
      missing: [{ type: 'header', key: 'x-missing', value: 'prefetch' }],
    },
  ],
};
