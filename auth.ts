import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { User, connectMongoDB } from './lib/db';
import { ZodError } from 'zod';
import { SignInSchema } from '@/types/zod';

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/register',
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
