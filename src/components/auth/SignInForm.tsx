"use client";

import { Button } from "@/components/ui/button";
import { SignInInput, signInSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import Link from "next/link";

interface SignInFormProps {
  data: {
    title: string;
    emailLabel: string;
    noAccount: string;
    passwordLabel: string;
    registerLink: string;
    submitButton: string;
    signingIn: string;
  };
}

export default function SignInForm({ data }: SignInFormProps) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<SignInInput>({ resolver: zodResolver(signInSchema) });

  const onSubmit: SubmitHandler<SignInInput> = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (err) {
      setError("root", { message: "Failed to sign in. Please try again." });
    }
  };

  return (
    <div className="flex flex-col items-center bg-primary-foreground border rounded-lg p-6 sm:p-8 w-full max-w-md lg:max-w-lg">
      <h1 className="text-3xl font-bold my-6 uppercase">{data.title}</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-2 w-full"
      >
        <label className="input-label">{data.emailLabel}</label>
        <input
          {...register("email")}
          type="email"
          placeholder={data.emailLabel}
          className="input-primary"
        />
        {errors.email && (
          <p className="text-destructive mt-1">{errors.email.message}</p>
        )}
        <label className="input-label">{data.passwordLabel}</label>
        <input
          {...register("password")}
          type="password"
          placeholder={data.passwordLabel}
          className="input-primary"
        />
        {errors.password && (
          <p className="text-destructive mt-1">{errors.password.message}</p>
        )}
        {errors.root && (
          <p className="text-destructive mt-2">{errors.root.message}</p>
        )}
        <Button type="submit" className="w-full mt-6" disabled={isSubmitting}>
          {isSubmitting ? data.signingIn : data.submitButton}
        </Button>
      </form>
      <div className="mt-10 flex text-primary/70">
        <span className="text-sm">{data.noAccount}</span>
        <Link
          href="/register"
          className="text-sm ml-1 underline hover:text-primary"
        >
          {data.registerLink}
        </Link>
      </div>
    </div>
  );
}
