"use client";

import { useTranslations } from "next-intl";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  const t = useTranslations("ExercisePage");
  return (
    <main className="min-h-screen font-sans pt-28 dark:bg-secondary">
      <div className="w-4/5 mx-auto mt-4 rounded-xl border p-6 text-center">
        <p className="font-medium">
          {t("error") ||
            "Something went wrong while loading the exercise. Please try again."}
        </p>
        <p className="mt-2 text-sm text-muted-foreground">{error.digest}</p>
      </div>
    </main>
  );
}
