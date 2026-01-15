"use client";

import { PaginatedExercises } from "@/types";
import { useEffect, useState } from "react";
import ExerciseFilter from "./ExerciseFilter";
import ExerciseList from "./ExerciseList";
import { useTranslations } from "next-intl";

const ExercisesClient = ({ initial }: { initial: PaginatedExercises }) => {
  const t = useTranslations("ExercisesPage");
  const [filters, setFilters] = useState({
    muscle: null as string[] | null,
    equipment: null as string[] | null,
  });
  const [page, setPage] = useState(initial.page || 1);
  const [data, setData] = useState<PaginatedExercises>(initial);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setPage(1);
  }, [filters]);

  useEffect(() => {}, [filters, page]);

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
    </div>
  );
};

export default ExercisesClient;
