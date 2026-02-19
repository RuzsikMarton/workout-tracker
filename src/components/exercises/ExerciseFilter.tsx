"use client";

import { EQUIPMENT_OPTIONS, MUSCLE_GROUPS } from "@/lib/selectdata";
import { useTranslations } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { X } from "lucide-react";
import { useExercisesTransition } from "./ExercisesContainer";

const ExerciseFilter = ({ disabled = false }: { disabled?: boolean }) => {
  const t = useTranslations("FilterBar");
  const tM = useTranslations("muscleGroups");
  const tE = useTranslations("equipment");
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const { isPending, startTransition } = useExercisesTransition();

  const handleChange = (value: string, param: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(param, value);
    // Reset to page 1 when filters change
    params.set("page", "1");
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  const handleReset = () => {
    startTransition(() => {
      router.push(pathname);
    });
  };

  // Check if any filters are active
  const hasActiveFilters =
    searchParams.get("muscle") ||
    searchParams.get("equipment") ||
    searchParams.get("sort");

  const isDisabled = disabled || isPending;

  return (
    <section className="py-8 bg-section-bg">
      <div
        className={`flex flex-col md:flex-row items-center justify-center md:justify-between w-4/5 mx-auto lg:max-w-5xl gap-4 ${isDisabled ? "opacity-60 pointer-events-none" : ""}`}
      >
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex flex-col sm:flex-row gap-2 text-foreground/65 items-center text-lg md:text-base">
            <span className="uppercase font-stretch-50% font-medium">
              {t("muscle")}
            </span>
            <select
              onChange={(e) => handleChange(e.target.value, "muscle")}
              value={searchParams.get("muscle") || ""}
              disabled={isDisabled}
              className="appearance-none w-40 bg-input ring-1 ring-ring py-1 px-2 rounded-md shadow-sm"
            >
              <option value="" disabled hidden>
                {t("showall")}...
              </option>
              {MUSCLE_GROUPS.map((option) => (
                <option key={option} value={option}>
                  {option === "all" ? t("allMuscles") : tM(option)}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 text-foreground/65 items-center text-lg md:text-base">
            <span className="uppercase font-stretch-50% font-medium">
              {t("equipment")}
            </span>
            <select
              onChange={(e) => handleChange(e.target.value, "equipment")}
              value={searchParams.get("equipment") || ""}
              disabled={isDisabled}
              className="appearance-none w-40 bg-input ring-1 ring-ring py-1 px-2 rounded-md shadow-sm"
            >
              <option value="" disabled hidden>
                {t("showall")}...
              </option>
              {EQUIPMENT_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option === "all" ? t("allEquipment") : tE(option)}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-2">
          <div className="flex flex-col sm:flex-row gap-2 text-foreground/65 items-center text-lg md:text-base">
            <span className="uppercase font-stretch-50% font-medium">
              {t("order")}
            </span>
            <select
              onChange={(e) => handleChange(e.target.value, "sort")}
              value={searchParams.get("sort") || "asc"}
              disabled={isDisabled}
              className="appearance-none w-40 bg-input ring-1 ring-ring py-1 px-2 rounded-md shadow-sm"
            >
              <option value={"asc"}>A-Z</option>
              <option value={"desc"}>Z-A</option>
            </select>
          </div>
          {hasActiveFilters && (
            <button
              onClick={handleReset}
              disabled={isDisabled}
              className="p-2 rounded-full hover:bg-red-600/20 transition-colors text-red-600 dark:text-red-500"
              aria-label="Clear filters"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default ExerciseFilter;
