import { defineRouting } from "next-intl/routing";

export const locales = ["en", "sk", "hu"] as const;
export type Locale = (typeof locales)[number];

export const routing = defineRouting({
  locales,

  defaultLocale: "en",
  localePrefix: "always",
  localeDetection: true,
  localeCookie: {
    maxAge: 60 * 60 * 24 * 30, // 30 days
  },
});
