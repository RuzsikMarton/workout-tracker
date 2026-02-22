import { LoadingSpinner } from "@/components/ui/loading-spinner";

export default function ContactLoading() {
  return (
    <main className="page-main app-layout flex items-center justify-center min-h-[60vh]">
      <LoadingSpinner />
    </main>
  );
}
