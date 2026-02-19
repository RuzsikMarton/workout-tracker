import "./globals.css";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import ClientProviders from "@/lib/providers/ClientProviders";
import ConditionalLayout from "@/components/layout/ConditionalLayout";
import { getMessages, getTranslations } from "next-intl/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

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
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const publicSession = session
    ? {
        user: {
          id: session.user.id,
          name: session.user.name,
        },
        role: session.role,
      }
    : null;
  return (
    <body
      className="font-sans min-h-screen bg-background text-foreground antialiased selection:bg-primary selection:text-primary-foreground"
      suppressHydrationWarning
    >
      <Suspense
        fallback={
          <div className="page-main bg-secondary">
            <div className="flex flex-col items-center justify-center space-y-4">
              <LoadingSpinner />
            </div>
          </div>
        }
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ClientProviders>
            <ConditionalLayout publicSession={publicSession}>
              {children}
            </ConditionalLayout>
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
          <body className="min-h-screen bg-secondary">
            <div className="min-h-screen bg-secondary flex items-center justify-center">
              <LoadingSpinner />
            </div>
          </body>
        }
      >
        <LayoutContent locale={locale}>{children}</LayoutContent>
      </Suspense>
    </html>
  );
}
