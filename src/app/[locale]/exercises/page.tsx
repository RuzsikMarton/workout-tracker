import ExercisesClient from "@/components/exercises/ExercisesClient";
import { getTranslations } from "next-intl/server";

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

export default function Exercises() {
  return (
    <main className="page-main pt-28 dark:bg-secondary">
      <ExercisesClient />
    </main>
  );
}
