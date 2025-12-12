"use client";

import { Button } from "@/components/ui/button";
import { SignUpInput, signUpSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import Link from "next/link";

export default function RegisterForm() {
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
      <h1 className="text-3xl font-bold my-6 uppercase">Register</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-2 w-full"
      >
        <input
          {...register("name")}
          type="text"
          placeholder="Full Name"
          className="input-primary"
        />
        {errors.name && (
          <p className="text-destructive mt-1">{errors.name.message}</p>
        )}

        <input
          {...register("email")}
          type="email"
          placeholder="Email"
          className="input-primary"
        />
        {errors.email && (
          <p className="text-destructive mt-1">{errors.email.message}</p>
        )}

        <input
          {...register("password")}
          type="password"
          placeholder="Password"
          className="input-primary"
        />
        {errors.password && (
          <p className="text-destructive mt-1">{errors.password.message}</p>
        )}

        <input
          {...register("confirmPassword")}
          type="password"
          placeholder="Confirm Password"
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
          {isSubmitting ? "Creating account..." : "Sign Up"}
        </Button>
      </form>

      <div className="mt-10 flex text-primary/70">
        <span className="text-sm">Already have an account?</span>
        <Link
          href="/signin"
          className="text-sm ml-1 underline hover:text-primary"
        >
          Sign in here
        </Link>
      </div>
    </div>
  );
}
