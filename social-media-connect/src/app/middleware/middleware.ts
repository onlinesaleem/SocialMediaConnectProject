// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  // Allow the request if:
  // 1. It's a request for next-auth session & provider fetching
  // 2. It's a request to a public page
  if (pathname.includes("/api/auth") || pathname.startsWith("/public")) {
    return NextResponse.next();
  }

  // Redirect to login if not authenticated
  if (!token && pathname !== "/login" && pathname !== "/signup") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*"],
};
