"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { set } from "zod";

const ContactForm = () => {
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  const onSubmit = async (event: any) => {
    setError("");
    event.preventDefault();
    setResult("Sending....");
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
      setResult("Form Submitted Successfully");
      event.target.reset();
    } else {
      setError("Error");
    }
  };
  return (
    <>
      <form onSubmit={onSubmit} className="flex flex-col gap-4 w-full">
        <h2 className="text-2xl font-bold mb-2 text-red-700">Send a Message</h2>
        <div className="flex gap-4">
          <div className="flex-1 flex flex-col">
            <label className="text-sm font-medium mb-2" htmlFor="firstName">
              First Name
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
              Last Name
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
            Message
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
          Send Message
        </Button>
      </form>
    </>
  );
};

export default ContactForm;
