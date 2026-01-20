"use client";

import { useEffect, useState } from "react";
import ExerciseFilter from "./ExerciseFilter";
import ExerciseList from "./ExerciseList";
import { useTranslations } from "next-intl";
import { PaginationWithLinks } from "../ui/pagination-with-links";
import { useSearchParams } from "next/navigation";

const ExercisesClient = () => {
  const t = useTranslations("ExercisesPage");
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState({
    muscle: null as string[] | null,
    equipment: null as string[] | null,
  });

  const currentPage = parseInt(searchParams.get("page") || "1");
  const pageSize = parseInt(searchParams.get("pageSize") || "10");

  const [totalExercises, setTotalExercises] = useState(100);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log("Search params changed:", searchParams.toString());
    console.log("Current page:", currentPage);
  }, [searchParams, currentPage]);

  return (
    <div className="w-full">
      <div className="block py-8 lg:py-16 bg-title">
        <div className="w-4/5 mx-auto lg:max-w-5xl">
          <span className="text-white uppercase text-4xl lg:text-5xl font-medium font-stretch-50% underline underline-offset-4 decoration-red-700">
            {t("title")}
          </span>
        </div>
      </div>
      <ExerciseFilter />
      <ExerciseList isLoading={isLoading} error={error} />
      <div className="w-full md:w-4/5 mx-auto mt-8 mb-4">
        <PaginationWithLinks
          page={currentPage}
          pageSize={pageSize}
          totalCount={totalExercises}
          //pageSizeSelectOptions={{ pageSizeOptions: [5, 10, 20] }}
        />
      </div>
    </div>
  );
};

export default ExercisesClient;
