import { auth } from "@/lib/auth";
import { getTranslations } from "next-intl/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("workouts"),
  };
}
export default async function Workouts() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/signin");
  }

  return (
    <main className="page-main pt-28 bg-secondary">
      <div className="page-div flex flex-col justify-center items-center">
        <h1 className="text-3xl text-red-500 uppercase">
          this page is work in progress
        </h1>
        <h1 className="text-2xl font-bold mb-2">
          {session.user.name}&apos;s Workouts
        </h1>
        <p className="text-sm text-muted-foreground">
          Here you&apos;ll see a list of all your workouts.
        </p>
      </div>
    </main>
  );
}
