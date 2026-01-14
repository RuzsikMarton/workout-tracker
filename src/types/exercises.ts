export interface Exercise {
    id: string;
    name: string;
    description?: string;
    imgUrl?: string;
    muscleGroup: string[];
    equipment: string[];
}

export interface PaginatedExercises {
    items: Exercise[];
    page: number;
    totalPages: number;
}
