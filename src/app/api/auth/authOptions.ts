import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import { AuthOptions, User } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { comparePassword } from "@/lib/utils/password";

interface Credentials {
  email: string;
  password: string;
}

const prisma = new PrismaClient();

interface ExtendedUser extends User {
  id: string;
  verified?: boolean;
  phone?: string;
  role?: string;
}

const login = async (credentials: Credentials) => {
  if (!credentials.email || !credentials.password) {
    throw new Error("Please fill in the credentials.");
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: credentials.email },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const passwordMatch = await await comparePassword(
      credentials.password,
      user.password!
    );

    if (!passwordMatch) {
      throw new Error("Incorrect password");
    }

    return user;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string | null;
      email: string | null;
      image: string | null;
      role?: string;
      phone?: string;
      verified?: boolean;
    };
  }
}

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
      async authorize(credentials): Promise<ExtendedUser | null> {
        try {
          if (!credentials) {
            throw new Error("Please provide credentials.");
          }
          const user = await login(credentials);
          return user;
        } catch (error) {
          console.error("Authorization error:", error);
          throw new Error("Authentication failed");
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
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.image = user.image ?? null;
        token.phone = (user as ExtendedUser).phone;
        token.verified = (user as ExtendedUser).verified;
        token.role = (user as ExtendedUser).role;
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id as string,
          name: token.name as string | null,
          email: token.email as string | null,
          image: token.image as string | null,
          role: token.role as string | undefined,
          phone: token.phone as string | undefined,
          verified: token.verified as boolean | undefined,
        };
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
      console.log("Sign in event", message);
    },
    async signOut(message) {
      console.log("Sign out event", message);
    },
    async createUser(message) {
      console.log("User created", message);
    },
  },
};

export default authOptions;
