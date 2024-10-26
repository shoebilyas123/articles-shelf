import type { NextAuthOptions } from 'next-auth';

const nextConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {},
  providers: [],
} satisfies NextAuthOptions;

export default nextConfig;
