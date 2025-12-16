import type { Metadata } from "next";
import "./globals.css";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { Locale, routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import ClientProviders from "@/components/providers/ClientProviders";
import ConditionalLayout from "@/components/layout/ConditionalLayout";
import { getMessages, getTranslations } from "next-intl/server";

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

interface MetadataProps {
  params: Promise<{ locale: string }>;
}


export async function generateMetadata({ params }: MetadataProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  const title = t("title");
  const description = t("description");
  return {
    title,
    description,
  };
}

async function LayoutContent({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: string;
}) {
  const messages = await getMessages({ locale });
  return (
    <body
      className="font-sans min-h-screen bg-background text-foreground antialiased selection:bg-primary selection:text-primary-foreground"
      suppressHydrationWarning
    >
      <Suspense
        fallback={
          <div className="min-h-screen bg-background flex items-center justify-center">
            <div className="flex flex-col items-center space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
              <p className="text-sm text-muted-foreground">Loading...</p>
            </div>
          </div>
        }
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ClientProviders>
            <ConditionalLayout>{children}</ConditionalLayout>
          </ClientProviders>
        </NextIntlClientProvider>
      </Suspense>
    </body>
  );
}

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className="scroll-smooth relative"
    >
      <Suspense
        fallback={
          <body className="min-h-screen bg-background">
            <div className="min-h-screen bg-background flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
            </div>
          </body>
        }
      >
        <LayoutContent locale={locale}>{children}</LayoutContent>
      </Suspense>
    </html>
  );
}
