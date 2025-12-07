"use client";

import Link from "next/link";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Workouts", href: "/workout" },
  { name: "Exercises", href: "/exercises" },
  { name: "Contact", href: "/contact" },
];

const MobileNav = ({ ComponentStyles }: { ComponentStyles: string }) => {
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
