"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ClipboardList, Dumbbell, TrendingUp } from "lucide-react";
import { useTranslations } from "next-intl";
import { ReactNode } from "react";

export default function FeatureSection() {
  const t = useTranslations("FeaturesSection");
  return (
    <section className="py-16 md:py-32 dark:bg-secondary">
      <div className="@container mx-auto max-w-5xl px-6">
        <div className="text-center">
          <h2 className="text-balance text-4xl font-semibold lg:text-5xl">
            {t.rich("mainHeading", {
              span: (chunks) => <span className="text-red-700">{chunks}</span>,
            })}
          </h2>
          <p className="mt-4 text-muted-foreground">{t("subHeading")}</p>
        </div>
        <div className="@min-4xl:max-w-full @min-4xl:grid-cols-3 mx-auto mt-8 grid max-w-sm gap-6 [--color-background:var(--color-muted)] [--color-card:var(--color-muted)] *:text-center md:mt-8 dark:[--color-muted:var(--color-zinc-900)]">
          <Card className="group border-0 shadow-none dark:bg-secondary">
            <CardHeader className="pb-1">
              <CardDecorator>
                <ClipboardList className="size-6" aria-hidden />
              </CardDecorator>

              <h3 className="mt-4 font-medium">{t("feature1Title")}</h3>
            </CardHeader>

            <CardContent>
              <p className="mt-1 text-sm">{t("feature1Desc")}</p>
            </CardContent>
          </Card>

          <Card className="group border-0 shadow-none dark:bg-secondary">
            <CardHeader className="pb-2">
              <CardDecorator>
                <Dumbbell className="size-6" aria-hidden />
              </CardDecorator>

              <h3 className="mt-1 font-medium">{t("feature2Title")}</h3>
            </CardHeader>

            <CardContent>
              <p className="mt-1 text-sm">
                {t("feature2Desc")}
                your workouts.
              </p>
            </CardContent>
          </Card>

          <Card className="group border-0 shadow-none dark:bg-secondary">
            <CardHeader className="pb-1">
              <CardDecorator>
                <TrendingUp className="size-6" aria-hidden />
              </CardDecorator>

              <h3 className="mt-1 font-medium">{t("feature3Title")}</h3>
            </CardHeader>

            <CardContent>
              <p className="mt-1 text-sm">
                {t("feature3Desc")}
                analytics.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

const CardDecorator = ({ children }: { children: ReactNode }) => (
  <div className="mask-radial-from-40% mask-radial-to-60% relative mx-auto size-36 duration-200 [--color-border:color-mix(in_oklab,var(--color-zinc-950)10%,transparent)] group-hover:[--color-border:color-mix(in_oklab,var(--color-zinc-950)20%,transparent)] dark:[--color-border:color-mix(in_oklab,var(--color-white)15%,transparent)] dark:group-hover:[--color-border:color-mix(in_oklab,var(--color-white)20%,transparent)]">
    <div
      aria-hidden
      className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-size-[24px_24px] dark:opacity-50"
    />

    <div className="bg-background dark:bg-secondary absolute inset-0 m-auto flex size-12 items-center justify-center border-l border-t">
      {children}
    </div>
  </div>
);
