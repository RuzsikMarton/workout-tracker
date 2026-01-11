"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { useTranslations } from "next-intl";

const ContactForm = () => {
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  const t = useTranslations("ContactForm");

  const onSubmit = async (event: any) => {
    setError("");
    event.preventDefault();
    setResult(t("sending"));
    const formData = new FormData(event.target);

    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const fullName = `${firstName} ${lastName}`.trim();

    formData.delete("firstName");
    formData.delete("lastName");
    formData.append("name", fullName);

    formData.append("access_key", "b1616bea-8f90-49b8-81df-abab2928f3f2");
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    if (data.success) {
      setResult(t("successMessage"));
      event.target.reset();
    } else {
      setError(t("errorMessage"));
    }
  };
  return (
    <>
      <form onSubmit={onSubmit} className="flex flex-col gap-4 w-full">
        <h2 className="text-2xl font-bold mb-2 text-red-700">{t("title")}</h2>
        <div className="flex gap-4">
          <div className="flex-1 flex flex-col">
            <label className="text-sm font-medium mb-2" htmlFor="firstName">
              {t("fNameLabel")}
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              className="input-primary"
              required
            />
          </div>
          <div className="flex-1 flex flex-col">
            <label className="text-sm font-medium mb-2" htmlFor="lastName">
              {t("lNameLabel")}
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              className="input-primary"
              required
            />
          </div>
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="input-primary"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-2" htmlFor="message">
            {t("messageLabel")}
          </label>
          <textarea
            id="message"
            name="message"
            className="input-primary h-32 resize-none"
            required
          />
        </div>
        {result && <p className="text-gray-400 font-semibold">{result}</p>}
        {error && <p className="text-red-600 font-semibold">{error}</p>}
        <Button
          variant="default"
          className="w-full bg-red-700 hover:bg-red-800"
          type="submit"
        >
          {t("submitButton")}
        </Button>
      </form>
    </>
  );
};

export default ContactForm;
