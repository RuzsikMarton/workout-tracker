"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { useState, useTransition } from "react";
import { ChevronDown } from "lucide-react";
import { Locale } from "@/i18n/routing";
import { FooterProps } from "@/types";

const LanguageSelector = ({ data, disabled }: FooterProps) => {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const languages: { code: Locale; name: string }[] = [
    { code: "en", name: data.en },
    { code: "sk", name: data.sk },
    { code: "hu", name: data.hu },
  ];

  const handleLanguageChange = (newLocale: Locale) => {
    setIsOpen(false);
    startTransition(() => {
      router.replace(pathname, { locale: newLocale });
    });
  };

  const currentLanguage = languages.find((lang) => lang.code === locale)?.name;

  return (
    <div className="relative w-full">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        disabled={isPending || disabled}
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full cursor-pointer items-center justify-between gap-2 rounded-full border border-primary/15 bg-background/70 px-4 py-2 text-sm font-medium shadow-none transition-colors hover:border-brand-primary/40 hover:bg-brand-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface disabled:cursor-not-allowed disabled:opacity-50"
      >
        {currentLanguage}
        <ChevronDown
          className={`size-4 text-muted-foreground transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>

      {isOpen && (
        <div
          role="listbox"
          aria-label="Select language"
          className="absolute bottom-full z-50 mb-2 w-full overflow-hidden rounded-xl border border-primary/10 bg-surface/95 p-1.5 text-sm shadow-lg backdrop-blur-xl"
        >
          {languages.map((lang) => (
            <button
              key={lang.code}
              type="button"
              role="option"
              aria-selected={locale === lang.code}
              disabled={isPending || disabled}
              onClick={() => handleLanguageChange(lang.code)}
              className={`w-full rounded-lg px-3 py-2 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary disabled:cursor-not-allowed disabled:opacity-50 ${
                locale === lang.code
                  ? "bg-brand-primary/10 font-semibold text-brand-primary"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground"
              }`}
            >
              {lang.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
