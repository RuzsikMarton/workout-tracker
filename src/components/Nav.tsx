"use client";

import { NavigationProps } from "@/types";
import Link from "next/link";

const Nav = ({ data }: NavigationProps) => {
  const navLinks = [
    { name: data.home, href: "/" },
    { name: data.workouts, href: "/workouts" },
    { name: data.exercises, href: "/exercises" },
    { name: data.contact, href: "/contact" },
  ];

  return (
    <nav className="hidden xl:flex gap-4">
      {navLinks.map((link) => {
        return (
          <Link
            key={link.href}
            href={link.href}
            className="font-medium hover:text-red-700 uppercase"
          >
            {link.name}
          </Link>
        );
      })}
    </nav>
  );
};

export default Nav;
