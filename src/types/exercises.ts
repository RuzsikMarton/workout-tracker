export interface Exercise {
    id: string;
    name: string;
    imgUrl?: string | null;
    muscleGroup: string[];
    equipment: string[];
}

export type ExercisePrisma = Exercise & {
    createdAt: Date;
    updatedAt: Date;
}

export interface CreateExerciseData {
  name: string;
  muscleGroup: string[];
  equipment: string[];
  imgUrl?: string | null;
}
