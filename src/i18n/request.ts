import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(
  async ({ requestLocale }): Promise<{ locale: string; messages: any }> => {
    const locale = (await requestLocale) || routing.defaultLocale;

    console.log("Using locale:", locale);

    const messages = await import(`../../messages/${locale}.json`);

    return {
      locale,
      messages,
    };
  }
);
