"use client";

import { Button } from "@/components/ui/button";
import { EQUIPMENT_OPTIONS, MUSCLE_GROUPS } from "@/lib/selectdata";
import { useTranslations } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useExercisePicker } from "@/lib/providers/ExercisePickerProvider";

const SheetExerciseFilter = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const { startFilterTransition, isFilterPending } = useExercisePicker();
  const t = useTranslations("workoutSheetFilter");
  const tM = useTranslations("muscleGroups");
  const tE = useTranslations("equipment");

  const handleChange = (param: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    console.log(params);
    params.set(param, value);
    startFilterTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  const handleReset = () => {
    startFilterTransition(() => {
      router.push(pathname);
    });
  };

  return (
    <div className="flex flex-col px-8 gap-4">
      <div className="flex flex-col gap-1">
        <span className="text-sm text-foreground/70 uppercase">
          {t("muscle")}
        </span>
        <select
          value={searchParams.get("muscleGroup") || ""}
          className="appearance-none w-full bg-input ring-1 ring-ring py-1 px-2 rounded-md shadow-sm disabled:bg-input/50 disabled:text-primary/50 disabled:cursor-not-allowed"
          onChange={(e) => handleChange("muscleGroup", e.target.value)}
          disabled={isFilterPending}
        >
          <option value="" disabled hidden>
            {t("musclePlaceholder")}
          </option>
          {MUSCLE_GROUPS.map((option) => (
            <option key={option} value={option}>
              {tM(option)}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-sm text-foreground/70 uppercase">
          {t("equipment")}
        </span>
        <select
          value={searchParams.get("equipment") || ""}
          className="appearance-none w-full bg-input ring-1 ring-ring py-1 px-2 rounded-md shadow-sm disabled:bg-input/50 disabled:text-primary/50 disabled:cursor-not-allowed"
          disabled={isFilterPending}
          onChange={(e) => handleChange("equipment", e.target.value)}
        >
          <option value="" disabled hidden>
            {t("equipmentPlaceholder")}
          </option>
          {EQUIPMENT_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {tE(option)}
            </option>
          ))}
        </select>
      </div>
      <Button variant={"outline"} onClick={handleReset}>
        {t("reset")}
      </Button>
    </div>
  );
};

export default SheetExerciseFilter;
