import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "./lib/auth";

const intlMiddleware = createMiddleware(routing);

const locales = ["en", "sk", "hu"] as const;

const basePublicRoutes = [
  "/",
  "/signin",
  "/signup",
  "/contact",
  "/privacy-policy",
  "/terms-of-service",
];

const publicRoutes = [
  ...basePublicRoutes,
  ...locales.flatMap((locale) =>
    basePublicRoutes.map((route) =>
      route === "/" ? `/${locale}` : `/${locale}${route}`,
    ),
  ),
];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  const intlResponse = intlMiddleware(req);

  if (publicRoutes.includes(path) || path.startsWith("/api/auth/")) {
    return intlResponse;
  }

  const session = await auth.api.getSession({
    headers: req.headers,
  });

  if (!session) {
    const locale = req.nextUrl.pathname.split("/")[1];
    const validLocale = ["en", "sk", "hu"].includes(locale) ? locale : "en";
    const signinUrl = new URL(`/${validLocale}/signin`, req.url);
    signinUrl.searchParams.set("callbackUrl", path);
    return NextResponse.redirect(signinUrl);
  }

  return intlResponse;
}

export const config = {
  matcher: [
    "/",
    "/(en|sk|hu)/:path*",
    "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
  ],
};
