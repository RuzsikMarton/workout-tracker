import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Role } from "@prisma/client";

export async function getCurrentUserRole(): Promise<Role | null> {
  const session = await auth.api.getSession({
    headers: await headers()
  });
  
  return session?.role || null;
}

export async function requireRole(requiredRole: Role) {
  const userRole = await getCurrentUserRole();
  
  if (!userRole) {
    throw new Error("User not authenticated");
  }
  
  if (userRole !== requiredRole) {
    throw new Error(`Access denied. Required role: ${requiredRole}`);
  }
  
  return true;
}

export async function isAdmin() {
  const role = await getCurrentUserRole();
  return role === "ADMIN";
}

export async function hasRole(role: Role) {
  const userRole = await getCurrentUserRole();
  return userRole === role;
}