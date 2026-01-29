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

export async function getSessionFromHeaders(h: Headers) {
  return auth.api.getSession({ headers: h });
}

export async function getRoleFromHeaders(h: Headers): Promise<Role | null> {
  const session = await getSessionFromHeaders(h);
  return (session?.role as Role) ?? null;
}

export async function isAdminFromHeaders(h: Headers) {
  const role = await getRoleFromHeaders(h);
  return role === "ADMIN";
}

export async function requireRoleFromHeaders(h: Headers, requiredRole: Role) {
  const role = await getRoleFromHeaders(h);
  if (!role) return { ok: false as const, status: 401, error: "Not authenticated" };
  if (role !== requiredRole) return { ok: false as const, status: 403, error: "Forbidden" };
  return { ok: true as const };
}