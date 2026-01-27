"use client";

import { NavigationProps } from "@/types";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Nav = ({ data }: NavigationProps) => {
  const navLinks = [
    { name: data.home, href: "/" },
    { name: data.workouts, href: "/workouts" },
    { name: data.exercises, href: "/exercises" },
    { name: data.contact, href: "/contact" },
  ];

  const pathname = usePathname().slice(3) || "/";
  const isActive = (href: string) => {
    return pathname === href;
  };

  return (
    <nav className="hidden xl:flex gap-4">
      {navLinks.map((link) => {
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`font-medium uppercase transition-colors ${
              isActive(link.href) ? "text-red-700" : "hover:text-red-700"
            }`}
          >
            {link.name}
            {isActive(link.href) && (
              <span className="block h-0.5 w-full bg-red-700"></span>
            )}
          </Link>
        );
      })}
    </nav>
  );
};

export default Nav;
