import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/db/connect';
import User from '@/models/User';
import { UserSession } from '@/types/user.types';

export const authOptions: NextAuthOptions = {
  session: { strategy: 'jwt' },
  pages: { signIn: '/login' },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        await dbConnect();
        const user = await User.findOne({ email: credentials.email }).select('+password');
        
        if (!user || !(await bcrypt.compare(credentials.password, user.password))) {
          return null;
        }

        return {
          id: user._id.toString(),
          email: user.email,
          role: user.role,
          tier: user.tier,
          companyName: user.company.name,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const u = user as unknown as UserSession;
        token.id = u.id;
        token.role = u.role;
        token.tier = u.tier;
        token.companyName = u.companyName;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        Object.assign(session.user, {
          id: token.id,
          role: token.role,
          tier: token.tier,
          companyName: token.companyName,
        });
      }
      return session;
    },
  },
};