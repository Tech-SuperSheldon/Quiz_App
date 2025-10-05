import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, mobile, grade, course } = body;

    // Get user data from temp cookie (set by the Google auth route)
    const tempAuthCookie = req.cookies.get("temp-auth");
  let googleData: Record<string, unknown> = {};

    if (tempAuthCookie) {
      try {
        googleData = JSON.parse(tempAuthCookie.value);
      } catch (error) {
        console.error("Error parsing temp-auth cookie:", error);
      }
    }

    // Prefer values from the request body, but fall back to Google-provided data when available.
    const finalName = name || googleData.name || "";
    const finalEmail = email || googleData.email || "";

    if (!finalName || !finalEmail || !grade || !course) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Call your backend API for registration
    try {
      // Prefer explicitly configured backend registration endpoint. If BASE_URL isn't set,
      // fall back to the known backend registration path for your project.
      let backendUrlRaw = process.env.BASE_URL && process.env.BASE_URL.trim();
      // If the env var was set to the login endpoint, switch it to register.
      if (backendUrlRaw && /\/login\/?$/.test(backendUrlRaw)) {
        backendUrlRaw = backendUrlRaw.replace(/\/login\/?$/, "/register");
      }

      const backendUrl =
        backendUrlRaw ||
        "https://levelupbackend.supersheldon.online/api/users/register";

      console.log("Register route posting to backend URL:", backendUrl);

      // Map frontend course values to backend-expected values.
      // Backend error message shows it expects 'Naplap' or 'ISAC' (single or array).
      const courseMap: Record<string, string> = {
        NAPLAN: "Naplap",
        ICAS: "ISAC",
        Naplap: "Naplap",
        ISAC: "ISAC",
      };

      const normalizedCourseKey = (course || "").toString().toUpperCase();
      const mappedCourse =
        courseMap[normalizedCourseKey] || courseMap[course as string] || course;

      const payload = {
        email: finalEmail,
        mobile_number: mobile || "",
        name: finalName,
        course: mappedCourse, // backend accepts single string or array
        grade: grade.replace("Grade ", ""), // Remove "Grade " prefix
        language: "english",
      };

      console.log("Register payload:", payload);

      const backendResponse = await fetch(backendUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const backendData = await backendResponse.json();

      if (backendResponse.ok) {
        // Registration successful - set auth cookie and redirect to dashboard
        const response = NextResponse.json({
          success: true,
          user: {
            name: finalName,
            email: finalEmail,
            mobile: mobile,
            grade: grade,
            course: course,
            picture: googleData.picture || "",
            googleId: googleData.googleId || "",
            ...backendData, // Include backend response data
          },
          redirectTo: "/dashboard",
        });

        // Set authentication cookie
        response.cookies.set(
          "auth-token",
          JSON.stringify({
            name: finalName,
            email: finalEmail,
            mobile: mobile,
            grade: grade,
            course: course,
            picture: googleData.picture || "",
            googleId: googleData.googleId || "",
            ...backendData,
          }),
          {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 7, // 7 days
          }
        );

        // Clear temp cookie
        response.cookies.delete("temp-auth");

        return response;
      } else {
        // Backend returned an error. Include backend details to help debugging (dev).
        console.error(
          "Backend registration failed:",
          backendResponse.status,
          backendData
        );
        return NextResponse.json(
          {
            success: false,
            error:
              backendData.error || backendData.message || "Registration failed",
            details: backendData,
          },
          { status: backendResponse.status }
        );
      }
    } catch (backendError) {
      console.error("Backend registration error:", backendError);
      return NextResponse.json(
        {
          success: false,
          error: "Unable to connect to registration service",
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Registration route error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}