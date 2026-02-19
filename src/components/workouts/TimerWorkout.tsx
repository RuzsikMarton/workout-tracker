"use client";

import { useEffect, useMemo, useState } from "react";

function formatTime(seconds: number) {
  const s = Math.floor(seconds);
  const hours = Math.floor(s / 3600);
  const minutes = Math.floor((s % 3600) / 60);
  const secs = s % 60;

  const pad = (num: number) => num.toString().padStart(2, "0");
  if (hours > 0) {
    return `${pad(hours)}:${pad(minutes)}:${pad(secs)}`;
  }
  return `${pad(minutes)}:${pad(secs)}`;
}

type TimerWorkoutProps = {
  createdAt: Date | string;
  onDurationChange?: (durationSeconds: number) => void;
};

const TimerWorkout = ({ createdAt, onDurationChange }: TimerWorkoutProps) => {
  const startTime = useMemo(() => {
    return new Date(createdAt).getTime();
  }, [createdAt]);

  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    const tick = () => {
      const current = Date.now();
      setNow(current);

      if (onDurationChange) {
        const durationSeconds = Math.max(
          0,
          Math.floor((current - startTime) / 1000),
        );
        onDurationChange(durationSeconds);
      }
    };

    tick(); // update immediately
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [startTime, onDurationChange]);

  if (now === null) {
    return <span>00:00</span>;
  }
  const elapsedSeconds = Math.max(0, Math.floor((now - startTime) / 1000));
  return <span>{formatTime(elapsedSeconds)}</span>;
};

export default TimerWorkout;
