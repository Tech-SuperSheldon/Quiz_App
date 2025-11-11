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
        credentials: "include",
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

        // Redirect according to server response (dashboard for existing users,
        // /auth/register for new users). Server sets HttpOnly cookies (auth-token)
        // so we rely on server-provided redirectTo. Show a short toast when
        // redirecting to registration so user sees context.
        const dest = data.redirectTo || "/";
        if (dest.includes("/auth/register")) {
          toast.info("Redirecting to registration...");
          setTimeout(() => router.replace(dest), 400);
        } else {
          // dashboard or other destination — use full navigation for dashboard to ensure cookies are applied
          toast.success("Redirecting...");
          setTimeout(() => {
            if (dest === "/dashboard" || dest.includes("/dashboard")) {
              // full reload to ensure auth cookie is used on the next request
              window.location.assign(dest);
            } else {
              router.replace(dest);
            }
          }, 300);
        }
      } else {
        toast.error(data.error || "Login failed");
      }
    } catch (error: unknown) {
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
        
      </>
    );
  }

  return (
    <GoogleOAuthProvider clientId={clientId}>
      {children}

      <div className="flex justify-center">
        <GoogleLogin
          onSuccess={handleSuccess}
          onError={() => toast.error("Google login failed")}
          theme="outline"
          size="large"
          useOneTap={false}
          auto_select={false}
          cancel_on_tap_outside={true}
          scope="openid email profile"
          shape="rectangular"
          width="100%"
        />
      </div>

      
    </GoogleOAuthProvider>
  );
}
