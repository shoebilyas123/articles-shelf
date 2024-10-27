import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { User, connectMongoDB } from './lib/db';
import { ZodError } from 'zod';
import { SignInSchema } from '@/types/zod';
import { NextResponse } from 'next/server';

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: '/auth/login',
  },
  callbacks: {
    session: async ({ session, token }) => {
      session.userId = token.sub as string;
      return Promise.resolve(session);
    },
    authorized: async ({ auth, request: { nextUrl } }) => {
      const isLoggedIn = !!auth?.user;
      const isOnLogin = nextUrl.pathname.startsWith('/auth');
      if (!isLoggedIn) {
        return false;
      }
      if (isOnLogin && isLoggedIn) {
        return Response.redirect(new URL('/portal', nextUrl));
      }
      return true;
    },
    signIn: async ({ user }) => {
      if (!user || !user?.id) {
        return false;
      }
      return true;
    },
  },
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          await connectMongoDB();
          let user = null;

          const { email, password } = await SignInSchema.parseAsync(
            credentials
          );
          user = await User.findOne({ email: email });

          if (!user) {
            throw new Error('User not found');
          }

          if (!(await user.isCorrectPassword(password, user.password))) {
            return null;
          }

          return user;
        } catch (err) {
          if (err instanceof ZodError) {
            return null;
          }
        }
      },
    }),
  ],
});
