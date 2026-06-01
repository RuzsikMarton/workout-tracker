import { NextRequest } from "next/server";
import { getExercisesFiltered } from "@/lib/data/get-exercise";

export async function GET(req: NextRequest) {
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
    const res = await getExercisesFiltered({
      equipment,
      muscle: muscleGroup,
    });

    return new Response(
      JSON.stringify({
        data: res,
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
