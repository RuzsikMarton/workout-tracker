"use client";

import { NavigationProps } from "@/types";
import Link from "next/link";

interface MobileNavProps extends NavigationProps {
  ComponentStyles: string;
}

const MobileNav = ({ data, ComponentStyles }: MobileNavProps) => {
  const navLinks = [
    { name: data.home, href: "/" },
    { name: data.workouts, href: "/workouts" },
    { name: data.exercises, href: "/exercises" },
    { name: data.contact, href: "/contact" },
  ];
  return (
    <nav className={ComponentStyles}>
      {navLinks.map((link) => {
        return (
          <Link key={link.name} href={link.href}>
            {link.name}
          </Link>
        );
      })}
    </nav>
  );
};

export default MobileNav;
