"use client";

import { useState } from "react";
import { PaginationWithLinks } from "../ui/pagination-with-links";
import { Button } from "../ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { Save, Trash2 } from "lucide-react";
import {
  deleteUsersAdmin,
  updateUserRolesAdmin,
} from "@/lib/actions/adminUsers";
import { User } from "@/types/auth";

const UsersList = ({
  users,
  totalCount,
  currentPage,
  pageSize,
}: {
  users: User[];
  totalCount: number;
  currentPage: number;
  pageSize: number;
}) => {
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [changedRoles, setChangedRoles] = useState<Record<string, string>>({});
  const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set());

  const searchParams = useSearchParams();
  const router = useRouter();

  const toggleOne = (id: string) => {
    setSelectedUsers((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toggleAll = () => {
    setSelectedUsers((prev) => {
      if (prev.size === users.length) return new Set();
      return new Set(users.map((u) => u.id));
    });
  };

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("search", value);
    router.push(`/admin/users?${params.toString()}`, { scroll: false });
  };

  const handleRoleChange = (
    userId: string,
    newRole: string,
    originalRole: string,
  ) => {
    if (newRole === originalRole) {
      const updated = { ...changedRoles };
      delete updated[userId];
      setChangedRoles(updated);
    } else {
      setChangedRoles({ ...changedRoles, [userId]: newRole });
    }
  };

  const handleSaveChanges = async () => {
    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      const updates = Object.entries(changedRoles).map(([userId, newRole]) => ({
        userId,
        newRole: newRole as "USER" | "ADMIN",
      }));

      await updateUserRolesAdmin(updates);
      setChangedRoles({});
      setSuccess(
        `Successfully updated ${updates.length} user role${updates.length > 1 ? "s" : ""}!`,
      );
      setTimeout(() => setSuccess(null), 3000);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save changes.");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteUsers = async () => {
    setDeleting(true);
    setError(null);
    setSuccess(null);
    const ids = Array.from(selectedUsers);
    const count = selectedUsers.size;
    try {
      await deleteUsersAdmin(ids);

      setSelectedUsers(new Set());
      setChangedRoles({});
      setSuccess(`Successfully deleted ${count} user${count > 1 ? "s" : ""}!`);
      setTimeout(() => setSuccess(null), 3000);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete users.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="w-full px-4 py-6 md:px-16">
      <div className="flex justify-between md:justify-around mb-4 flex-row md:flex-col gap-4">
        <div className="flex flex-col md:flex-row gap-2 justify-between items-start md:items-center">
          <h1 className="text-2xl font-bold">User Management</h1>
          <input
            type="text"
            placeholder="Search users..."
            className="border rounded px-2 py-1"
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleChange(searchTerm);
            }}
          />
        </div>
        <div className="flex flex-col md:flex-row justify-center md:justify-end items-center gap-2">
          {error && <div className="text-red-600 text-sm">{error}</div>}
          {success && (
            <div className="text-green-600 text-sm font-medium">{success}</div>
          )}
          <Button
            variant="default"
            disabled={Object.keys(changedRoles).length === 0 || saving}
            onClick={handleSaveChanges}
          >
            <Save className="h-4 w-4" />
            <span className="hidden md:block">
              {saving ? "Saving..." : "Save Changes"}
            </span>
            {Object.keys(changedRoles).length > 0 && (
              <span className="ml-2 inline-block rounded-full bg-primary-foreground text-primary px-2 py-0.5 text-xs font-semibold">
                {Object.keys(changedRoles).length}
              </span>
            )}
          </Button>
          <Button
            variant="destructive"
            onClick={handleDeleteUsers}
            disabled={selectedUsers.size === 0 || deleting}
          >
            <Trash2 className="h-4 w-4" />
            <span className="hidden md:block">Delete Selected</span>
            {selectedUsers.size > 0 && (
              <span className="ml-2 inline-block rounded-full bg-primary-foreground text-primary px-2 py-0.5 text-xs font-semibold">
                {selectedUsers.size}
              </span>
            )}
          </Button>
        </div>
      </div>
      <div className="py-4">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr>
              <th className="border px-4 py-2 w-12">
                <input
                  type="checkbox"
                  checked={selectedUsers.size === users.length}
                  onChange={toggleAll}
                  className=""
                />
              </th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2 w-32">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="border px-4 py-2 text-center text-muted-foreground "
                >
                  No users found.
                </td>
              </tr>
            )}
            {users.map((user) => (
              <tr key={user.id}>
                <td className="border px-4 py-2 text-center">
                  <input
                    type="checkbox"
                    checked={selectedUsers.has(user.id)}
                    onChange={() => toggleOne(user.id)}
                  />
                </td>
                <td className="border px-2 md:px-4 py-2 text-sm">
                  {user.name}
                </td>
                <td className="border px-2 md:px-4 py-2 text-sm">
                  <span className="block truncate max-w-[100px] md:max-w-none">
                    {user.email}
                  </span>
                </td>
                <td className="border px-2 md:px-4 py-2">
                  <select
                    className="border rounded px-2 py-1 md:px-3 md:py-2 w-full appearance-none text-sm"
                    value={changedRoles[user.id] || user.role}
                    onChange={(e) =>
                      handleRoleChange(user.id, e.target.value, user.role)
                    }
                  >
                    <option value="USER">USER</option>
                    <option value="ADMIN">ADMIN</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <PaginationWithLinks
        page={currentPage}
        pageSize={pageSize}
        totalCount={totalCount}
      />
    </div>
  );
};

export default UsersList;
