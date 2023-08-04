import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "./db";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  secret: process.env.NEXT_AUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials, req) {
        // get frontend data
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        // check there have data
        if (email && password) {
          // get data from databse by frontend data
          const dbUser = await db.admin.findUnique({
            where: {
              email,
            },
          });

          if (!dbUser) throw new Error("404"); // not found

          if (dbUser?.password !== password) throw new Error("401"); // not matched

          return dbUser as any;
        } else {
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/sign-in",
  },
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.picture = user.image_url;
      }
      return token;
    },
  },
};
