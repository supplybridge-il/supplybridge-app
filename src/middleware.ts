import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || '',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
});

const authRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, '15 m'),
});

export default withAuth(
  async function middleware(req) {
    // Apply rate limiting only to the login endpoint
    if (req.nextUrl.pathname.startsWith('/api/auth/callback/credentials')) {
      const ip = req.headers.get('x-forwarded-for') ?? '127.0.0.1';
      const { success } = await authRateLimit.limit(`auth_limit_${ip}`);
      
      if (!success) {
        return new NextResponse('Too Many Requests', { status: 429 });
      }
    }
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: { signIn: '/login' },
  }
);

export const config = {
  matcher: ['/dashboard/:path*', '/api/auth/callback/credentials'],
};