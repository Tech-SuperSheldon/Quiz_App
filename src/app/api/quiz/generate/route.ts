import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { subject, difficulty, numberOfQuestions } = body;

    // Validate required fields
    if (!subject || !difficulty || !numberOfQuestions) {
      return NextResponse.json(
        { error: "Missing required fields: subject, difficulty, numberOfQuestions" },
        { status: 400 }
      );
    }

    // Get auth data from cookies (set by registration)
    const tokenCookie = req.cookies.get("token");
    const userIdCookie = req.cookies.get("user_id");

    if (!tokenCookie || !userIdCookie) {
      return NextResponse.json(
        { error: "Authentication required. Please login first." },
        { status: 401 }
      );
    }

    const token = tokenCookie.value;
    const userId = userIdCookie.value;

    // Prepare the request to your backend quiz generation API
    const backendUrl = `${process.env.BASE_URL?.replace(/\/+$/, "")}/api/quiz/generate`;
    
    if (!process.env.BASE_URL) {
      return NextResponse.json(
        { error: "Backend service not configured" },
        { status: 500 }
      );
    }

    const payload = {
      subject,
      difficulty,
      numberOfQuestions: parseInt(numberOfQuestions),
      userId,
    };

    console.log("Generating quiz with payload:", payload);

    const backendResponse = await fetch(backendUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    const backendData = await backendResponse.json();

    if (backendResponse.ok) {
      return NextResponse.json({
        success: true,
        quiz: backendData,
        message: "Quiz generated successfully"
      });
    } else {
      console.error("Backend quiz generation failed:", backendResponse.status, backendData);
      return NextResponse.json(
        {
          success: false,
          error: backendData.error || backendData.message || "Failed to generate quiz",
          details: backendData,
        },
        { status: backendResponse.status }
      );
    }
  } catch (error) {
    console.error("Quiz generation error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}
