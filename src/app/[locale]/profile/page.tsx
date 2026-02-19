import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const ProfilePage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/signin");
  }
  return (
    <main className="page-main app-layout">
      <div className="page-container flex flex-col justify-center items-center">
        <h1 className="text-3xl text-red-500 uppercase text-center">
          this page is work in progress
        </h1>
        <h1 className="text-2xl font-bold mb-2">
          {session.user.name}&apos;s Profile
        </h1>
        <p className="text-sm text-muted-foreground">
          Here you&apos;ll see a summary of your profile information.
        </p>
      </div>
    </main>
  );
};

export default ProfilePage;
