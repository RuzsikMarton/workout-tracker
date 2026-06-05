import { requireSession } from "@/lib/auth-helpers";
import { getUserProfile } from "@/lib/data/get-profile";

export async function GET(request: Request) {
  try {
    const session = await requireSession();
    if (!session) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const res = await getUserProfile(session.user.id);
    return new Response(JSON.stringify(res), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Failed to fetch user profile:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
