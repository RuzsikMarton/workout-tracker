"use client";

import { navLinks } from "@/const";
import { NavigationProps } from "@/types";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Nav = ({ data }: NavigationProps) => {
  const pathname = usePathname().slice(3) || "/";
  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname.startsWith(href);
  };

  return (
    <nav
      aria-label="Main navigation"
      className="hidden items-center gap-1 xl:flex"
    >
      {navLinks.map((link) => {
        const active = isActive(link.href);

        return (
          <Link
            key={link.href}
            href={link.href}
            aria-current={active ? "page" : undefined}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors duration-150 active:scale-95 ${
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

export default Nav;
