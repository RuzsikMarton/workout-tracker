"use client";

import { ReactNode, useEffect, useState } from "react";
import { NextIntlClientProvider } from "next-intl";
import { ThemeProvider } from "./ThemeProvider";

interface ClientProvidersProps {
  children: ReactNode;
  locale: string;
}

const ClientProviders = ({ children, locale }: ClientProvidersProps) => {
  const [ismounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  if (!ismounted) {
    <NextIntlClientProvider locale={locale}>{children}</NextIntlClientProvider>;
  }
  return (
    <NextIntlClientProvider locale={locale}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange={false}
      >
        {children}
      </ThemeProvider>
    </NextIntlClientProvider>
  );
};

export default ClientProviders;
