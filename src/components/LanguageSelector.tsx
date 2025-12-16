"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Locale } from "@/i18n/routing";
import { FooterProps } from "@/types";

const LanguageSelector = ({data} : FooterProps) => {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const languages: { code: Locale; name: string }[] = [
    { code: "en", name: data.en },
    { code: "sk", name: data.sk },
    { code: "hu", name: data.hu },
  ];

  const handleLanguageChange = (newLocale: Locale) => {
    const pathWithoutLocale = pathname.replace(`/${locale}`, "");
    const newPath = `/${newLocale}${pathWithoutLocale || "/"}`;
    
    router.push(newPath);
    setIsOpen(false);
  };

  const currentLanguage = languages.find((lang) => lang.code === locale)?.name;

  return (
    <div className="relative w-full">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between gap-2 px-3 py-1 border-2 border-primary rounded hover:bg-primary hover:text-white dark:hover:text-black transition-colors duration-300 cursor-pointer text-sm font-medium"
      >
        {currentLanguage}
        <ChevronDown size={16} className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full bottom-auto lg:top-auto lg:bottom-full w-full bg-background border-2 border-primary rounded shadow-lg z-50 text-sm">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`block w-full text-left px-4 py-2 hover:bg-primary hover:text-white dark:hover:text-black transition-colors ${
                locale === lang.code ? "bg-primary text-white dark:text-black font-semibold" : ""
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