import SignInForm from "@/components/auth/SignInForm";
import { useTranslations } from "next-intl";

export default function SignInPage() {
  const t = useTranslations("SignIn");
  const signInData = {
    title: t("title"),
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
