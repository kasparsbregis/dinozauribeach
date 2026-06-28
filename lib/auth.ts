import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { prisma } from "@/lib/prisma";

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  pages: {
    signIn: "/",
  },
  callbacks: {
    async signIn({ user }) {
      if (!user.email) {
        return false;
      }

      await prisma.user.upsert({
        where: { email: user.email },
        create: {
          email: user.email,
          name: user.name ?? null,
          image: user.image ?? null,
        },
        update: {
          name: user.name ?? null,
          image: user.image ?? null,
        },
      });

      return true;
    },
    async session({ session }) {
      if (session.user?.email) {
        const dbUser = await prisma.user.findUnique({
          where: { email: session.user.email },
        });

        if (dbUser) {
          session.user.id = dbUser.id;
          session.user.initials = dbUser.initials;
        }
      }

      return session;
    },
  },
});
