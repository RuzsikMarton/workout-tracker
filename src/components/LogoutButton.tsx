"use client";

import { useState } from "react";
import { signOutAction } from "@/lib/actions/auth";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Loader2, LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const LogoutButton = () => {
  const t = useTranslations("Nav");
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const handleSignOut = async () => {
    setPending(true);
    try {
      await signOutAction();
      toast.success(t("signoutSuccess"));
      router.push("/");
      router.refresh();
    } catch {
      toast.error(t("signoutError"));
    } finally {
      setPending(false);
    }
  };
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          type="button"
          variant="outline"
          disabled={pending}
          onClick={handleSignOut}
          className="active:scale-90 transition-transform duration-150"
        >
          {pending ? <Loader2 className="animate-spin" /> : <LogOut />}
        </Button>
      </TooltipTrigger>
      <TooltipContent>{t("signout")}</TooltipContent>
    </Tooltip>
  );
};

export default LogoutButton;
