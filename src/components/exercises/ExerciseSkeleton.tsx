import { Skeleton } from "../ui/skeleton";

const ExerciseSkeleton = () => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center space-x-4 px-4 w-full lg:w-4/5 mx-auto py-4 justify-between gap-4 border-b">
      <Skeleton className="h-20 w-62 rounded-md" />
      <Skeleton className="h-20 w-62 md:w-100 rounded-md" />
      <div className="flex gap-2">
        <Skeleton className="h-10 w-30 rounded-md" />
        <Skeleton className="h-10 w-30 rounded-md" />
      </div>
    </div>
  );
};

export default ExerciseSkeleton;
