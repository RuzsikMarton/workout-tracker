"use client";

import { useEffect, useState } from "react";
import ExerciseFilter from "./ExerciseFilter";
import ExerciseList from "./ExerciseList";
import { useTranslations } from "next-intl";
import { PaginationWithLinks } from "../ui/pagination-with-links";
import { useSearchParams } from "next/navigation";
import { ExercisePrisma } from "@/types";
import PageTitle from "../PageTitle";

const ExercisesClient = ({
  exercises,
  totalExercises,
  error,
}: {
  exercises: ExercisePrisma[];
  totalExercises: number;
  error: string | null;
}) => {
  const t = useTranslations("ExercisesPage");
  const searchParams = useSearchParams();

  const currentPage = parseInt(searchParams.get("page") || "1");
  const pageSize = parseInt(searchParams.get("pageSize") || "10");

  return (
    <div className="w-full">
      <PageTitle title={t("title")} />
      <ExerciseFilter />
      <ExerciseList exercises={exercises} error={error} />
      <div className="w-full md:w-4/5 mx-auto mt-8 mb-4">
        <PaginationWithLinks
          page={currentPage}
          pageSize={pageSize}
          totalCount={totalExercises}
          navigationMode="router"
          //pageSizeSelectOptions={{ pageSizeOptions: [5, 10, 20] }}
        />
      </div>
    </div>
  );
};

export default ExercisesClient;
