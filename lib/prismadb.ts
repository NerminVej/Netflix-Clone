import { PrismaClient } from "@prisma/client";

// Create a global PrismaClient instance or use the existing one if available
const client = global.prismadb || new PrismaClient();

// Set the global PrismaClient instance if running in production
if (process.env.NODE_ENV === "production") {
  global.prismadb = client;
}

export default client;
