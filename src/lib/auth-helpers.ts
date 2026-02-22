import { headers } from "next/headers";
import { auth } from "./auth";
import { ActionResult } from "./actions/adminUsers";

export async function requireSession() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return null;
  return session;
}

export async function requireAdmin(): Promise<ActionResult> {
  const session = await requireSession();

  if (!session?.user) return { ok: false, message: "Unauthorized" };
  if (session.role !== "ADMIN") return { ok: false, message: "Forbidden" };

  return { ok: true };
}
