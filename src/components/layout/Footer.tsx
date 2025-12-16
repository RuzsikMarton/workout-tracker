import { FaGithub, FaFacebook, FaLinkedin } from "react-icons/fa";
import LanguageSelector from "../LanguageSelector";
import { useTranslations } from "next-intl";

const Footer = () => {
  const t = useTranslations("Footer");
  const languageData = {
    en: t("language.en"),
    sk: t("language.sk"),
    hu: t("language.hu"),
  };
  return (
    <footer className="mx-auto bg-primary-foreground px-16 border-t border-t-primary/10">
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-center lg:gap-64">
        <div className="flex flex-col justify-center items-center lg:items-start gap-2 py-8 lg:pb-4">
          <p className="text-2xl font-bold">Workout Tracker</p>
          <LanguageSelector data={languageData} />
        </div>
        <div className="flex flex-col justify-center items-center lg:items-start gap-2 py-8 lg:pb-4">
          <p className="text-lg font-semibold">{t("contact")}</p>
          <p className="text-lg font-medium">Email: r.marton5@gmail.com</p>
          <div className="flex gap-4">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/RuzsikMarton"
              className="flex items-center justify-center p-1 border-2 rounded-full border-primary hover:bg-primary hover:text-white dark:hover:text-black transition-colors duration-300"
            >
              <FaGithub className="text-xl" />
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.linkedin.com/in/m%C3%A1rton-ruzsik-47561b313/"
              className="flex items-center justify-center p-1 border-2 rounded-full border-primary hover:bg-primary hover:text-white dark:hover:text-black transition-colors duration-300"
            >
              <FaLinkedin className="text-xl" />
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.facebook.com/marton.ruzsik/"
              className="flex items-center justify-center p-1 border-2 rounded-full border-primary hover:bg-primary hover:text-white dark:hover:text-black transition-colors duration-300"
            >
              <FaFacebook className="text-xl" />
            </a>
          </div>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row justify-between text-primary/70 items-center gap-4">
        <span>© 2025 Workout Tracker. Marton Ruzsik</span>
        <span>Made with Next.js and Tailwind CSS</span>
        <div>Privacy Policy | Terms of Service</div>
      </div>
    </footer>
  );
};

export default Footer;
