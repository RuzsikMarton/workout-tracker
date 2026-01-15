import AddToWorkoutButton from "@/components/exercises/AddToWorkoutButton";
import { Exercise } from "@/types";
import { useTranslations } from "next-intl";
import Image from "next/image";

const ExercisePage = () => {
  const exercise: Exercise = {
    id: "1",
    name: "push-ups",
    imgUrl: "/exercises/push-ups.png",
    description: "A basic push-up exercise.",
    muscleGroup: ["chest", "triceps"],
    equipment: ["bodyweight"],
  };

  const t = useTranslations(exercise.name);
  const tMuscle = useTranslations("muscleGroups");
  const tEquipment = useTranslations("equipment");
  const tPage = useTranslations("ExercisePage");
  return (
    <main className="min-h-screen font-sans pt-28 dark:bg-secondary">
      <div className="w-full">
        <div className="block py-8 lg:py-16 bg-title">
          <div className="w-4/5 mx-auto lg:max-w-5xl">
            <span className="text-white uppercase text-4xl lg:text-5xl font-medium font-stretch-50% underline underline-offset-4 decoration-red-700">
              {t("name")}
            </span>
            <p className="text-sm mt-1 text-muted-foreground">
              {exercise.muscleGroup.map((muscle) => tMuscle(muscle)).join(", ")}{" "}
              -{" "}
              {exercise.equipment.map((equip) => tEquipment(equip)).join(", ")}
            </p>
          </div>
        </div>
      </div>
      <div className="mx-auto w-full max-w-6xl px-4 py-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
          {/*Left column*/}
          <div className="space-y-4 flex flex-col items-center">
            {exercise.imgUrl && (
              <Image
                src={exercise.imgUrl}
                alt={tPage("imgAlt")}
                width={400}
                height={400}
                className="rounded-md"
              />
            )}
            <div className="lg:hidden">
              <AddToWorkoutButton text={tPage("button")} />
            </div>
          </div>
          {/*Right column*/}
          <div className="space-y-6">
            <div>{t("name")}</div>
            <div>
              {exercise.muscleGroup.map((muscle) => tMuscle(muscle)).join(", ")}
            </div>
            <div>
              {exercise.equipment.map((equip) => tEquipment(equip)).join(", ")}
            </div>
            <div>{t("description")}</div>
            <div className="hidden lg:block">
              <AddToWorkoutButton text={tPage("button")} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ExercisePage;
