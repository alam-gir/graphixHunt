import { getToken } from "next-auth/jwt";
import { NextResponse, NextRequest } from "next/server";

export const middleware = async (req: NextRequest) => {
  const res = NextResponse.next();
  const token = await getToken({
    req,
    secret: process.env.NEXT_AUTH_SECRET,
  });

  const checkingURLList =
    req.nextUrl.pathname === "/" ||
    req.nextUrl.pathname === "/over-view" ||
    req.nextUrl.pathname === "/services" ||
    req.nextUrl.pathname === "/categories" ||
    req.nextUrl.pathname === "/projects" ||
    req.nextUrl.pathname === "/settings";

  // if login page with token redirect to the home page.
  if (req.nextUrl.pathname === "/sign-in") {
    if (token) return NextResponse.redirect(req.nextUrl.origin);
  }
  // if try to access any page without token
  if (checkingURLList) {
    if (!token) return NextResponse.redirect(`${req.nextUrl.origin}/sign-in`);
  }
  return res;
};
