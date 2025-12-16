"use client";

import { Button } from "@/components/ui/button";
import { SignUpInput, signUpSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import Link from "next/link";

interface SignUpFormProps {
  data: {
    title: string;
    fullNameLabel: string;
    emailLabel: string;
    passwordLabel: string;
    confirmPasswordLabel: string;
    submitButton: string;
    signingUp: string;
    haveAccount: string;
    signinLink: string;
  };
}

export default function RegisterForm({ data }: SignUpFormProps) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<SignUpInput>({ resolver: zodResolver(signUpSchema) });

  const onSubmit: SubmitHandler<SignUpInput> = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log(data);
    } catch (err) {
      setError("root", { message: "Failed to register. Please try again." });
    }
  };

  return (
    <div className="flex flex-col items-center bg-primary-foreground border rounded-lg p-6 sm:p-8 w-full max-w-md lg:max-w-lg">
      <h1 className="text-3xl font-bold my-6 uppercase">{data.title}</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-2 w-full"
      >
        <label className="input-label">{data.fullNameLabel}</label>
        <input
          {...register("name")}
          type="text"
          placeholder={data.fullNameLabel}
          className="input-primary"
        />
        {errors.name && (
          <p className="text-destructive mt-1">{errors.name.message}</p>
        )}
        <label className="input-label">{data.emailLabel}</label>
        <input
          {...register("email")}
          type="text"
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
        <label className="input-label">{data.confirmPasswordLabel}</label>
        <input
          {...register("confirmPassword")}
          type="password"
          placeholder={data.confirmPasswordLabel}
          className="input-primary"
        />
        {errors.confirmPassword && (
          <p className="text-destructive mt-1">
            {errors.confirmPassword.message}
          </p>
        )}
        {errors.root && (
          <p className="text-destructive mt-2">{errors.root.message}</p>
        )}

        <Button type="submit" className="w-full mt-6" disabled={isSubmitting}>
          {isSubmitting ? data.signingUp : data.submitButton}
        </Button>
      </form>

      <div className="mt-10 flex text-primary/70">
        <span className="text-sm">{data.haveAccount}</span>
        <Link
          href="/signin"
          className="text-sm ml-1 underline hover:text-primary"
        >
          {data.signinLink}
        </Link>
      </div>
    </div>
  );
}
