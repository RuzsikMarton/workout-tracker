import RegisterForm from "@/components/auth/RegisterForm";
import { useTranslations } from "next-intl";

export default function RegisterPage() {
  const t = useTranslations("SignUp");
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
