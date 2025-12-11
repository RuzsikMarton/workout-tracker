"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";

interface ConditionalLayoutProps {
  children: React.ReactNode;
}

const ConditionalLayout = ({ children }: ConditionalLayoutProps) => {
  const pathname = usePathname();

  // Hide header and footer on these routes
  const hideLayout =
    pathname.includes("/signin") || pathname.includes("/register");

  return (
    <>
      {!hideLayout && <Header />}
      <div role="main" tabIndex={-1}>
        {children}
      </div>
      <Footer />
    </>
  );
};

export default ConditionalLayout;
