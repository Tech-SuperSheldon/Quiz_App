import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { token } = body;

    if (!token) {
      return NextResponse.json({ error: "No token provided" }, { status: 400 });
    }

    // Decode JWT token (Google credential)
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );

    const userInfo = JSON.parse(jsonPayload);
    console.log("Google user info:", userInfo);

    // Try backend login
    const backendResponse = await fetch(`${process.env.BASE_URL}api/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: userInfo.email }),
    });

    const backendData = await backendResponse.json();

    // Create base response object
    const response = NextResponse.json({
      success: true,
      user: {
        name: userInfo.name,
        email: userInfo.email,
        picture: userInfo.picture,
        googleId: userInfo.sub,
        ...backendData,
      },
      redirectTo: backendResponse.ok ? "/dashboard" : "/auth/register",
    });

    // ✅ Secure backend cookie (HTTP-only)
    response.cookies.set(
      "auth-token",
      JSON.stringify({
        name: userInfo.name,
        email: userInfo.email,
        picture: userInfo.picture,
        googleId: userInfo.sub,
        ...backendData,
      }),
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: "/",
      }
    );

    // ✅ Frontend-readable cookie (for Header)
    response.cookies.set(
      "auth-client",
      JSON.stringify({
        name: userInfo.name,
        email: userInfo.email,
        picture: userInfo.picture,
      }),
      {
        httpOnly: false, // readable in browser
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
      }
    );

    // ✅ Temporary cookie for registration page if backend didn’t find user
    if (!backendResponse.ok) {
      response.cookies.set(
        "temp-auth",
        JSON.stringify({
          name: userInfo.name,
          email: userInfo.email,
          picture: userInfo.picture,
          googleId: userInfo.sub,
        }),
        {
          httpOnly: true,
          sameSite: "lax",
          maxAge: 60 * 60,
          path: "/",
        }
      );
    }

    return response;
  } catch (error) {
    console.error("Google auth route error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
