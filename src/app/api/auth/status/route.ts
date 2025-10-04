import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const authCookie = req.cookies.get("auth-token");
    if (authCookie && authCookie.value) {
      return NextResponse.json({ authenticated: true });
    }
    return NextResponse.json({ authenticated: false });
  } catch (error) {
    console.error("auth status error:", error);
    return NextResponse.json({ authenticated: false }, { status: 500 });
  }
}
