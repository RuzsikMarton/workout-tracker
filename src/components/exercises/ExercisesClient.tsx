"use client";

import { useEffect, useState } from "react";
import ExerciseFilter from "./ExerciseFilter";
import ExerciseList from "./ExerciseList";
import { useTranslations } from "next-intl";
import { PaginationWithLinks } from "../ui/pagination-with-links";
import { useSearchParams } from "next/navigation";
import { ExercisePrisma } from "@/types";

const ExercisesClient = () => {
  const t = useTranslations("ExercisesPage");
  const searchParams = useSearchParams();

  const currentPage = parseInt(searchParams.get("page") || "1");
  const pageSize = parseInt(searchParams.get("pageSize") || "10");

  const [exercises, setExercises] = useState<ExercisePrisma[]>([]);
  const [totalExercises, setTotalExercises] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExercises = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams({
          page: currentPage.toString(),
          pageSize: pageSize.toString(),
        });

        // adding filters if they exist
        if (searchParams.get("muscle")) {
          params.set("muscle", searchParams.get("muscle")!);
        }
        if (searchParams.get("equipment")) {
          params.set("equipment", searchParams.get("equipment")!);
        }
        if (searchParams.get("sort")) {
          params.set("sort", searchParams.get("sort")!);
        }

        const response = await fetch(`/api/exercises?${params.toString()}`);
        if (!response.ok) throw new Error("Failed to fetch exercises");

        const data = await response.json();
        setExercises(data.data);
        setTotalExercises(data.pagination.total);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    fetchExercises();
  }, [searchParams, currentPage, pageSize]);

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
      <ExerciseList exercises={exercises} isLoading={isLoading} error={error} />
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
