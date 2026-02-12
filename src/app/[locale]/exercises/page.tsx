import ExercisesClient from "@/components/exercises/ExercisesClient";
import { auth } from "@/lib/auth";
import { getExercises } from "@/lib/data/get-exercise";
import { ExercisePrisma } from "@/types";
import { getTranslations } from "next-intl/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("exercises"),
  };
}

const ExercisePage = async ({
  searchParams,
}: {
  searchParams: Promise<{
    equipment?: string;
    muscle?: string;
    sort?: string;
    page?: string;
    pageSize?: string;
  }>;
}) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/signin");
  }

  const params = await searchParams;
  const equipment = params?.equipment ?? "";
  const muscle = params?.muscle ?? "";
  const sort = params?.sort ?? "asc";
  const page = Math.max(1, parseInt(params?.page ?? "1", 10));
  const pageSize = Math.min(
    100,
    Math.max(1, parseInt(params?.pageSize ?? "10", 10)),
  );
  let exercises: ExercisePrisma[] = [];
  let totalExercises = 0;
  let error: string | null = null;

  try {
    const res = await getExercises({ equipment, muscle, sort, page, pageSize });
    exercises = res.exercises;
    totalExercises = res.pagination.total;
  } catch (err) {
    error = err instanceof Error ? err.message : "Failed to fetch exercises";
  }

  return (
    <main className="page-main app-layout">
      <ExercisesClient
        exercises={exercises}
        totalExercises={totalExercises}
        error={error}
      />
    </main>
  );
};

export default ExercisePage;
