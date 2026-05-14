"use client";

import { navLinks } from "@/const";
import { NavigationProps } from "@/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

interface MobileNavProps extends NavigationProps {
  ComponentStyles: string;
  setIsOpen: (isOpen: boolean) => void;
}

const MobileNav = ({ data, ComponentStyles, setIsOpen }: MobileNavProps) => {
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
            className={`font-medium uppercase transition-colors active:scale-95 duration-150 ${
              isActive(link.href) ? "text-red-700" : "hover:text-red-700"
            }`}
          >
            {data[link.name as keyof typeof data]}
          </Link>
        );
      })}
    </nav>
  );
};

export default MobileNav;
