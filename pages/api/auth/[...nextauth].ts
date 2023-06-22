import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import prismadb from "@/lib/prismadb";

import { PrismaAdapter } from "@next-auth/prisma-adapter";

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    Credentials({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
        },
        password: {
          label: "Password",
          type: "passord",
        },
      },
      async authorize(credentials) {
        // Check if both email and password are provided in credentials
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password required");
        }

        // Find a user with the provided email in the database
        const user = await prismadb.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        // If the user or hashedPassword is missing, throw an error
        if (!user || !user.hashedPassword) {
          throw new Error("Email does not exist");
        }

        // Compare the provided password with the hashed password stored in the database
        const isCorrectPassword = await compare(
          credentials.password,
          user.hashedPassword
        );

        // If the password is incorrect, throw an error
        if (!isCorrectPassword) {
          throw new Error("Incorrect password");
        }

        // Return the user object if authentication is successful
        return user;
      },
    }),
  ],
  pages: {
    signIn: "/auth",
  },
  debug: process.env.NODE_ENV === "development",
  adapter: PrismaAdapter(prismadb),
  session: { strategy: "jwt" },
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET,
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
