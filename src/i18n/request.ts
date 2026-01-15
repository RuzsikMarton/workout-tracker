import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";
import { hasLocale } from "next-intl";

export default getRequestConfig(
  async ({ requestLocale }): Promise<{ locale: string; messages: any }> => {
    const requested = await requestLocale;
    let locale = hasLocale(routing.locales, requested)
      ? requested
      : routing.defaultLocale;

    let messages;
    try {
      // Load all message files for the locale
      const common = (await import(`../../messages/${locale}/common.json`)).default;
      const exercises = (await import(`../../messages/${locale}/exercises.json`)).default;
      
      // Merge all message files
      messages = {
        ...common,
        ...exercises,
      };
    } catch {
      // Fallback to default locale
      const common = (await import(`../../messages/${routing.defaultLocale}/common.json`)).default;
      const exercises = (await import(`../../messages/${routing.defaultLocale}/exercises.json`)).default;
      
      messages = {
        ...common,
        ...exercises,
      };
    }
    
    return {
      locale,
      messages,
    };
  }
);
