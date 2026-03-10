"use client";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis, Legend } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "../ui/chart";
import { ChartWorkout } from "@/types";
import { BarChart3 } from "lucide-react";
import { useTranslations } from "next-intl";

function formatWorkoutData(workouts: ChartWorkout[]) {
  const days: { [key: string]: { volume: number; duration: number } } = {};

  // aggregate workouts by day
  workouts.forEach((workout) => {
    const workoutDate = new Date(workout.createdAt);
    const dateKey = workoutDate.toISOString().split("T")[0]; // YYYY-MM-DD

    if (!days[dateKey]) {
      days[dateKey] = { volume: 0, duration: 0 };
    }

    days[dateKey].volume += workout.totalVolume || 0;
    days[dateKey].duration += workout.duration || 0;
  });

  //convert to array
  return Object.entries(days)
    .map(([dateKey, data]) => {
      const date = new Date(dateKey);
      return {
        date: date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
        fullDate: dateKey,
        volume: data.volume,
        duration: Math.round(data.duration / 60), // convert to minutes
      };
    })
    .sort((a, b) => a.fullDate.localeCompare(b.fullDate)); // sort by date
}

const WorkoutTrendsChart = ({ workouts }: { workouts: ChartWorkout[] }) => {
  const t = useTranslations("profile.workoutTrendsChart");

  const chartConfig = {
    volume: {
      label: t("volume"),
      color: "var(--chart-3)",
    },
    duration: {
      label: t("duration"),
      color: "var(--brand-hover)",
    },
  } satisfies ChartConfig;
  if (workouts.length === 0) {
    return (
      <div className="profile-card h-full flex flex-col text-center items-center justify-center text-muted-foreground">
        <BarChart3 className="mx-auto mb-4" size={48} />
        <h1 className="text-primary font-semibold">{t("noData")}</h1>
        <p>{t.rich("description", { br: () => <br /> })}</p>
      </div>
    );
  }
  const chartData = formatWorkoutData(workouts);

  return (
    <div className="profile-card h-full">
      <h1 className="text-2xl font-bold mb-4">{t("title")}</h1>
      <div>
        <ChartContainer config={chartConfig}>
          <AreaChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tick={{ fontSize: 12 }}
            />
            <YAxis
              yAxisId="left"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 12 }}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 12 }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  labelFormatter={(_, payload) => {
                    if (payload && payload[0]) {
                      return payload[0].payload.date;
                    }
                    return "";
                  }}
                />
              }
            />
            <Area
              yAxisId="left"
              type="monotone"
              dataKey="volume"
              stroke={chartConfig.volume.color}
              fill={chartConfig.volume.color}
              fillOpacity={0.2}
              strokeWidth={2}
            />
            <Area
              yAxisId="right"
              type="monotone"
              dataKey="duration"
              stroke={chartConfig.duration.color}
              fill={chartConfig.duration.color}
              fillOpacity={0.2}
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      </div>
    </div>
  );
};

export default WorkoutTrendsChart;
