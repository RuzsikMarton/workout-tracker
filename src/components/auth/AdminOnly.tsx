import { isAdmin } from "@/lib/user-role";
import { ReactNode } from "react";

interface AdminOnlyProps {
  children: ReactNode;
  fallback?: ReactNode;
}

/**
 * Wrapper component that only renders children for admin users.
 */
export async function AdminOnly({ children, fallback = null }: AdminOnlyProps) {
  const admin = await isAdmin();

  if (!admin) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
