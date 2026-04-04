import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const cookie = request.cookies.get("site-auth");
  if (cookie?.value === process.env.SITE_PASSWORD) {
    return NextResponse.next();
  }
  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set("from", request.nextUrl.pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/cours/:path*", "/projets/:path*"],
};
