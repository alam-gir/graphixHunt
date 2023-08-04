import { getToken } from "next-auth/jwt";
import { NextResponse, NextRequest } from "next/server";

export const middleware = async (req: NextRequest) => {
  const res = NextResponse.next();
  const token = await getToken({
    req,
    secret: process.env.NEXT_AUTH_SECRET,
  });

  // if home page without token redirect to the login page
  if (!token) {
    console.log("no token");
    return NextResponse.redirect("/tokenNotFound!");
  }
  if (req.nextUrl.pathname === "/") {
    if (!token) return NextResponse.redirect(`${req.nextUrl.origin}/sign-in`);
  }

  // if login page with token redirect to the home page.
  if (req.nextUrl.pathname === "/sign-in") {
    if (token) return NextResponse.redirect(req.nextUrl.origin);
  }
  return res;
};
