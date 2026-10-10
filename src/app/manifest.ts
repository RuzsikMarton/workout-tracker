import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Workout Tracker",
    short_name: "WorkoutTracker",
    description: "Track your workouts and progress efficiently",
    start_url: "/workouts",
    display: "standalone",
    background_color: "#1f1f1f",
    theme_color: "#1f1f1f",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
