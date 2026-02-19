"use client";

import { useExercisePicker } from "@/lib/providers/ExercisePickerProvider";
import { ExercisePrisma } from "@/types";
import { useTranslations } from "next-intl";
import Image from "next/image";

const SheetExerciseCard = ({ exercise }: { exercise: ExercisePrisma }) => {
  const { toggleSelectExercise, isSelected } = useExercisePicker();
  const selected = isSelected(exercise.id);
  const t = useTranslations(exercise.name);

  return (
    <div
      onClick={() => toggleSelectExercise(exercise.id)}
      className="w-full border-b last:border-0 cursor-pointer"
    >
      <div
        className={`flex justify-start items-center p-4 gap-4 transition-colors ${
          selected
            ? "bg-red-700/5 hover:bg-red-700/15 border-l-4 border-l-red-700 ml-1"
            : "hover:bg-muted-foreground/10"
        }`}
      >
        <div className="flex items-center justify-center w-16 h-16 shrink-0 rounded-full overflow-hidden bg-border">
          {" "}
          <Image
            src={exercise.imgUrl || "/logo.webp"}
            alt={exercise.name}
            width={64}
            height={64}
            className="object-cover rounded-full"
          />
        </div>

        <p className="flex-1 min-w-0">{t("name")}</p>
      </div>
    </div>
  );
};

export default SheetExerciseCard;
