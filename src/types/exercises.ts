export interface Exercise {
    id: string;
    name: string;
    imgUrl?: string;
    muscleGroup: string[];
    equipment: string[];
}

export interface CreateExerciseData {
  name: string;
  muscleGroup: string[];
  equipment: string[];
  imgUrl?: string;
}

export interface PaginatedExercises {
    items: Exercise[];
    page: number;
    pageSize: number;
}
