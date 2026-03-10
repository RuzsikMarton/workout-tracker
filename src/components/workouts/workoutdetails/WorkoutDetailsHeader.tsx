"use client";

import { Button } from "@/components/ui/button";
import { deleteWorkoutAction } from "@/lib/actions/workouts";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

const WorkoutDetailsHeader = ({
  id,
  duration,
  volume,
  sets,
}: {
  id: string;
  duration: number | null;
  volume: number | null;
  sets: number;
}) => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const t = useTranslations("workoutDetails");
  const tError = useTranslations("error");

  const handleDelete = async () => {
    setIsPending(true);
    setError(null);
    try {
      const res = await deleteWorkoutAction(id);
      if (!res.ok) {
        setError(
          res.code ? tError(res.code) : tError("FAILED_TO_DELETE_WORKOUT"),
        );
      }
      if (res.ok) {
        router.push("/workouts");
      }
    } catch (err) {
      console.error("Error deleting workout:", err);
      setError(tError("FAILED_TO_DELETE_WORKOUT"));
    } finally {
      setIsPending(false);
    }
  };
  return (
    <div className="bg-section-bg py-4">
      <div className="page-container flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex justify-between gap-2 md:ml-auto md:order-2">
          {error && <p className="text-sm text-red-500">{error}</p>}
          {/* Need to implement edit workout functionality */}
          <Button size={"lg"} variant={"outline"} disabled={isPending}>
            {t("editButton")}
          </Button>
          <Button
            size={"lg"}
            variant={"outline"}
            className="bg-brand-primary/80 dark:bg-brand-primary/55 hover:bg-brand-hover/85 dark:hover:bg-brand-hover/50 text-white hover:text-white"
            onClick={handleDelete}
            disabled={isPending}
          >
            {isPending ? t("deleting") : t("deleteButton")}
          </Button>
        </div>
        <div className="flex items-center justify-between md:justify-start md:gap-16 lg:gap-32 md:order-1">
          <div>
            <span className="text-sm text-muted-foreground">
              {t("durationLabel")}
            </span>
            <p className="text-lg font-medium">
              {duration != null ? `${Math.round(duration / 60)} min` : "N/A"}
            </p>
          </div>
          <div>
            <span className="text-sm text-muted-foreground">
              {t("volumeLabel")}
            </span>
            <p className="text-lg font-medium">
              {volume != null ? `${volume} kg` : "N/A"}
            </p>
          </div>
          <div>
            <span className="text-sm text-muted-foreground">
              {t("setsLabel")}
            </span>
            <p className="text-lg font-medium">{sets}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkoutDetailsHeader;
