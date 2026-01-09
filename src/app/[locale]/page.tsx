import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function Home() {
  return (
    <main className="page-main bg-zinc-50 dark:bg-secondary">
      <div className="page-div">Main Content</div>
    </main>
  );
}
