import SignInForm from "@/components/auth/SignInForm";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("signin"),
  };
}

export default async function SignInPage() {
  const t = await getTranslations("SignIn");
  const signInData = {
    title: t("title"),
    subtitle: t("subtitle"),
    emailLabel: t("emailLabel"),
    passwordLabel: t("passwordLabel"),
    submitButton: t("submitButton"),
    signingIn: t("signingIn"),
    noAccount: t("noAccount"),
    registerLink: t("registerLink"),
  };
  return (
    <main className="page-main">
      <div className="flex flex-col justify-center items-center grow p-4 sm:p-8">
        <SignInForm data={signInData} />
        <Link
          className="text-muted-foreground hover:text-primary text-xs mt-4 active:scale-90 transition-transform"
          href={"/"}
        >
          ← {t("backToHome")}
        </Link>
      </div>
    </main>
  );
}
