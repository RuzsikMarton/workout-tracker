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
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  useEffect(() => {
    setIsOpen(false);
  }, [pathname, setIsOpen]);

  return (
    <nav aria-label="Main navigation" className={ComponentStyles}>
      {navLinks.map((link) => {
        const active = isActive(link.href);

        return (
          <Link
            key={link.name}
            href={link.href}
            aria-current={active ? "page" : undefined}
            className={`rounded-lg px-4 py-3 text-sm font-medium uppercase tracking-wide transition-colors duration-150 active:scale-[0.98] ${
              active
                ? "bg-brand-primary/10 text-brand-primary"
                : "text-muted-foreground hover:bg-accent hover:text-foreground"
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
