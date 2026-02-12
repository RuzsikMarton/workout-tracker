import { auth } from "@/lib/auth";
import { getExercise } from "@/lib/data/get-exercise";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const session = await auth.api.getSession({ headers: req.headers });
  if (!session?.user) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { slug } = await params;
  slug.trim();

  try {
    const exercise = await getExercise({ slug });

    if (!exercise) {
      return new Response(JSON.stringify({ error: "Exercise not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify(exercise), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching exercise:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to fetch exercise",
        message: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
