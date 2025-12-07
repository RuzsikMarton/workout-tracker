"use client";

import Image from "next/image";
import MobileNav from "../MobileNav";
import Nav from "../Nav";
import Link from "next/link";
import { ThemeToggle } from "../theme-toggle";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";

const Header = () => {
  const [headerActive, setHeaderActive] = useState(false);
  const [isOpen , setIsOpen] = useState(true);
  const [isMobile , setIsMobile] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHeaderActive(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={`${headerActive ? "h-20" : "h-28"} fixed top-0 w-full z-50 transition-all bg-primary-foreground backdrop-blur-sm border-b border-b-primary/10`}>
      <div className="container mx-auto h-full flex items-center justify-between px-4">
        <Link href="/">
          <Image src="/next.svg" alt="" width={120} height={50}></Image>
        </Link>
        <Nav />
        <MobileNav ComponentStyles={`${headerActive ? 'top-20' : 'top-28'} ${isOpen ? 'max-h-max py-8 border-background border-t': 'max-h-0 overflow-hidden'} flex flex-col w-full xl:hidden text-center gap-8 fixed left-0 bg-amber-200 transition-all bg-primary-foreground`}/>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link href={"/signin"}>
            <Button variant="outline">Sign In</Button>
          </Link>
          <Button variant={"outline"} className="xl:hidden" onClick={() => setIsOpen(!isOpen)}><Menu/></Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
