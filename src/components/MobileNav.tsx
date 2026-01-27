"use client";

import { usePathname } from "@/i18n/navigation";
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

  const pathname = usePathname().slice(3) || "/";
  const isActive = (href: string) => {
    return pathname === href;
  };

  return (
    <nav className={ComponentStyles}>
      {navLinks.map((link) => {
        return (
          <Link
            key={link.name}
            href={link.href}
            className={
              isActive(link.href) ? "text-red-700" : "hover:text-red-700"
            }
          >
            {link.name}
          </Link>
        );
      })}
    </nav>
  );
};

export default MobileNav;
