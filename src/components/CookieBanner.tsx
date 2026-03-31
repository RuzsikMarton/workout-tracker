"use client";

import { useEffect } from "react";
import Script from "next/script";
import "vanilla-cookieconsent/dist/cookieconsent.css";
import * as CookieConsent from "vanilla-cookieconsent";
import { useTheme } from "next-themes";

export default function CookieBanner({ locale }: { locale: string }) {
  const { resolvedTheme } = useTheme();

  // Initialize cookie consent
  useEffect(() => {
    CookieConsent.run({
      categories: {
        necessary: {
          enabled: true,
          readOnly: true,
        },
        analytics: {
          services: {
            ga: {
              label: "Google Analytics",
              onAccept: () => {
                window.dispatchEvent(new Event("cc-analytics-enabled"));
              },
              onReject: () => {
                window.dispatchEvent(new Event("cc-analytics-disabled"));
              },
            },
            vercel: {
              label: "Vercel Analytics",
              onAccept: () => {
                window.dispatchEvent(new Event("cc-vercel-enabled"));
              },
              onReject: () => {
                window.dispatchEvent(new Event("cc-vercel-disabled"));
              },
            },
          },
        },
      },
      guiOptions: {
        consentModal: {
          layout: "box wide",
          position: "top center",
          equalWeightButtons: false,
        },
        preferencesModal: {
          layout: "box",
        },
      },
      language: {
        default: locale,
        translations: {
          en: {
            consentModal: {
              title: "We value your privacy",
              description:
                "We use cookies to enhance your browsing experience, analyze site traffic, and improve our services. You can choose which cookies to accept.",
              acceptAllBtn: "Accept all",
              acceptNecessaryBtn: "Reject all",
              showPreferencesBtn: "Manage preferences",
              footer: `
                <a href="/privacy-policy" target="_blank">Privacy Policy</a>
                <a href="/terms-of-service" target="_blank">Terms of Service</a>
            `,
            },
            preferencesModal: {
              title: "Cookie preferences",
              acceptAllBtn: "Accept all",
              acceptNecessaryBtn: "Reject all",
              savePreferencesBtn: "Save my preferences",
              closeIconLabel: "Close modal",
              sections: [
                {
                  title: "Essential Cookies",
                  description:
                    "These cookies are necessary for the website to function properly. They enable basic features like page navigation, secure login, and access to protected areas. The website cannot function without these cookies and they cannot be disabled.",
                  linkedCategory: "necessary",
                },
                {
                  title: "Analytics & Performance",
                  description:
                    "These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. This includes page views, time spent on pages, and navigation patterns. We use Google Analytics and Vercel Analytics to measure and improve our website performance.",
                  linkedCategory: "analytics",
                  cookieTable: {
                    headers: {
                      name: "Service",
                      description: "Purpose",
                    },
                    body: [
                      {
                        name: "Google Analytics",
                        description:
                          "Tracks user interactions and behavior to help us understand usage patterns",
                      },
                      {
                        name: "Vercel Analytics",
                        description:
                          "Monitors website performance and provides speed insights",
                      },
                    ],
                  },
                },
              ],
            },
          },
          hu: {
            consentModal: {
              title: "Tiszteletben tartjuk a magánéletedet",
              description:
                "Sütiket használunk a böngészési élmény javítására, az oldal forgalmának elemzésére és szolgáltatásaink fejlesztésére. Megválaszthatod, mely sütiket fogadod el.",
              acceptAllBtn: "Mindet elfogad",
              acceptNecessaryBtn: "Mindet elutasít",
              showPreferencesBtn: "Beállítások kezelése",
              footer: `
                <a href="/privacy-policy" target="_blank">Adatvédelmi szabályzat</a>
                <a href="/terms-of-service" target="_blank">Felhasználási feltételek</a>
            `,
            },
            preferencesModal: {
              title: "Süti beállítások",
              acceptAllBtn: "Mindet elfogad",
              acceptNecessaryBtn: "Mindet elutasít",
              savePreferencesBtn: "Beállítások mentése",
              closeIconLabel: "Bezárás",
              sections: [
                {
                  title: "Alapvető sütik",
                  description:
                    "Ezek a sütik szükségesek a weboldal megfelelő működéséhez. Lehetővé teszik az alapvető funkciókat, mint az oldalnavigáció, biztonságos bejelentkezés és védett területekhez való hozzáférés. A weboldal ezen sütik nélkül nem működhet, és nem kapcsolhatók ki.",
                  linkedCategory: "necessary",
                },
                {
                  title: "Analitika és teljesítmény",
                  description:
                    "Ezek a sütik segítenek megérteni, hogyan használják látogatóink a weboldalunkat azáltal, hogy névtelenül gyűjtenek és jelentenek információkat. Ez magában foglalja az oldalnézeteket, az oldalakon töltött időt és a navigációs mintákat. A Google Analytics és Vercel Analytics szolgáltatásokat használjuk a weboldal teljesítményének mérésére és javítására.",
                  linkedCategory: "analytics",
                  cookieTable: {
                    headers: {
                      name: "Szolgáltatás",
                      description: "Cél",
                    },
                    body: [
                      {
                        name: "Google Analytics",
                        description:
                          "Felhasználói interakciók és viselkedés követése a használati minták megértéséhez",
                      },
                      {
                        name: "Vercel Analytics",
                        description:
                          "Weboldal teljesítményének figyelése és sebességi információk nyújtása",
                      },
                    ],
                  },
                },
              ],
            },
          },
          sk: {
            consentModal: {
              title: "Vážime si vaše súkromie",
              description:
                "Používame súbory cookie na zlepšenie vášho zážitku z prehliadania, analýzu návštevnosti stránok a zlepšenie našich služieb. Môžete si vybrať, ktoré súbory cookie chcete prijať.",
              acceptAllBtn: "Povoliť všetky",
              acceptNecessaryBtn: "Odmietnuť všetky",
              showPreferencesBtn: "Spravovať preferencie",
              footer: `
                <a href="/privacy-policy" target="_blank">Zásady ochrany osobných údajov</a>
                <a href="/terms-of-service" target="_blank">Podmienky poskytovania služieb</a>
            `,
            },
            preferencesModal: {
              title: "Nastavenia súborov cookie",
              acceptAllBtn: "Povoliť všetky",
              acceptNecessaryBtn: "Odmietnuť všetky",
              savePreferencesBtn: "Uložiť nastavenia",
              closeIconLabel: "Zavrieť",
              sections: [
                {
                  title: "Nevyhnutné súbory cookie",
                  description:
                    "Tieto súbory cookie sú potrebné na správne fungovanie webovej stránky. Umožňujú základné funkcie ako navigácia na stránke, bezpečné prihlásenie a prístup k chráneným oblastiam. Webová stránka nemôže fungovať bez týchto súborov cookie a nemožno ich zakázať.",
                  linkedCategory: "necessary",
                },
                {
                  title: "Analytika a výkon",
                  description:
                    "Tieto súbory cookie nám pomáhajú pochopiť, ako návštevníci interagujú s našou webovou stránkou zhromažďovaním a anonymným hlásením informácií. Zahŕňa to zobrazenia stránok, čas strávený na stránkach a navigačné vzorce. Používame Google Analytics a Vercel Analytics na meranie a zlepšenie výkonu našej webovej stránky.",
                  linkedCategory: "analytics",
                  cookieTable: {
                    headers: {
                      name: "Služba",
                      description: "Účel",
                    },
                    body: [
                      {
                        name: "Google Analytics",
                        description:
                          "Sleduje interakcie používateľov a správanie na pochopenie vzorov používania",
                      },
                      {
                        name: "Vercel Analytics",
                        description:
                          "Monitoruje výkon webovej stránky a poskytuje informácie o rýchlosti",
                      },
                    ],
                  },
                },
              ],
            },
          },
        },
      },
    });
  }, [locale]);

  //apply elegant-black theme for dark mode
  useEffect(() => {
    const applyTheme = () => {
      const cookieConsentDiv = document.getElementById("cc-main");
      if (cookieConsentDiv && resolvedTheme) {
        if (resolvedTheme === "dark") {
          cookieConsentDiv.classList.add("cc--elegant-black");
          cookieConsentDiv.classList.remove("cc--darkmode");
        } else {
          cookieConsentDiv.classList.remove("cc--elegant-black");
          cookieConsentDiv.classList.remove("cc--darkmode");
        }
      }
    };
    applyTheme();
    //try after a short delay in case the banner isn't mounted yet
    const timeout = setTimeout(applyTheme, 100);

    return () => clearTimeout(timeout);
  }, [resolvedTheme]);

  return null;
}
