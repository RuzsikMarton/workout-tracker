"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";
import { Role } from "@prisma/client";

interface ConditionalLayoutProps {
  children: React.ReactNode;
  publicSession: {
    user: {
      id: string;
      name: string;
    };
    role: Role;
  } | null;
}

const ConditionalLayout = ({
  children,
  publicSession,
}: ConditionalLayoutProps) => {
  const pathname = usePathname();

  // Hide header and footer on these routes
  const hideLayout =
    pathname.includes("/signin") ||
    pathname.includes("/signup") ||
    pathname.includes("/install");

  const hideFooter =
    pathname.includes("/workouts/active") || pathname.includes("/install");

  return (
    <>
      {!hideLayout && <Header publicSession={publicSession} />}
      <div role="main" tabIndex={-1}>
        {children}
      </div>
      {!hideFooter && <Footer />}
    </>
  );
};

export default ConditionalLayout;
