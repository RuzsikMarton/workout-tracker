import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";
import { hasLocale } from "next-intl";

export default getRequestConfig(
  async ({
    requestLocale,
  }): Promise<{ locale: string; messages: Record<string, unknown> }> => {
    const requested = await requestLocale;
    const locale = hasLocale(routing.locales, requested)
      ? requested
      : routing.defaultLocale;

    let messages;
    try {
      // Load all message files for the locale
      const common = (await import(`../../messages/${locale}/common.json`))
        .default;

      // Fetch translations from remote source with proper cache control
      const resExercises = await fetch(
        `${process.env.I18N_URL}${locale}/exercises.json`,
        {
          next: { revalidate: 600 },
          cache: "force-cache",
        },
      );

      const remoteExercises = resExercises.ok ? await resExercises.json() : {};

      // Merge all message files
      messages = {
        ...common,
        ...remoteExercises,
      };
    } catch {
      // Fallback to default locale
      const common = (
        await import(`../../messages/${routing.defaultLocale}/common.json`)
      ).default;
      const exercises = (
        await import(`../../messages/${routing.defaultLocale}/exercises.json`)
      ).default;

      messages = {
        ...common,
        ...exercises,
      };
    }

    return {
      locale,
      messages,
    };
  },
);
