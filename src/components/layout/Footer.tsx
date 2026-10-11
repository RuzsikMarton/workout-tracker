"use client";

import { useEffect, useState } from "react";
import { FaGithub, FaFacebook, FaLinkedin } from "react-icons/fa";
import { Dumbbell, Mail } from "lucide-react";
import LanguageSelector from "./LanguageSelector";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { isStandalone } from "@/lib/pwa/detection";

const Footer = () => {
  const [standalone, setStandalone] = useState(false);
  const t = useTranslations("Footer");
  const navT = useTranslations("Nav");
  const languageData = {
    en: t("language.en"),
    sk: t("language.sk"),
    hu: t("language.hu"),
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setStandalone(isStandalone());
  }, []);

  return (
    <footer className="relative border-t border-primary/10 bg-surface">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-brand-primary/60 to-transparent"
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-10 py-10 sm:grid-cols-2 sm:items-center lg:py-12">
          <div className="flex flex-col items-center gap-5 sm:items-start">
            <Link
              href="/"
              className="group flex items-center gap-3 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
            >
              <span className="flex size-11 items-center justify-center rounded-xl bg-brand-primary text-white shadow-sm transition-transform duration-200 group-hover:-rotate-6">
                <Dumbbell className="size-5" aria-hidden="true" />
              </span>
              <span className="text-xl font-bold tracking-tight">
                Workout Tracker
              </span>
            </Link>
            <div className="w-full max-w-48">
              <LanguageSelector data={languageData} disabled={standalone} />
            </div>
          </div>

          <div className="flex flex-col items-center gap-4 sm:items-end">
            <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              {t("contact")}
            </h2>
            <a
              href="mailto:r.marton5@gmail.com"
              className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-brand-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
            >
              <Mail className="size-4 text-brand-primary" aria-hidden="true" />
              r.marton5@gmail.com
            </a>
            <nav aria-label="Social media" className="flex items-center gap-2">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://github.com/RuzsikMarton"
                aria-label="GitHub"
                className="flex size-10 items-center justify-center rounded-full border border-primary/15 text-muted-foreground transition-all duration-200 hover:border-brand-primary hover:bg-brand-primary hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
              >
                <FaGithub className="size-4" aria-hidden="true" />
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.linkedin.com/in/m%C3%A1rton-ruzsik-47561b313/"
                aria-label="LinkedIn"
                className="flex size-10 items-center justify-center rounded-full border border-primary/15 text-muted-foreground transition-all duration-200 hover:border-brand-primary hover:bg-brand-primary hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
              >
                <FaLinkedin className="size-4" aria-hidden="true" />
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.facebook.com/marton.ruzsik/"
                aria-label="Facebook"
                className="flex size-10 items-center justify-center rounded-full border border-primary/15 text-muted-foreground transition-all duration-200 hover:border-brand-primary hover:bg-brand-primary hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
              >
                <FaFacebook className="size-4" aria-hidden="true" />
              </a>
            </nav>
          </div>
        </div>

        <div className="flex flex-col items-center gap-4 border-t border-primary/10 py-5 text-center text-xs text-muted-foreground sm:flex-row sm:justify-between sm:text-left">
          <span>
            © {new Date().getFullYear()} Workout Tracker
            <span className="px-2 text-primary/30" aria-hidden="true">
              /
            </span>
            Marton Ruzsik
          </span>
          <nav
            aria-label="Footer links"
            className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2"
          >
            <Link
              href="/privacy-policy"
              className="transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
            >
              Privacy Policy
            </Link>
            <span aria-hidden="true" className="text-primary/30">
              /
            </span>
            <Link
              href="/terms-of-service"
              className="transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
            >
              Terms of Service
            </Link>
            {!standalone && (
              <>
                <span aria-hidden="true" className="text-primary/30">
                  /
                </span>
                <Link
                  href="/install"
                  className="font-medium text-brand-primary transition-colors hover:text-brand-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
                >
                  {navT("install")}
                </Link>
              </>
            )}
          </nav>
          <span className="hidden lg:block">
            Made with Next.js and Tailwind CSS
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
