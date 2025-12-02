import {defineRouting} from 'next-intl/routing';

export const locales = ['en', 'sk', 'hu'] as const;
 
export const routing = defineRouting({
  locales,
 
  defaultLocale: 'en',
  localePrefix: 'always',
  localeDetection: true,
});