import { useTranslations } from "next-intl";

export default function Loading() {
  const t = useTranslations("ExercisePage");
  return (
    <main className="min-h-screen font-sans pt-28 dark:bg-secondary">
      <div className="w-4/5 mx-auto mt-4 rounded-xl border p-6 text-center">
        <p className="font-medium">{t("loading")}</p>
      </div>
    </main>
  );
}
