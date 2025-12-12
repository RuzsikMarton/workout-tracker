import SignInForm from "@/components/auth/SignInForm";

export default function SignInPage() {
  return (
    <main className="flex min-h-screen font-sans">
      <div className="flex justify-center items-center grow p-4 sm:p-8">
        <SignInForm />
      </div>
    </main>
  );
}
         