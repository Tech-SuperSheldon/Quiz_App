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

      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ token: credentialResponse.credential }),
      });

      const data = await res.json();

      if (res.ok && data.success) {

        const authData = {
          token: data.token, 
          userId: data.user.id,
          course: data.user.course,
          subject: data.user.subject,
          year: data.user.grade,
          name: data.user.name,
          email: data.user.email
        };

        localStorage.setItem("authData", JSON.stringify(authData));

        // Keep your existing user storage if needed elsewhere
        localStorage.setItem("user", JSON.stringify(data.user));

        const cookieValue = encodeURIComponent(JSON.stringify(authData));
        document.cookie = `auth-client=${cookieValue}; path=/; max-age=86400; SameSite=Lax; Secure`;


        if (data.user.backendConnected === false) {
          toast.success(`Welcome ${data.user.name}! Redirecting to registration...`);
        } else {
          toast.success(`Welcome ${data.user.name}! Redirecting to dashboard...`);
        }

        const dest = data.redirectTo || "/";
        if (dest.includes("/auth/register")) {
          toast.info("Redirecting to registration...");
          setTimeout(() => router.replace(dest), 400);
        } else {
          toast.success("Redirecting...");
          setTimeout(() => {
            if (dest === "/dashboard" || dest.includes("/dashboard")) {
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
        <ToastContainer position="top-right" autoClose={3000} />
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

      <ToastContainer
        position="top-right"
        autoClose={3000}
        toastClassName="bg-white text-gray-800 border border-gray-200"
        progressClassName="bg-gradient-to-r from-indigo-600 to-purple-600"
      />
    </GoogleOAuthProvider>
  );
}
