"use client";

import { ReactNode } from "react";
import {
  GoogleOAuthProvider,
  GoogleLogin,
  CredentialResponse,
} from "@react-oauth/google";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

export default function GoogleAuthWrapper({
  children,
}: {
  children?: ReactNode;
}) {
  const router = useRouter();
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

  const handleSuccess = async (credentialResponse: CredentialResponse) => {
    try {
      if (!credentialResponse.credential) {
        toast.error("No Google credentials received");
        return;
      }

      // Call our Next.js API route
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: credentialResponse.credential,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        // Store user info in localStorage
        localStorage.setItem("user", JSON.stringify(data.user));

        // Show appropriate success message
        if (data.user.backendConnected === false) {
          toast.success(
            `Welcome ${data.user.name}! Redirecting to registration...`
          );
        } else {
          toast.success(
            `Welcome ${data.user.name}! Redirecting to dashboard...`
          );
        }

        // Redirect based on API response
        if (data.redirectTo) {
          router.replace(data.redirectTo);
        } else {
          // Fallback redirect
          router.replace("/");
        }
      } else {
        toast.error(data.error || "Login failed");
      }
    } catch (error: any) {
      console.error("Google login error:", error);
      toast.error("Google login failed");
    }
  };

  if (!clientId) {
    // If client id is not set, don't render the Google button (avoids runtime errors).
    return (
      <>
        {children}
        <div className="flex justify-center mt-4 text-sm text-red-600">
          Google client ID is not configured.
        </div>
        <ToastContainer position="top-right" autoClose={3000} />
      </>
    );
  }

  return (
    <GoogleOAuthProvider clientId={clientId}>
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
