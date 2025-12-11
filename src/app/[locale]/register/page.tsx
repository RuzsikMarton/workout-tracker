"use client";

import { Button } from "@/components/ui/button";
import { SignUpInput, signUpSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

export default function Register() {
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
      throw new Error();
    } catch (err) {
      setError("root", { message: "Failed to register. Please try again." });
    }
  };
  return (
    <main className="flex min-h-screen font-sans">
      <div className="flex justify-center items-center grow p-4 sm:p-8">
        <div className="flex flex-col items-center bg-primary-foreground border rounded-lg p-6 sm:p-8 w-full max-w-md lg:max-w-lg">
          <h1 className="text-3xl font-bold my-6 uppercase">Register</h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-2 w-full"
          >
            <input
              {...register("name")}
              type="name"
              placeholder="Name"
              className="input-primary"
            ></input>
            {errors.name && (
              <p className="text-destructive mt-1">{errors.name.message}</p>
            )}
            <input
              {...register("email")}
              type="email"
              placeholder="Email"
              className="input-primary"
            ></input>
            {errors.email && (
              <p className="text-destructive mt-1">{errors.email.message}</p>
            )}
            <input
              {...register("password")}
              type="password"
              placeholder="Password"
              className="input-primary"
            ></input>
            {errors.password && (
              <p className="text-destructive mt-1">{errors.password.message}</p>
            )}
            <input
              {...register("confirmPassword")}
              type="password"
              placeholder="Confirm Password"
              className="input-primary"
            ></input>
            {errors.confirmPassword && (
              <p className="text-destructive mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-6"
            >
              {isSubmitting ? "Registering..." : "Register"}
            </Button>
            {errors.root && (
              <p className="text-destructive mt-2">{errors.root.message}</p>
            )}
          </form>
          <div className="mt-10 flex text-primary/70">
            <span className="text-sm">Already have an account?</span>
            <a
              href="/signin"
              className="text-sm ml-1 underline hover:text-primary"
            >
              Sign in here
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
