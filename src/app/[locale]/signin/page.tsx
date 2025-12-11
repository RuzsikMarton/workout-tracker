"use client";

import { Button } from "@/components/ui/button";
import { SignInInput, signInSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

export default function Singin() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<SignInInput>({resolver: zodResolver(signInSchema)});

  const onSubmit: SubmitHandler<SignInInput> = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log(data);
    } catch (err) {
      setError("root", { message: "Failed to sign in. Please try again." });
    }
  };
  return (
    <main className="flex min-h-screen font-sans">
      <div className="flex justify-center items-center grow p-4 sm:p-8">
        <div className="flex flex-col items-center bg-primary-foreground border rounded-lg p-6 sm:p-8 w-full max-w-md lg:max-w-lg">
          <h1 className="text-3xl font-bold my-6 uppercase">Login</h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-2 w-full"
          >
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
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-6"
            >
              {isSubmitting ? "Signing in..." : "Sign In"}
            </Button>
            {errors.root && (
              <p className="text-destructive mt-2">{errors.root.message}</p>
            )}
          </form>
          <div className="mt-10 flex text-primary/70">
            <span className="text-sm">Don't have an account?</span>
            <a
              href="/register"
              className="text-sm ml-1 underline hover:text-primary"
            >
              Sign up now
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
