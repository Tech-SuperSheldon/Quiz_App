"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import GoogleAuthWrapper from "./GoogleAuthWrapper";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleEmailSignIn = async () => {
    if (!email.trim()) {
      toast.error("Please enter your email address");
      return;
    }

    if (!email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        "https://levelupbackend.supersheldon.online/api/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email.trim(),
          }),
        }
      );

      if (response.status === 404) {
        // User not found, redirect to register
        toast.info("Account not found. Redirecting to registration...");
        setTimeout(() => {
          router.push("/auth/register");
        }, 1500);
      } else if (response.ok) {
        // User found, redirect to dashboard
        const data = await response.json();


        if (data.token) {
          localStorage.setItem(
            "authData",
            JSON.stringify({
              token: data.token,
              userId: data.user.id   // store only the ID string
            })
          );

          // Set cookie for backup
          document.cookie = `auth-client=${JSON.stringify({
            token: data.token,
            userId: data.user.id
          })}; path=/; max-age=86400; SameSite=Lax`;
        }
       
        
        

        toast.success("Login successful! Redirecting to dashboard...");
        setTimeout(() => {
          router.push("/dashboard");
        }, 1000);
      } else {
        // Other error
        const errorData = await response.json();
        toast.error(errorData.message || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Email sign-in error:", error);
      toast.error("Network error. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
  <div className="min-h-screen w-full bg-gradient-to-br from-orange-50 via-orange-100 to-orange-200 flex items-center justify-center p-4 relative overflow-hidden">
    {/* Background Soft Blobs */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute -top-32 -right-32 w-64 h-64 bg-orange-300/20 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-yellow-300/20 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-200/30 rounded-full blur-3xl"></div>
    </div>

    {/* Main Content */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative z-10 w-full max-w-md"
    >
      {/* Logo/Brand */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-center mb-8"
      >
        <div className="w-25 h-25 bg-gradient-to-r from-orange-100 to-orange-200 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl">
          {/* <svg
            className="w-10 h-10 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
            />
          </svg> */}
          <img
    src="/Final-Logo-bg-removed.png"
    alt="logo"
    className="w-25 h-25 object-contain"
  />
        </div>

        <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent mb-2">
          Welcome Back
        </h1>
        <p className="text-orange-700/70">
          Sign in to continue your learning journey
        </p>
      </motion.div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="bg-white/50 backdrop-blur-2xl rounded-2xl shadow-lg border border-white/40 p-8"
      >
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-orange-800 mb-2">
              Sign in with Email
            </h2>
            <p className="text-sm text-orange-700/70">
              Enter your email to access your account
            </p>
          </div>

          {/* Email Input */}
          <div className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-orange-800 mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full px-4 py-3 border border-orange-300/60 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent bg-white/70 text-orange-900 placeholder-orange-700/40 transition-all duration-200"
                disabled={isLoading}
              />
            </div>

            {/* Sign In Button */}
            <motion.button
              onClick={handleEmailSignIn}
              disabled={isLoading || !email.trim()}
              whileHover={{ scale: isLoading ? 1 : 1.02 }}
              whileTap={{ scale: isLoading ? 1 : 0.98 }}
              className="w-full py-3 px-4 bg-gradient-to-r from-orange-500 to-orange-400 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Signing In...
                </>
              ) : (
                <>
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                    />
                  </svg>
                  Sign In
                </>
              )}
            </motion.button>
          </div>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-orange-300/50"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-orange-100 text-orange-700/60 backdrop-blur-xl">
                Or
              </span>
            </div>
          </div>

          {/* Google Section */}
          <div className="text-center">
            <h3 className="text-lg font-semibold text-orange-800 mb-2">
              Sign in with Google
            </h3>
            <p className="text-sm text-orange-700/70 mb-4">
              Quick and secure access to your account
            </p>
          </div>

          <GoogleAuthWrapper />

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-orange-300/50"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-orange-100 text-orange-700/60 backdrop-blur-xl">
                Secure & Fast
              </span>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="p-3 bg-orange-50/70 rounded-lg backdrop-blur-md border border-orange-200">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <svg
                  className="w-4 h-4 text-green-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <p className="text-xs text-orange-800">Secure</p>
            </div>

            <div className="p-3 bg-orange-50/70 rounded-lg backdrop-blur-md border border-orange-200">
              <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <svg
                  className="w-4 h-4 text-yellow-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <p className="text-xs text-orange-800">Fast</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="text-center mt-8"
      >
        <p className="text-sm text-orange-700/80">
          By signing in, you agree to our{" "}
          <a className="text-orange-800 underline">Terms of Service</a> and{" "}
          <a className="text-orange-800 underline">Privacy Policy</a>
        </p>
      </motion.div>
    </motion.div>

    {/* Toast Container */}
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      toastClassName="bg-white text-gray-800 border border-gray-200"
      progressClassName="bg-orange-400"
    />
  </div>
);




  
}
