import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { course_type, stage_number, num_questions, token, user_id } = body;

    if (!token || !user_id) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    // Call the backend API to generate questions
    const backendResponse = await fetch(
      `${process.env.BASE_URL}api/questions/generate`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          user_id: user_id,
          course_type: course_type || "Naplap",
          stage_number: stage_number || 1,
          num_questions: num_questions || 10,
        }),
      }
    );

    const data = await backendResponse.json();
    console.log("Backend response:", backendResponse.status, data);

    if (!backendResponse.ok) {
      console.error(
        "Backend generate questions failed:",
        backendResponse.status,
        data
      );
      return NextResponse.json(
        { error: data.message || data.error || "Failed to generate questions" },
        { status: backendResponse.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Generate questions error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
