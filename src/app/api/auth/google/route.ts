import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { token } = body;

    if (!token) {
      return NextResponse.json({ error: "No token provided" }, { status: 400 });
    }

    // Decode the JWT token to get user info
    try {
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

      // Call your backend API with the email
      try {
        const backendResponse = await fetch(
          `${process.env.BASE_URL}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: userInfo.email,
          }),
        });

        const backendData = await backendResponse.json();

        if (backendResponse.ok) {
          // User exists in backend - set cookie and redirect to dashboard
          const response = NextResponse.json({
            success: true,
            user: {
              name: userInfo.name,
              email: userInfo.email,
              picture: userInfo.picture,
              googleId: userInfo.sub,
              ...backendData, // Include backend response data
            },
            redirectTo: "/dashboard", // Existing user goes to dashboard
          });

          // Set authentication cookie
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
            }
          );

          return response;
        } else {
          // User doesn't exist in backend - redirect to register
          const response = NextResponse.json({
            success: true,
            user: {
              name: userInfo.name,
              email: userInfo.email,
              picture: userInfo.picture,
              googleId: userInfo.sub,
              backendError: backendData,
            },
            redirectTo: "/auth/register", // New user goes to register
          });

          // Set temporary cookie for registration
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
              secure: process.env.NODE_ENV === "production",
              sameSite: "lax",
              maxAge: 60 * 60, // 1 hour
            }
          );

          return response;
        }
      } catch (backendError) {
        console.error("Backend error:", backendError);
        // Backend is not accessible, redirect to register with temp data
        const response = NextResponse.json({
          success: true,
          user: {
            name: userInfo.name,
            email: userInfo.email,
            picture: userInfo.picture,
            googleId: userInfo.sub,
            backendConnected: false,
          },
          redirectTo: "/auth/register", // Default to register when backend is down
        });

        // Set temporary cookie for registration
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
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60, // 1 hour
          }
        );

        return response;
      }
    } catch (decodeError) {
      console.error("Error decoding JWT:", decodeError);
      return NextResponse.json(
        { error: "Failed to process Google credentials" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Google auth route error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
