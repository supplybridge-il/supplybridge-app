import { DefaultSession } from 'next-auth';
import { UserRole, UserTier } from './user.types';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      role: UserRole;
      tier: UserTier;
      companyName: string;
    } & DefaultSession['user'];
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    role: UserRole;
    tier: UserTier;
    companyName: string;
  }
}