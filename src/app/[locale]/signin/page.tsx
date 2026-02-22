import SignInForm from "@/components/auth/SignInForm";
import { getTranslations } from "next-intl/server";

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
      <div className="flex justify-center items-center grow p-4 sm:p-8">
        <SignInForm data={signInData} />
      </div>
    </main>
  );
}
