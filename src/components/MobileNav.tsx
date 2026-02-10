"use client";

import { NavigationProps } from "@/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

interface MobileNavProps extends NavigationProps {
  ComponentStyles: string;
  setIsOpen: (isOpen: boolean) => void;
}

const MobileNav = ({ data, ComponentStyles, setIsOpen }: MobileNavProps) => {
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

  useEffect(() => {
    setIsOpen(false);
  }, [pathname, setIsOpen]);

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
