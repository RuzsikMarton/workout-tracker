import ContactForm from "@/components/ContactForm";
import { Button } from "@/components/ui/button";
import { Contact, Link, Mail } from "lucide-react";
import { FaFacebook, FaGithub, FaGlobe, FaLinkedin } from "react-icons/fa";

const ContactPage = () => {
  return (
    <main className="page-main pt-28 bg-zinc-50 dark:bg-secondary">
      <div className="page-div max-w-7xl mx-auto gap-4 flex flex-col md:flex-row">
        <div className="flex-1 flex flex-col p-8 justify-center">
          <h1 className="text-4xl font-bold mb-8 text-red-700">Get in Touch</h1>
          <p className="text-lg text-muted-foreground mb-16">
            If you have any questions, feel free to reach out to us.
          </p>
          <div className="flex flex-col space-y-6">
            <div className="flex items-center gap-8">
              <Mail className="w-5 h-5 text-red-700" />
              <span className="text-lg">r.marton5@gmail.com</span>
            </div>
            <div className="flex items-center gap-8">
              <Link className="w-5 h-5 text-red-700" />
              <div className="flex gap-2">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://martonruzsik-port.vercel.app/sk"
                  className="p-2 rounded-lg bg-red-100 dark:bg-red-950 hover:bg-red-200 dark:hover:bg-red-900 transition-colors"
                >
                  <FaGlobe className="text-xl" />
                </a>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://github.com/RuzsikMarton"
                  className="p-2 rounded-lg bg-red-100 dark:bg-red-950 hover:bg-red-200 dark:hover:bg-red-900 transition-colors"
                >
                  <FaGithub className="text-xl" />
                </a>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.linkedin.com/in/m%C3%A1rton-ruzsik-47561b313/"
                  className="p-2 rounded-lg bg-red-100 dark:bg-red-950 hover:bg-red-200 dark:hover:bg-red-900 transition-colors"
                >
                  <FaLinkedin className="text-xl" />
                </a>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.facebook.com/marton.ruzsik/"
                  className="p-2 rounded-lg bg-red-100 dark:bg-red-950 hover:bg-red-200 dark:hover:bg-red-900 transition-colors"
                >
                  <FaFacebook className="text-xl" />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 flex items-center p-8">
          <ContactForm />
        </div>
      </div>
    </main>
  );
};

export default ContactPage;
