import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Forbidden() {
  return (
    <main className="page-main flex flex-col items-center justify-center pt-28 space-y-4 dark:bg-secondary">
      <h2>Forbidden</h2>
      <p>You are not authorized to access this resource.</p>
      <Link href="/">
        <Button>Return Home</Button>
      </Link>
    </main>
  );
}
