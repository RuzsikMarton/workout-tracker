"use client";

import Link from "next/link";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Workouts", href: "/workouts" },
  { name: "Exercises", href: "/exercises" },
  { name: "Contact", href: "/contact" },
];

const Nav = () => {
  return (
    <nav className="hidden xl:flex gap-4">
        {navLinks.map((link) => {
          return (
            <Link
              key={link.name}
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
