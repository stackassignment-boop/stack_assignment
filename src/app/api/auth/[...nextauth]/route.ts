import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { db } from '@/lib/db';
import bcrypt from 'bcryptjs';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await db.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.password) {
          return null;
        }

        const isValid = await bcrypt.compare(credentials.password, user.password);

        if (!isValid) {
          return null;
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          image: user.avatar,
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === 'google') {
        // Check if user exists
        const existingUser = await db.user.findUnique({
          where: { email: user.email! },
        });

        if (!existingUser) {
          // Create new user for Google sign-in
          await db.user.create({
            data: {
              email: user.email!,
              name: user.name || 'Student',
              role: 'student',
              password: '', // Empty password for OAuth users
              avatar: user.image,
            },
          });
        } else {
          // Update avatar if user exists but no avatar
          if (!existingUser.avatar && user.image) {
            await db.user.update({
              where: { id: existingUser.id },
              data: { avatar: user.image },
            });
          }
        }
      }
      return true;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.image = token.picture as string;
      }
      return session;
    },
    async jwt({ token, user, account, trigger, session }) {
      // Initial sign in
      if (user) {
        // Get user from database to get role and other info
        const dbUser = await db.user.findUnique({
          where: { email: user.email! },
        });
        token.id = dbUser?.id || user.id;
        token.role = dbUser?.role || 'student';
        token.name = dbUser?.name || user.name;
        token.email = dbUser?.email || user.email;
        token.picture = dbUser?.avatar || user.image;
      }
      
      // Update session
      if (trigger === 'update' && session) {
        token.name = session.name;
        token.email = session.email;
      }
      
      return token;
    },
    async redirect({ url, baseUrl }) {
      // If the url is relative, prepend the base url
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      // If the url is already absolute and on the same domain, allow it
      if (new URL(url).origin === baseUrl) return url;
      // Default redirect to student dashboard after login
      return `${baseUrl}/?view=student-dashboard`;
    },
  },
  pages: {
    signIn: '/?view=student-login',
    error: '/?view=student-login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET || 'stack-assignment-secret-key-2024',
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
