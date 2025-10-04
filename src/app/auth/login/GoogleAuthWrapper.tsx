"use client";

import { ReactNode } from "react";
import { GoogleOAuthProvider, GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

export default function GoogleAuthWrapper({ children }: { children?: ReactNode }) {
  const router = useRouter();

  const handleSuccess = async (credentialResponse: CredentialResponse) => {
    try {
      if (!credentialResponse.credential) {
        toast.error("No Google credentials received");
        return;
      }

      // Call local Next.js API (proxy) to backend
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: credentialResponse.credential }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Login successful!");
        router.push("/"); // redirect
      } else {
        toast.error(data.error || "Login failed");
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message || "Google login failed");
      } else {
        toast.error("Google login failed");
      }
    }
  };

  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
      {children}

      <div className="flex justify-center mt-4">
        <GoogleLogin
          onSuccess={handleSuccess}
          onError={() => toast.error("Google login failed")}
          theme="filled_blue"
          size="large"
        />
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </GoogleOAuthProvider>
  );
}
