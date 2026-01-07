import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function Home() {

  return (
    <div className="flex min-h-screen bg-zinc-50 font-sans dark:bg-black">
      <main className="">
        Main Content
      </main>
    </div>
  );
}
