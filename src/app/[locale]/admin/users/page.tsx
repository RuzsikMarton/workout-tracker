import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect, forbidden } from "next/navigation";
import UsersList from "@/components/admin/UsersList";
import { getUsersAdmin } from "@/lib/data/getUsersAdmin";

export const dynamic = "force-dynamic";

const UsersPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; page?: string; pageSize?: string }>;
}) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/signin");
  }

  if (session.role !== "ADMIN") {
    forbidden();
  }

  const params = await searchParams;
  const search = params.search || "";
  const page = params.page || "1";
  const pageSize = params.pageSize || "10";

  let error: string | null = null;

  const { users, totalCount } = await getUsersAdmin({
    search,
    page: parseInt(page),
    pageSize: parseInt(pageSize),
  });

  return (
    <div className="page-main app-layout">
      {error ? (
        <div className="container mx-auto px-4 py-8">
          <div className="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-200 px-4 py-3 rounded">
            <p className="font-bold">Error</p>
            <p>{error}</p>
          </div>
        </div>
      ) : (
        <UsersList
          users={users}
          totalCount={totalCount}
          currentPage={parseInt(page)}
          pageSize={parseInt(pageSize)}
        />
      )}
    </div>
  );
};

export default UsersPage;
