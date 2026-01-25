import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";
import { hasLocale } from "next-intl";

export default getRequestConfig(
  async ({ requestLocale }): Promise<{ locale: string; messages: Record<string, unknown> }> => {
    const requested = await requestLocale;
    const locale = hasLocale(routing.locales, requested)
      ? requested
      : routing.defaultLocale;

    let messages;
    try {
      // Load all message files for the locale
      const common = (await import(`../../messages/${locale}/common.json`)).default;
      //const exercises = (await import(`../../messages/${locale}/exercises.json`)).default;

      // Fetch translations from remote source
      {/*const [resCommon, resExercises] = await Promise.all([
        fetch(`${process.env.I18N_URL}${locale}/common.json`, { next: { revalidate: 600 } }),
        fetch(`${process.env.I18N_URL}${locale}/exercises.json`, { next: { revalidate: 600 } })
      ]);*/}

      const resExercises = await fetch(`${process.env.I18N_URL}${locale}/exercises.json`, { next: { revalidate: 600 } });
      //const remoteCommon = resCommon.ok ? await resCommon.json() : {};
      const remoteExercises = resExercises.ok ? await resExercises.json() : {};
      // Merge all message files
      messages = {
        ...common,
        ...remoteExercises,
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
