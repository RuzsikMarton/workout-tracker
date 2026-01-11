"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function HeroSection() {
  const t = useTranslations("HeroSection");
  return (
    <>
      <section className="overflow-x-hidden dark:bg-secondary">
        <div className="pb-24 pt-28 md:pb-32 lg:pb-56 lg:pt-44">
          <div className="relative mx-auto flex max-w-6xl flex-col px-6 lg:block">
            <div className="mx-auto max-w-lg text-center lg:ml-0 lg:w-1/2 lg:text-left">
              <h1 className="mt-8 max-w-2xl text-balance text-5xl font-medium md:text-6xl lg:mt-16 xl:text-7xl">
                {t.rich("title", {
                  span: (chunks) => (
                    <span className="text-red-700">{chunks}</span>
                  ),
                })}
              </h1>
              <p className="mt-8 max-w-2xl text-pretty text-lg text-muted-foreground">
                {t("description")}
              </p>

              <div className="mt-12 flex flex-col items-center justify-center gap-2 sm:flex-row lg:justify-start">
                <Button
                  asChild
                  size="lg"
                  className="px-5 text-base bg-red-700 hover:bg-red-800"
                >
                  <Link href="/workouts">
                    <span className="text-nowrap">{t("startTracking")}</span>
                  </Link>
                </Button>
                <Button
                  key={2}
                  asChild
                  size="lg"
                  variant="ghost"
                  className="px-5 text-base dark:hover:bg-black/25"
                >
                  <Link href="/contact">
                    <span className="text-nowrap">{t("contactUs")}</span>
                  </Link>
                </Button>
              </div>
            </div>
            <Image
              className="z-10 order-first ml-auto h-auto w-full object-cover sm:h-auto sm:max-h-128 lg:absolute lg:-right-6 lg:-top-16 lg:order-last lg:h-auto lg:max-h-none lg:w-8/15 lg:object-contain xl:w-3/5 xl:-right-20 xl:-top-28 dark:mix-blend-lighten"
              src={"/hero-img.png"}
              alt="Hero Image"
              width={4000}
              height={3000}
            ></Image>
          </div>
        </div>
      </section>
    </>
  );
}
