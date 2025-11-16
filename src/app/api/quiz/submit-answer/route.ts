import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // Parse request body
    const body = await req.json();
    let { question_id, user_answer, time_spent, token } = body;
    // fallback to Authorization header if token not in body
    if (!token) {
      const authHeader = req.headers.get("authorization");
      if (authHeader && authHeader.startsWith("Bearer ")) {
        token = authHeader.split(" ")[1];
      }
    }

    // Check for missing required fields
    if (!token || !question_id || !user_answer) {
      return NextResponse.json(
        { error: "Missing required fields (token, question_id, user_answer)" },
        { status: 400 }
      );
    }

    // Fetch request to the backend
    const backendResponse = await fetch(
      `${process.env.BASE_URL}api/questions/submit-answer`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify({
          question_id,
          user_answer,
          time_spent: time_spent ?? 0, // Handle undefined time_spent
        }),
      }
    );

    // Parse response from backend
    const data = await backendResponse.json();

    // Handle unsuccessful backend response
    if (!backendResponse.ok) {
      console.error("Failed to submit answer:", data);
      return NextResponse.json(
        { error: data.message || "Failed to submit answer" },
        { status: backendResponse.status }
      );
    }

    // Return successful response
    return NextResponse.json(data);
  } catch (error) {
    // Log error and return 500
    console.error("Submit answer error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
