import { NextRequest, NextResponse } from "next/server";
import { createHash } from "crypto";

export function proxy(request: NextRequest) {
  const cookie = request.cookies.get("site-auth");
  const expected = createHash("sha256")
    .update(process.env.SITE_PASSWORD || "")
    .digest("hex");

  if (cookie?.value === expected) {
    return NextResponse.next();
  }
  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set("from", request.nextUrl.pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/cours/:path*", "/projets/:path*"],
};
