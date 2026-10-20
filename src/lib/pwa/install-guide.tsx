"use client";

import { InstallGuide } from "@/types";
import { getBrowser, getDevice } from "./detection";
import { useTranslations } from "next-intl";
import { EllipsisVerticalIcon, ShareIcon } from "lucide-react";

type DeviceInfo = ReturnType<typeof getDevice>;
type BrowserInfo = ReturnType<typeof getBrowser>;
type Translate = ReturnType<typeof useTranslations<"install.install-guide">>;

export const getInstallGuide = (
  device: DeviceInfo,
  browser: BrowserInfo,
  t: Translate,
): InstallGuide => {
  if (device.isIOS) {
    return {
      title: t("ios.title"),
      steps: [
        <>
          <ShareIcon className="mr-1 inline-block size-4 -translate-y-0.5 text-brand-primary" />
          {t("ios.step1-start")}
          <strong className="text-foreground">
            {t("ios.step1-strong")}
          </strong>{" "}
          {t("ios.step1-end")}
        </>,
        <>
          {t("ios.step2-start")}
          <strong className="text-foreground">{t("ios.step2-strong")}</strong>.
        </>,
      ],
    };
  } else if (device.isMac) {
    if (browser.isSafari) {
      return {
        title: t("mac.safari.title"),
        steps: [
          <>
            <ShareIcon className="mr-1 inline-block size-4 text-brand-primary" />
            {t("mac.safari.step1-start")}
            <strong className="text-foreground">
              {t("mac.safari.step1-strong1")}
            </strong>
            {t("mac.safari.step1-mid")}
            <strong className="text-foreground">
              {t("mac.safari.step1-strong2")}
            </strong>
            {t("mac.safari.step1-end2")}
          </>,
          <>
            {t("mac.safari.step2-start")}{" "}
            <strong className="text-foreground">
              {t("mac.safari.step2-strong")}
            </strong>
            .
          </>,
        ],
      };
    } else if (browser.isChrome) {
      return {
        title: t("mac.chrome.title"),
        steps: [
          <>
            <EllipsisVerticalIcon className="mr-1 inline-block size-4 text-brand-primary" />
            {t("mac.chrome.step1-start")}
            <strong className="text-foreground">
              {t("mac.chrome.step1-strong")}
            </strong>
            {t("mac.chrome.step1-end")}
          </>,
          <>
            {t("mac.chrome.step2-start")}
            <strong className="text-foreground">
              {t("mac.chrome.step2-strong")}
            </strong>
            {t("mac.chrome.step2-mid")}
            <strong className="text-foreground">
              {t("mac.chrome.step2-strong2")}
            </strong>
            {t("mac.chrome.step2-end")}
          </>,
        ],
      };
    } else if (browser.isEdge) {
      return {
        title: t("mac.edge.title"),
        steps: [
          <>
            <EllipsisVerticalIcon className="mr-1 inline-block size-4 text-brand-primary" />
            {t("mac.edge.step1-start")}
            <strong className="text-foreground">
              {t("mac.edge.step1-strong")}
            </strong>
            {t("mac.edge.step1-end")}
          </>,
          <>
            {t("mac.edge.step2-start")}
            <strong className="text-foreground">
              {t("mac.edge.step2-strong")}
            </strong>
            {t("mac.edge.step2-mid")}
            <strong className="text-foreground">
              {t("mac.edge.step2-strong2")}
            </strong>
            {t("mac.edge.step2-end")}
          </>,
        ],
      };
    } else {
      return {
        title: t("mac.other.title"),
        steps: [
          <>
            {t("mac.other.step1-start")}
            <strong className="text-foreground">
              {t("mac.other.step1-strong1")}
            </strong>
            {t("mac.other.step1-mid")}
            <strong className="text-foreground">
              {t("mac.other.step1-strong2")}
            </strong>
            {t("mac.other.step1-end")}
          </>,
        ],
      };
    }
  } else if (device.isAndroid) {
    if (browser.isChrome) {
      return {
        title: t("android.chrome.title"),
        steps: [
          <>
            {t("android.chrome.step1-start")}
            <strong className="text-foreground">
              {t("android.chrome.step1-strong")}
            </strong>
            {t("android.chrome.step1-end")}
          </>,
          <>
            {t("android.chrome.step2-start")}
            <strong className="text-foreground">
              {t("android.chrome.step2-strong")}
            </strong>
            {t("android.chrome.step2-end")}
          </>,
        ],
      };
    } else {
      return {
        title: t("android.other.title"),
        steps: [
          <>
            {t("android.other.step1-start")}
            <strong className="text-foreground">
              {t("android.other.step1-strong")}
            </strong>
            {t("android.other.step1-end")}
          </>,
          <>
            {t("android.other.step2-start")}
            <strong className="text-foreground">
              {t("android.other.step2-strong")}
            </strong>
            {t("android.other.step2-end")}
          </>,
        ],
      };
    }
  } else {
    if (browser.isChrome) {
      return {
        title: t("desktop.chrome.title"),
        steps: [
          <>
            <EllipsisVerticalIcon className="mr-1 inline-block size-4 text-brand-primary" />
            {t("desktop.chrome.step1-start")}
            <strong className="text-foreground">
              {t("desktop.chrome.step1-strong")}
            </strong>
            {t("desktop.chrome.step1-end")}
          </>,
          <>
            {t("desktop.chrome.step2-start")}
            <strong className="text-foreground">
              {t("desktop.chrome.step2-strong")}
            </strong>
            {t("desktop.chrome.step2-mid")}
            <strong className="text-foreground">
              {t("desktop.chrome.step2-strong2")}
            </strong>
            {t("desktop.chrome.step2-end")}
          </>,
        ],
      };
    } else if (browser.isEdge) {
      return {
        title: t("desktop.edge.title"),
        steps: [
          <>
            <EllipsisVerticalIcon className="mr-1 inline-block size-4 text-brand-primary" />
            {t("desktop.edge.step1-start")}
            <strong className="text-foreground">
              {t("desktop.edge.step1-strong")}
            </strong>
            {t("desktop.edge.step1-end")}
          </>,
          <>
            {t("desktop.edge.step2-start")}
            <strong className="text-foreground">
              {t("desktop.edge.step2-strong")}
            </strong>
            {t("desktop.edge.step2-mid")}
            <strong className="text-foreground">
              {t("desktop.edge.step2-strong2")}
            </strong>
            {t("desktop.edge.step2-end")}
          </>,
        ],
      };
    } else if (browser.isFirefox) {
      return {
        title: t("desktop.firefox.title"),
        steps: [
          <>{t("desktop.firefox.step1-start")}</>,
          <>
            {t("desktop.firefox.step2-start")}
            <strong className="text-foreground">
              {t("desktop.firefox.step2-strong1")}
            </strong>
            {t("desktop.firefox.step2-mid1")}
            <strong className="text-foreground">
              {t("desktop.firefox.step2-strong2")}
            </strong>
            {t("desktop.firefox.step2-mid2")}
            <strong className="text-foreground">
              {t("desktop.firefox.step2-strong3")}
            </strong>
            {t("desktop.firefox.step2-end")}
          </>,
        ],
      };
    } else {
      return {
        title: t("desktop.other.title"),
        steps: [
          <>{t("desktop.other.step1-start")}</>,
          <>
            {t("desktop.other.step2-start")}
            <strong className="text-foreground">
              {t("desktop.other.step2-strong1")}
            </strong>
            {t("desktop.other.step2-mid1")}
            <strong className="text-foreground">
              {t("desktop.other.step2-strong2")}
            </strong>
            {t("desktop.other.step2-mid2")}
            <strong className="text-foreground">
              {t("desktop.other.step2-strong3")}
            </strong>
            {t("desktop.other.step2-end")}
          </>,
        ],
      };
    }
  }
};
