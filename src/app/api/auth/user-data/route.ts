import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const tempAuthCookie = req.cookies.get("temp-auth");

    if (!tempAuthCookie) {
      return NextResponse.json({ found: false });
    }

    let data: Record<string, unknown> = {};
    try {
      data = JSON.parse(tempAuthCookie.value);
    } catch (e) {
      console.error("Failed to parse temp-auth cookie:", e);
      return NextResponse.json({ found: false });
    }

    return NextResponse.json({ found: true, data });
  } catch (error) {
    console.error("user-data route error:", error);
    return NextResponse.json({ found: false }, { status: 500 });
  }
}
