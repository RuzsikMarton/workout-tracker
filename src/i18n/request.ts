import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";
import { hasLocale } from "next-intl";

export default getRequestConfig(
  async ({ requestLocale }): Promise<{ locale: string; messages: any }> => {
    const requested = await requestLocale;
    let locale = hasLocale(routing.locales, requested)
      ? requested
      : routing.defaultLocale;

    if (!routing.locales.includes(locale as any)) {
      locale = routing.defaultLocale;
    }

    let messages;
    try {
      messages = (await import(`../../messages/${locale}.json`)).default;
    } catch {
      messages = (await import(`../../messages/${routing.defaultLocale}.json`))
        .default;
    }
    
    return {
      locale,
      messages,
    };
  }
);
