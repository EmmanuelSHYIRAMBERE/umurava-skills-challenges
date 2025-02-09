import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import { AuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

interface Credentials {
  email: string;
  password: string;
}

const prisma = new PrismaClient();

const login = async (credentials: Credentials) => {};

const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
    error: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<any> {
        try {
          if (!credentials) {
            throw new Error("Please provide credentials.");
          }
          const user = await login(credentials);
          if (!user) {
            return null;
          }
          return user;
        } catch (error: any) {
          console.error("Authorization error:", error);
          throw new Error(error.message || "Authentication failed");
        }
      },
    }),
  ],
  debug: process.env.NEXTAUTH_DEBUG === "true",
  session: {
    strategy: "jwt",
    maxAge: Number(process.env.NEXT_AUTH_TIMEOUT || 3600),
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (trigger === "update") {
        return { ...token, ...session.user };
      }

      if (user) {
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
  logger: {
    error(code, metadata) {
      console.error(`NextAuth Error: ${code}`, metadata);
    },
    warn(code) {
      console.warn(`NextAuth Warning: ${code}`);
    },
    debug(code, metadata) {
      console.debug(`NextAuth Debug: ${code}`, metadata);
    },
  },
  events: {
    async signIn(message) {
      console.log("Sign in event");
    },
    async signOut(message) {
      console.log("Sign out event");
    },
    async createUser(message) {
      console.log("User created");
    },
  },
};

export default authOptions;
