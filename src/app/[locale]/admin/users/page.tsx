import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect, forbidden } from "next/navigation";
import UsersList from "@/components/admin/UsersList";

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

  let users = [];
  let totalCount = 0;
  let error = null;

  try {
    const url = new URL(
      "/api/admin/user",
      process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
    );
    if (search) {
      url.searchParams.set("search", search);
    }
    url.searchParams.set("page", page);
    url.searchParams.set("pageSize", pageSize);

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        Cookie: (await headers()).get("cookie") || "",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.error || `Failed to fetch users: ${response.status}`,
      );
    }

    const data = await response.json();
    users = data.data || [];
    totalCount = data.totalCount || 0;
  } catch (err) {
    console.error("Error fetching users:", err);
    error = err instanceof Error ? err.message : "Failed to fetch users";
  }

  return (
    <div className="page-main pt-28 dark:bg-secondary">
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
