"use client";

import { User } from "better-auth";
import { Button } from "../ui/button";
import { useTranslations } from "next-intl";
import { Sheet, SheetTrigger } from "../ui/sheet";
import EditUser from "./EditUser";

const UserCard = ({
  user,
  totalWorkouts,
}: {
  user: User;
  totalWorkouts: number;
}) => {
  const t = useTranslations("profile.userCard");
  return (
    <div className="profile-card h-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{t("title")}</h1>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="active:scale-95 transition-transform duration-150"
            >
              {t("editButton")}
            </Button>
          </SheetTrigger>
          <EditUser currentUser={{ name: user.name, email: user.email }} />
        </Sheet>
      </div>
      {/* Info rows */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <span className="text-sm text-muted-foreground">
            {t("nameLabel")}
          </span>
          <span className="text-lg font-medium">{user.name}</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-sm text-muted-foreground">
            {t("emailLabel")}
          </span>
          <span className="text-lg font-medium">{user.email}</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-sm text-muted-foreground">
            {t("joinedLabel")}
          </span>
          <span className="text-lg font-medium">
            {new Date(user.createdAt).toLocaleDateString()}
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-sm text-muted-foreground">
            {t("totalWorkoutsLabel")}
          </span>
          <span className="text-2xl font-bold text-brand-primary">
            {totalWorkouts}
          </span>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
