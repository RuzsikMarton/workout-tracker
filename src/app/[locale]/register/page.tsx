import RegisterForm from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen font-sans">
      <div className="flex justify-center items-center grow p-4 sm:p-8">
        <RegisterForm />
      </div>
    </main>
  );
}
