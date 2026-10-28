import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import { loginSchema } from "@/lib/validators/auth";

export const { handlers, auth, signIn, signOut } = NextAuth({
  secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET || "fallback-secret-12345",
  providers: [
    GitHub({
      authorization: { params: { prompt: "select_account" } },
    }),
    Google({
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        const validatedFields = loginSchema.safeParse(credentials);

        if (!validatedFields.success) return null;

        const { email, password } = validatedFields.data;
        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user || !user.password) {
          return null;
        }

        const passwordsMatch = await bcrypt.compare(password, user.password);

        if (!passwordsMatch) return null;

        return {
          id: user.id,
          email: user.email,
          username: user.username,
          boardTheme: user.boardTheme,
          pieceTheme: user.pieceTheme,
          isPremium: user.isPremium
        };
      },
    }),
  ],
  session: { strategy: "jwt"},
  pages: { signIn: "/login"},
  callbacks: {
    async signIn({user,account}) {
      if(account?.provider === "credentials") return true;

      if(account?.provider === "google" || account?.provider === "github"){
        if(!user.email) return false;

        const newUser = await prisma.user.upsert({
          where: {
            email: user.email
          },
          update: {},
          create: {
            email: user.email,
            username: user.name ?? user.email.split("@")[0],

          },
        });

        user.id = newUser.id;
        user.boardTheme = newUser.boardTheme;
        user.pieceTheme = newUser.pieceTheme;
        user.isPremium = newUser.isPremium;
        return true;
      }
      return false;
    },
    async jwt({token,user}){
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.boardTheme = user.boardTheme;
        token.pieceTheme = user.pieceTheme;
        token.isPremium = user.isPremium;
      }
    return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.username = token.username as string;
        session.user.boardTheme = token.boardTheme as string;
        session.user.pieceTheme = token.pieceTheme as string;
        session.user.isPremium = token.isPremium as boolean;
      }
      return session;
    },
  },
  
});