// app/api/questions/submit-answer/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    let { question_id, user_answer, time_spent, token } = body;

    if (!token) {
      const authHeader = req.headers.get("authorization");
      if (authHeader && authHeader.startsWith("Bearer ")) {
        token = authHeader.split(" ")[1];
      }
    }

    if (!token || !question_id || !user_answer) {
      return NextResponse.json(
        { error: "Missing required fields (token, question_id, user_answer)" },
        { status: 400 }
      );
    }

    const base = process.env.BASE_URL || "";
    const baseUrl = base.endsWith("/") ? base : `${base}/`;

    const backendResponse = await fetch(
      `${baseUrl}api/questions/submit-answer`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify({
          question_id,
          user_answer,
          time_spent: time_spent ?? 0,
        }),
      }
    );

    const data = await backendResponse.json();

    if (!backendResponse.ok) {
      console.error("Failed to submit answer:", data);
      return NextResponse.json(
        { error: data.message || "Failed to submit answer" },
        { status: backendResponse.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Submit answer error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
