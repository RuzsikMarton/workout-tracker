import { auth } from "@/lib/auth";
import { NextRequest } from "next/server";
import { getExercises } from "@/lib/data/get-exercise";

export async function GET(req: NextRequest) {
  const session = await auth.api.getSession({ headers: req.headers });
  if (!session?.user) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }
  const searchParams = req.nextUrl.searchParams;
  const equipment = searchParams.get("equipment") || "";
  const muscleGroup = searchParams.get("muscle") || "";
  const orderBy = searchParams.get("sort") || "asc";

  // pagination
  const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
  const pageSize = Math.min(
    100,
    Math.max(1, parseInt(searchParams.get("pageSize") || "10")),
  );

  try {
    const res = await getExercises({
      equipment,
      muscle: muscleGroup,
      sort: orderBy,
      page,
      pageSize,
    });

    return new Response(
      JSON.stringify({
        data: res.exercises,
        pagination: {
          total: res.pagination.total,
          page,
          pageSize: pageSize,
          totalPages: Math.ceil(res.pagination.total / pageSize),
        },
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (error) {
    console.error("Error fetching exercises:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to fetch exercises",
        message: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
