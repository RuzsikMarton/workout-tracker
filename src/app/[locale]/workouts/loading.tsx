import PageTitle from "@/components/PageTitle";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useTranslations } from "next-intl";

export default function WorkoutsLoading() {
  const t = useTranslations("workoutLoading");
  return (
    <main className="page-main app-layout ">
      <div className="w-full">
        {" "}
        <PageTitle title={t("title")} />
        <div className="page-container flex items-center justify-center min-h-[60vh]">
          <LoadingSpinner />
        </div>
      </div>
    </main>
  );
}
