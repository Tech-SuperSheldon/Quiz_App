// src/app/api/auth/google/route.ts
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { token } = body;

    if (!token) {
      return NextResponse.json({ error: "No token provided" }, { status: 400 });
    }

    // Forward request to your backend
    const backendUrl = (process.env.NEXT_PUBLIC_NEXTAUTH_URL || "").replace(/\/$/, "") + "/api/users/login";

    const res = await axios.post(
      backendUrl,
      { token },
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
        // timeout: 5000,
      }
    );

    // Forward success response
    return NextResponse.json(res.data, { status: res.status });
  } catch (error: unknown) {
    console.error("Google route error:", error);

    // If axios error with response — return that info to caller (useful for debugging)
    if (axios.isAxiosError(error)) {
      const status = error.response?.status || 500;
      const data = error.response?.data || { message: error.message };
      // Be careful in production — avoid leaking sensitive backend internals.
      return NextResponse.json(
        { error: "Upstream error", details: data },
        { status }
      );
    }

    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ error: "Unknown server error" }, { status: 500 });
  }
}
