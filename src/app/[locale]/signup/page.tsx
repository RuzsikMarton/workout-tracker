import RegisterForm from "@/components/auth/RegisterForm";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("signup"),
  };
}

export default async function RegisterPage() {
  const t = await getTranslations("SignUp");
  const signUpData = {
    title: t("title"),
    fullNameLabel: t("fullNameLabel"),
    emailLabel: t("emailLabel"),
    passwordLabel: t("passwordLabel"),
    confirmPasswordLabel: t("confirmPasswordLabel"),
    submitButton: t("submitButton"),
    signingUp: t("signingUp"),
    haveAccount: t("haveAccount"),
    signinLink: t("signinLink"),
  };
  return (
    <main className="page-main">
      <div className="flex justify-center items-center grow p-4 sm:p-8">
        <RegisterForm data={signUpData} />
      </div>
    </main>
  );
}
