const WorkoutDetailsHeader = ({
  duration,
  volume,
  sets,
}: {
  duration: number | null;
  volume: number | null;
  sets: number;
}) => {
  return (
    <div className="bg-section-bg py-4">
      <div className="page-container flex items-center justify-between md:justify-start md:gap-16 lg:gap-32">
        <div>
          <span className="text-sm text-muted-foreground">Time</span>
          <p className="text-lg font-medium">
            {duration != null ? `${Math.round(duration / 60)} min` : "N/A"}
          </p>
        </div>
        <div>
          <span className="text-sm text-muted-foreground">Volume</span>
          <p className="text-lg font-medium">
            {volume != null ? `${volume} kg` : "N/A"}
          </p>
        </div>
        <div>
          <span className="text-sm text-muted-foreground">Sets</span>
          <p className="text-lg font-medium">{sets}</p>
        </div>
      </div>
    </div>
  );
};

export default WorkoutDetailsHeader;
