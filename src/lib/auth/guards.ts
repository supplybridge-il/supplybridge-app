import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/config';
import { NextResponse } from 'next/server';
import { UserRole, UserTier, UserSession } from '@/types/user.types';

// Define a strict type for Next.js route segment parameters
export type RouteContext = { params: Record<string, string> };
type Handler = (req: Request, context: RouteContext) => Promise<NextResponse> | NextResponse;

export function withAuth(handler: Handler) {
  return async (req: Request, context: RouteContext) => {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return handler(req, context);
  };
}

export function withRole(allowedRoles: UserRole[]) {
  return function (handler: Handler) {
    return async (req: Request, context: RouteContext) => {
      const session = await getServerSession(authOptions);
      const user = session?.user as UserSession | undefined;
      if (!user || !allowedRoles.includes(user.role)) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
      }
      return handler(req, context);
    };
  };
}

export function withPremium(handler: Handler) {
  return async (req: Request, context: RouteContext) => {
    const session = await getServerSession(authOptions);
    const user = session?.user as UserSession | undefined;
    if (user?.tier !== UserTier.PREMIUM) {
      return NextResponse.json(
        { error: 'Premium Required', upgradeRequired: true }, 
        { status: 403 }
      );
    }
    return handler(req, context);
  };
}