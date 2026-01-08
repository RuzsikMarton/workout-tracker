import { PrismaClient } from "@prisma/client";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { customSession } from "better-auth/plugins";

const prisma = new PrismaClient();

async function findUserRoles(userId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { role: true }
    });
    
    return user?.role || "USER";
  } catch (error) {
    console.error("Error finding user role:", error);
    return "USER"; // Default fallback
  }
}

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [customSession(async ({user, session}) => {
    const role = await findUserRoles(session.userId);
   
    return {
      role,
      session, 
      user
    }
  }), nextCookies()]
});
