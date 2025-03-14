import NextAuth from "next-auth";
import authOptions from "../authOptions";

import { NextAuthOptions } from "next-auth";

const handler = NextAuth(authOptions as NextAuthOptions);
export { handler as GET, handler as POST };
