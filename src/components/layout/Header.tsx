"use client";

import Image from "next/image";
import MobileNav from "../MobileNav";
import Nav from "../Nav";
import Link from "next/link";
import { ThemeToggle } from "../theme-toggle";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { LogOut, Menu, User } from "lucide-react";
import { useTranslations } from "next-intl";
import { signOutAction } from "@/lib/actions/auth";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Role } from "@prisma/client";

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
  const [headerActive, setHeaderActive] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const t = useTranslations("Nav");
  const navData = {
    home: t("home"),
    workouts: t("workouts"),
    exercises: t("exercises"),
    contact: t("contact"),
  };

  useEffect(() => {
    const handleScroll = () => {
      setHeaderActive(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`${
        headerActive ? "h-20" : "h-28"
      } fixed top-0 w-full z-50 transition-all bg-surface backdrop-blur-sm border-b border-b-primary/10`}
    >
      <div className="container mx-auto h-full flex items-center justify-between px-4">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.webp"
            alt="Workout Tracker"
            width={120}
            height={50}
            priority
          />
        </Link>
        <Nav data={navData} />
        <MobileNav
          data={navData}
          setIsOpen={setIsOpen}
          ComponentStyles={`${headerActive ? "top-20" : "top-28"} ${
            isOpen
              ? "max-h-max py-8 border-foreground border-y border-y-primary/10"
              : "max-h-0 overflow-hidden"
          } flex flex-col w-full xl:hidden text-center gap-8 fixed left-0 transition-all bg-surface`}
        />
        <div className="flex items-center gap-3">
          <ThemeToggle />
          {publicSession ? (
            <>
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                  {/* Mobile: icon only */}
                  {/* Desktop: name */}
                  <Button variant="outline">
                    <User className="h-4 w-4 md:hidden" />
                    <span className="hidden md:inline ml-2 font-medium">
                      {publicSession.user.name}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel className="text-muted-foreground text-xs uppercase">
                    {t("myaccount")}
                  </DropdownMenuLabel>
                  <DropdownMenuItem asChild>
                    <Link href={"/profile"}>{t("profile")}</Link>
                  </DropdownMenuItem>
                  {publicSession.role === "ADMIN" && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuLabel className="text-muted-foreground text-xs uppercase">
                        Admin
                      </DropdownMenuLabel>
                      <DropdownMenuItem asChild>
                        <Link href="/admin/users">Users</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/admin/exercises/new">Add Exercise</Link>
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
              <form action={signOutAction}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button type="submit" variant="outline">
                      <LogOut />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>{t("signout")}</TooltipContent>
                </Tooltip>
              </form>
            </>
          ) : (
            <Link href={"/signin"}>
              <Button variant="outline">{t("signin")}</Button>
            </Link>
          )}
          <Button
            variant={"outline"}
            className="xl:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Menu />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
