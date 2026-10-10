/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { getBrowser, getDevice, isStandalone } from "@/lib/pwa/detection";
import { getInstallGuide } from "@/lib/pwa/install-guide";
import { InstallGuide } from "@/types";
import {
  ArrowRightIcon,
  ChartLineIcon,
  CheckCircle2Icon,
  InfoIcon,
  TriangleAlertIcon,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const DownloadPage = () => {
  const t = useTranslations("install.page");
  const tInstallGuide = useTranslations("install.install-guide");
  const [guide, setGuide] = useState<InstallGuide | null>(null);
  const [standalone, setStandalone] = useState(false);
  const [detected, setDetected] = useState(false);
  const locale = useLocale();

  useEffect(() => {
    const isAppStandalone = isStandalone();

    setStandalone(isAppStandalone);

    if (!isAppStandalone) {
      const browser = getBrowser();
      const device = getDevice();

      setGuide(getInstallGuide(device, browser, tInstallGuide));
    }

    setDetected(true);
  }, [tInstallGuide]);

  if (!detected) return null;

  return (
    <div className="relative bg-surface min-h-screen px-6 flex flex-col items-center justify-center">
      <div className="pointer-events-none absolute inset-0 honeycomb-background" />
      <div className="flex w-full max-w-105 flex-col items-center justify-center text-center z-10">
        <div className="bg-ring shadow-2xl shadow-black/60 rounded-[22%] ring-1 ring-white/10">
          <Image
            src={"/logo.webp"}
            alt="Logo"
            width={192}
            height={192}
            className="h-24 w-24"
          />
        </div>
        <h1 className="mt-4 flex flex-col text-[clamp(2.5rem,12vw,3.25rem)] leading-tight">
          <span
            className="font-bold uppercase tracking-wider font-stretch-50% text-brand-primary"
            style={{ textShadow: "0 0 40px #c10001" }}
          >
            Workout
          </span>
          <span className="font-bold uppercase tracking-wider font-stretch-50%">
            Tracker
          </span>
        </h1>
        <div className="landing-divider z-10" />
        <p className="max-w-sm text-sm text-black/70 dark:text-muted-foreground">
          {t("title")}
        </p>
        <Link
          href={`/${locale}/#features`}
          className="mt-4 inline-flex items-center rounded-md border border-brand-hover/30 px-3 py-1.5 text-xs text-brand-primary font-medium bg-brand-primary/10 hover:bg-brand-primary/30 transition-colors duration-300"
        >
          <InfoIcon className="mr-2 h-4 w-4" />
          {t("info1")}{" "}
          <span className="text-foreground/90 ml-1 text-xs"> {t("info2")}</span>
        </Link>
        {!standalone ? (
          <>
            <div className="mt-6 w-full space-y-3.5 rounded-md border p-5 text-left shadow-2xl shadow-black/20 dark:shadow-black/40 bg-[#fff8f7] dark:bg-[#2a1716]">
              <p className="text-[11px] font-bold uppercase tracking wider text-brand-primary">
                {guide?.title}
              </p>
              {guide?.steps.map((step, index) => (
                <div key={index} className="flex items-center gap-3">
                  <span className="flex-center h-6 w-6 shrink-0 rounded-full bg-brand-hover/20 text-xs text-brand-primary font-bold">
                    {index + 1}
                  </span>
                  <div className="text-sm leading-relaxed text-muted-foreground">
                    {step}
                  </div>
                </div>
              ))}
            </div>
            <div className="inline-flex items-start gap-2 mt-2 text-muted-foreground text-xs">
              <TriangleAlertIcon className="size-3 shrink-0 mt-0.5" />
              {t("language-alert")}
            </div>
            <Link
              href="/workouts"
              className="mt-5 inline-flex items-center gap-2 rounded-md px-6 py-3 bg-brand-primary text-sm font-semibold hover:bg-brand-hover text-white shadow-lg shadow-brand-primary/30 transition duration-300 active:scale-95"
            >
              {t("startWithoutInstalling")}{" "}
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </>
        ) : (
          <>
            <div className="mt-6 w-full space-y-3.5 rounded-md border p-5 text-left shadow-2xl shadow-black/20 dark:shadow-black/40 bg-[#fff8f7] dark:bg-[#2a1716]">
              <p className="text-[11px] font-bold uppercase tracking wider text-brand-primary">
                {t("appInstalled")}
              </p>
              <div className="flex items-center gap-3">
                <span className="flex-center h-6 w-6 shrink-0 rounded-full bg-brand-hover/20 text-xs text-brand-primary font-bold">
                  <CheckCircle2Icon className="h-4 w-4" />
                </span>
                <span className="text-sm leading-relaxed text-muted-foreground">
                  {t("congrats")}
                  <b>Workout Tracker</b> {t("success")}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="flex-center h-6 w-6 shrink-0 rounded-full bg-brand-hover/20 text-xs text-brand-primary font-bold">
                  <ChartLineIcon className="h-4 w-4" />
                </span>
                <span className="text-sm leading-relaxed text-muted-foreground">
                  {t("startTracking")}
                </span>
              </div>
            </div>
            <Link
              href="/workouts"
              className="mt-5 inline-flex items-center gap-2 rounded-md px-6 py-3 bg-brand-primary text-sm font-semibold hover:bg-brand-hover text-white shadow-lg shadow-brand-primary/30 transition duration-300 active:scale-95"
            >
              {t("startWithInstalling")} <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default DownloadPage;
