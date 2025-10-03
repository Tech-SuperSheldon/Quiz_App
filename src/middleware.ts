import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  if (!token && request.nextUrl.pathname.startsWith("/dashboard")) {
<<<<<<< HEAD
    return NextResponse.redirect(new URL("/auth/login", request.url));
=======
    return NextResponse.redirect(new URL("/dashboard", request.url));
>>>>>>> 8ae559c153bc68a47b485f5b34c5f25c610fb7aa
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
