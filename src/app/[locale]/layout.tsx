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
import { getActiveWorkout } from "@/lib/data/get-workout";
import ActiveWorkoutSync from "@/components/active-workout-sync";
import { Toaster } from "@/components/ui/sonner";
import { Viewport } from "next";
import CookieBanner from "@/components/CookieBanner";
import BackToTopButton from "@/components/BackToTopButton";

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

interface MetadataProps {
  params: Promise<{ locale: string }>;
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "oklch(0.269 0 0)" },
    { media: "(prefers-color-scheme: light)", color: "oklch(0.985 0 0)" },
  ],
};

export async function generateMetadata({ params }: MetadataProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  const title = t("title");
  const description = t("description");
  return {
    title,
    description,
    creator: "Marton Ruzsik",
    icons: {
      icon: [
        {
          url: "/favicon.ico",
          sizes: "any",
        },
        {
          url: "/favicon-32x32.png",
          sizes: "32x32",
        },
        {
          url: "/favicon-16x16.png",
          sizes: "16x16",
        },
      ],
      apple: "/apple-touch-icon.png",
    },
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
  const activeWorkout = session?.user?.id
    ? await getActiveWorkout(session.user.id)
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
            <ActiveWorkoutSync workoutId={activeWorkout?.id ?? null} />
            <Toaster />
            <ConditionalLayout publicSession={publicSession}>
              {children}
            </ConditionalLayout>
            <BackToTopButton />
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
      data-scroll-behavior="smooth"
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
        <LayoutContent locale={locale}>
          {children}
          <CookieBanner locale={locale} />
        </LayoutContent>
      </Suspense>
    </html>
  );
}
