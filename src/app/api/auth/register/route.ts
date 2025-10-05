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

      // Ensure BASE_URL ends with a single slash, then append the endpoint
      let baseUrl = backendUrlRaw || process.env.BASE_URL || "";
      baseUrl = baseUrl.replace(/\/+$/, ""); // Remove trailing slashes
      const backendUrl = `${baseUrl}/api/users/register`;

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

      let backendData: unknown = null;
      const contentType = backendResponse.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        backendData = await backendResponse.json();
      } else {
        // If not JSON, get text for debugging
        const text = await backendResponse.text();
        console.error("Backend returned non-JSON response:", text);
        return NextResponse.json(
          {
            success: false,
            error: "Backend returned invalid response",
            details: text,
          },
          { status: 502 }
        );
      }

      if (backendResponse.ok) {
        // Registration successful - set auth cookie and redirect to dashboard
        const backendObj =
          typeof backendData === "object" && backendData !== null
            ? (backendData as Record<string, unknown>)
            : {};
        const response = NextResponse.json({
          success: true,
          message: "User created successfully",
          token: backendObj.token,
          user: backendObj.user,
          redirectTo: "/dashboard",
        });

        // Save backend token and user id into cookies
        if (backendObj.token) {
          response.cookies.set("token", backendObj.token as string, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 7, // 7 days
          });
        }
        if (
          backendObj.user &&
          typeof backendObj.user === "object" &&
          backendObj.user !== null &&
          "id" in backendObj.user
        ) {
          response.cookies.set(
            "user_id",
            (backendObj.user as Record<string, unknown>)["id"] as string,
            {
              httpOnly: true,
              secure: process.env.NODE_ENV === "production",
              sameSite: "lax",
              maxAge: 60 * 60 * 24 * 7, // 7 days
            }
          );
        }

        // Set authentication cookie (legacy)
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
            ...backendObj,
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
              (typeof backendData === "object" &&
              backendData !== null &&
              "error" in backendData
                ? ((backendData as Record<string, unknown>)["error"] as string)
                : undefined) ||
              (typeof backendData === "object" &&
              backendData !== null &&
              "message" in backendData
                ? ((backendData as Record<string, unknown>)[
                    "message"
                  ] as string)
                : undefined) ||
              "Registration failed",
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
