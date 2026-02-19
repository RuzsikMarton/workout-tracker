"use client";

import { useTranslations } from "next-intl";

const errorPage = ({ error }: { error: Error & { digest?: string } }) => {
  const t = useTranslations("errors");
  return (
    <main className="page-main app-layout">
      <div className="page-container flex items-center justify-center">
        <div className="border-2 border-red-500 p-4 bg-red-500/75 rounded text-white">
          <h1 className="text-2xl font-bold text-center">{t("title")}</h1>
          <span className="text-center block"> {t("message")}</span>
          <span className="text-center block">
            Error ID: {error.digest ? error.digest : "N/A"}
          </span>
        </div>
      </div>
    </main>
  );
};

export default errorPage;
