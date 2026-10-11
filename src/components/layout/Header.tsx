"use client";

import Image from "next/image";
import MobileNav from "./MobileNav";
import Nav from "./Nav";
import Link from "next/link";
import { ThemeToggle } from "../theme-toggle";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { isStandalone } from "@/lib/pwa/detection";
import {
  DownloadIcon,
  Loader2Icon,
  LogOutIcon,
  MenuIcon,
  SquarePlusIcon,
  UserIcon,
  UsersIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Role } from "@prisma/client";
import { signOutAction } from "@/lib/actions/auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface HeaderProps {
  publicSession: {
    user: {
      id: string;
      name: string;
    };
    role: Role;
  } | null;
}

const Header = ({ publicSession }: HeaderProps) => {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [headerActive, setHeaderActive] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const t = useTranslations("Nav");
  const navData = {
    home: t("home"),
    workouts: t("workouts"),
    exercises: t("exercises"),
    contact: t("contact"),
  };

  const standalone = isStandalone();

  useEffect(() => {
    const handleScroll = () => {
      setHeaderActive(window.scrollY > 48);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
    <header
      className={`${
        headerActive ? "h-16" : "h-20"
      } fixed top-0 z-50 w-full border-b border-primary/10 bg-surface/90 shadow-sm backdrop-blur-xl transition-base`}
    >
      <div className="container mx-auto flex h-full max-w-7xl items-center justify-between gap-3 px-4 sm:px-6">
        <Link
          href="/"
          className="shrink-0 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
        >
          <Image
            src="/logo.webp"
            alt="Workout Tracker"
            width={60}
            height={60}
            priority
            className="size-12 object-contain sm:size-15"
          />
        </Link>
        <Nav data={navData} />
        <MobileNav
          data={navData}
          setIsOpen={setIsOpen}
          ComponentStyles={`${headerActive ? "top-16" : "top-20"} ${
            isOpen
              ? "max-h-[calc(100dvh-4rem)] overflow-y-auto border-b border-primary/10 py-5 shadow-lg"
              : "max-h-0 overflow-hidden"
          } fixed left-0 z-40 flex w-full flex-col gap-2 border-t border-primary/10 bg-surface/95 px-4 text-center backdrop-blur-xl transition-base xl:hidden`}
        />
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <ThemeToggle />
          {publicSession ? (
            <>
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                  {/* Mobile: icon only */}
                  {/* Desktop: name */}
                  <Button
                    variant="outline"
                    className="h-10 cursor-pointer rounded-full border-primary/15 bg-background/70 px-3 shadow-none transition-colors hover:border-brand-primary/40 hover:bg-brand-primary/5 active:scale-95 md:active:scale-100"
                  >
                    <UserIcon className="size-4 md:hidden" />
                    <span className="ml-2 hidden max-w-36 truncate font-medium md:inline">
                      {publicSession.user.name}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel className="text-muted-foreground text-xs uppercase">
                    {t("myaccount")}
                  </DropdownMenuLabel>
                  <DropdownMenuItem asChild>
                    <Link href={"/profile"}>
                      <UserIcon />
                      {t("profile")}
                    </Link>
                  </DropdownMenuItem>
                  {publicSession.role === "ADMIN" && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuLabel className="text-muted-foreground text-xs uppercase">
                        Admin
                      </DropdownMenuLabel>
                      <DropdownMenuItem asChild>
                        <Link href="/admin/users">
                          <UsersIcon />
                          Users
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/admin/exercises/new">
                          <SquarePlusIcon />
                          Add Exercise
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuSeparator />
                  {!standalone && (
                    <DropdownMenuItem asChild>
                      <Link href={"/install"}>
                        <DownloadIcon />
                        {t("install")}
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem
                    variant="destructive"
                    onClick={handleSignOut}
                  >
                    {pending ? (
                      <Loader2Icon className="animate-spin" />
                    ) : (
                      <LogOutIcon />
                    )}
                    {t("signout")}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              {/*Currently using DropdownMenuItem for logout instead of LogoutButton */}
            </>
          ) : (
            <>
              <Link href={"/signin"}>
                <Button
                  variant="outline"
                  className="h-10 rounded-full border-primary/15 bg-background/70 px-4 shadow-none transition-colors hover:border-brand-primary/40 hover:bg-brand-primary/5"
                >
                  {t("signin")}
                </Button>
              </Link>
            </>
          )}
          <Button
            variant={"outline"}
            aria-label={
              isOpen ? "Close navigation menu" : "Open navigation menu"
            }
            aria-expanded={isOpen}
            className="size-10 rounded-full border-primary/15 bg-background/70 shadow-none transition-colors hover:border-brand-primary/40 hover:bg-brand-primary/5 active:scale-95 xl:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            <MenuIcon
              className={`transition-transform duration-200 ${isOpen ? "rotate-90" : ""}`}
            />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
