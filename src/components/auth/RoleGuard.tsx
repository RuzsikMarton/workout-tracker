import { hasRole } from "@/lib/user-role";
import { Role } from "@prisma/client";
import { ReactNode } from "react";

interface RoleGuardProps {
  children: ReactNode;
  allowedRoles: Role[];
  fallback?: ReactNode;
}

/**
 * Flexible role-based guard component that can check for multiple roles.
 */
export async function RoleGuard({
  children,
  allowedRoles,
  fallback = null,
}: RoleGuardProps) {
  const hasAccess = await Promise.all(
    allowedRoles.map((role) => hasRole(role)),
  ).then((results) => results.some(Boolean));

  if (!hasAccess) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
