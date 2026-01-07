import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Workouts() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/signin");
  }

  return (
    <div className="flex min-h-screen pt-28 font-sans">
      <main className="">
        <h1 className="text-2xl font-bold mb-2">
          {session.user.name}'s Workouts
        </h1>
        <p className="text-sm text-muted-foreground">
          Here you&apos;ll see a list of all your workouts.
        </p>
      </main>
    </div>
  );
}
