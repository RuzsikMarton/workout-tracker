"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";

interface ConditionalLayoutProps {
  children: React.ReactNode;
  publicSession: {
    user: {
      id: string;
      name: string;
    };
  } | null;
}

const ConditionalLayout = ({ children, publicSession }: ConditionalLayoutProps) => {
  const pathname = usePathname();

  // Hide header and footer on these routes
  const hideLayout =
    pathname.includes("/signin") || pathname.includes("/signup");

  return (
    <>
      {!hideLayout && <Header publicSession={publicSession}/>}
      <div role="main" tabIndex={-1}>
        {children}
      </div>
      <Footer />
    </>
  );
};

export default ConditionalLayout;
