"use client";

import { useMessages, useTranslations } from "next-intl";
import Link from "next/link";

const Nav = () => {
  const messages = useMessages();

  const navLinks = [
  { name: messages.Nav.home, href: "/" },
  { name: messages.Nav.workouts, href: "/workouts" },
  { name: messages.Nav.exercises, href: "/exercises" },
  { name: messages.Nav.contact, href: "/contact" },
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
