import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // The app sets an HttpOnly cookie named `auth-token` after login/register.
  // Check that cookie and redirect unauthenticated users to the login page.
  const authToken = request.cookies.get("auth-token")?.value;

  if (!authToken && request.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};