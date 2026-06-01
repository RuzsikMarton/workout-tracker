import { PrismaClient } from "@prisma/client";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { customSession } from "better-auth/plugins";
import { expo } from "@better-auth/expo";

const prisma = new PrismaClient();

async function findUserRoles(userId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { role: true },
    });

    return user?.role || "USER";
  } catch (error) {
    console.error("Error finding user role:", error);
    return "USER"; // Default fallback
  }
}

const envTrustedOrigins =
  process.env.TRUSTED_ORIGINS?.split(",")
    .map((o) => o.trim())
    .filter(Boolean) ?? [];

export const auth = betterAuth({
  baseURL:
    process.env.BETTER_AUTH_URL ||
    process.env.NEXT_PUBLIC_BASE_URL ||
    "http://localhost:3000",
  trustedOrigins: [
    ...envTrustedOrigins,
    "workouttrackermobileapp://",
    "exp://",
    "exp://**",
    "exp://192.168.*.*:*/**",
    "exp://10.0.0.*:*/**",
    "exp://172.16.*.*:*/**",
  ],
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  user: {
    changeEmail: {
      enabled: true,
      updateEmailWithoutVerification: true,
    },
  },
  emailAndPassword: {
    enabled: true,
  },
  plugins: [
    expo(),
    customSession(async ({ user, session }) => {
      const role = await findUserRoles(session.userId);

      return {
        role,
        session,
        user,
      };
    }),
    nextCookies(),
  ],
});
