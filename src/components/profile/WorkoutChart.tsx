"use client";

import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "../ui/chart";
import { ChartWorkout } from "@/types/workouts";
import { useTranslations } from "next-intl";

function getLast28Chart(workouts: ChartWorkout[], t: (key: string) => string) {
  const now = new Date();

  const buckets = [
    { label: t("week1"), count: 0 },
    { label: t("week2"), count: 0 },
    { label: t("week3"), count: 0 },
    { label: t("week4"), count: 0 },
  ];

  for (const workout of workouts) {
    const diffMs = now.getTime() - new Date(workout.createdAt).getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays >= 0 && diffDays < 28) {
      const bucketIndex = Math.floor(diffDays / 7);
      buckets[bucketIndex].count += 1;
    }
  }

  return buckets;
}

const WorkoutChart = ({ workouts }: { workouts: ChartWorkout[] }) => {
  const t = useTranslations("profile.workoutChart");
  const chartData = getLast28Chart(workouts, t);

  const chartConfig = {
    count: {
      label: t("countLabel"),
      color: "var(--brand-hover)",
    },
  } satisfies ChartConfig;

  return (
    <div className="profile-card h-full">
      <h1 className="text-2xl font-bold mb-4">{t("title")}</h1>
      <div>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="label"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tick={{ fontSize: 12 }}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey={"count"} fill={chartConfig.count.color} radius={8}>
              <LabelList
                position={"top"}
                offset={8}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </div>
    </div>
  );
};

export default WorkoutChart;
