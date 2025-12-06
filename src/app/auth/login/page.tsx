"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import GoogleAuthWrapper from "./GoogleAuthWrapper";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BASE_BACKEND_URL } from "@/config";


export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState("email"); // 'email' or 'otp'
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // --- STEP 1: SEND OTP (Your Original Logic) ---
  const handleSendOtp = async () => {
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
      const response = await fetch(`${BASE_BACKEND_URL}/api/users/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });

      if (response.status === 404) {
        toast.info("Account not found. Redirecting to registration...");
        setTimeout(() => {
          router.push("/auth/register");
        }, 1500);
      } else if (response.ok) {
        toast.success("OTP sent to your email!");
        setStep("otp");
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Failed to send OTP.");
      }
    } catch (error) {
      console.error("Send OTP error:", error);
      toast.error("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // --- STEP 2: VERIFY OTP (Your Original Logic) ---
  const handleVerifyOtp = async () => {
    if (!otp.trim() || otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${BASE_BACKEND_URL}/api/users/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          otp: otp.trim()
        }),
      });

      const data = await response.json();

      if (response.ok && data.token) {
        // Store Auth Data (Your original structure)
        localStorage.setItem(
          "authData",
          JSON.stringify({
            token: data.token,
            userId: data.user.id,
            course: data.user.course,
            subject: data.user.subject,
            year: data.user.grade,
            name: data.user.name,
            email: data.user.email
          })
        );

        // Set Cookie (Your original structure)
        const cookieValue = encodeURIComponent(JSON.stringify({
          token: data.token,
          userId: data.user.id,
          course: data.user.course,
          subject: data.user.subject,
          year: data.user.grade,
          name: data.user.name,
          email: data.user.email
        }));

        document.cookie = `auth-client=${cookieValue}; path=/; max-age=86400; SameSite=Lax; Secure`;

        toast.success("Login successful!");
        setTimeout(() => {
          router.push("/dashboard");
        }, 1000);
      } else {
        toast.error(data.message || "Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error("Verify OTP error:", error);
      toast.error("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Enter key press
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (step === 'email') handleSendOtp();
      else handleVerifyOtp();
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
        {/* Logo/Brand Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-center mb-8"
        >
          <div className="w-25 h-25 bg-gradient-to-r from-orange-100 to-orange-200 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl p-4">
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

        {/* Login Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="bg-white/50 backdrop-blur-2xl rounded-2xl shadow-lg border border-white/40 p-8"
        >
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-orange-800 mb-2">
                {step === 'email' ? "Sign in with Email" : "Enter Verification Code"}
              </h2>
              <p className="text-sm text-orange-700/70">
                {step === 'email'
                  ? "Enter your email to receive a login code"
                  : `Code sent to ${email}`}
              </p>
            </div>

            {/* Input Fields with Animation */}
            <div className="space-y-4">
              <AnimatePresence mode="wait">
                {step === 'email' ? (
                  <motion.div
                    key="email-input"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                  >
                    <label htmlFor="email" className="block text-sm font-medium text-orange-800 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Enter your email address"
                      className="w-full px-4 py-3 border border-orange-300/60 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent bg-white/70 text-orange-900 placeholder-orange-700/40 transition-all duration-200"
                      disabled={isLoading}
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key="otp-input"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <label htmlFor="otp" className="block text-sm font-medium text-orange-800 mb-2">
                      One-Time Password
                    </label>
                    <input
                      type="text"
                      id="otp"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                      onKeyDown={handleKeyDown}
                      placeholder="Enter 6-digit code"
                      className="w-full px-4 py-3 border border-orange-300/60 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent bg-white/70 text-orange-900 placeholder-orange-700/40 transition-all duration-200 tracking-widest text-center text-xl"
                      disabled={isLoading}
                      maxLength={6}
                    />
                    <button
                      onClick={() => setStep('email')}
                      className="text-xs text-orange-600 hover:text-orange-800 mt-2 hover:underline"
                    >
                      Change email address
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Action Button */}
              <motion.button
                onClick={step === 'email' ? handleSendOtp : handleVerifyOtp}
                disabled={isLoading || (step === 'email' ? !email.trim() : otp.length !== 6)}
                whileHover={{ scale: isLoading ? 1 : 1.02 }}
                whileTap={{ scale: isLoading ? 1 : 0.98 }}
                className="w-full py-3 px-4 bg-gradient-to-r from-orange-500 to-orange-400 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    {step === 'email' ? (
                      <>
                        <span>Send Code</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Verify & Login</span>
                      </>
                    )}
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
                <span className="px-4 bg-orange-100 text-orange-700/60 backdrop-blur-xl rounded-full">
                  Or
                </span>
              </div>
            </div>

            {/* Google Auth */}
            <div className="text-center">
              <h3 className="text-lg font-semibold text-orange-800 mb-2">Sign in with Google</h3>
              <p className="text-sm text-orange-700/70 mb-4">Quick and secure access to your account</p>
            </div>
            <GoogleAuthWrapper />

            {/* Footer Features */}
            <div className="relative mt-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-orange-300/50"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-orange-100 text-orange-700/60 backdrop-blur-xl rounded-full">Secure & Fast</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-center mt-4">
              <div className="p-3 bg-orange-50/70 rounded-lg backdrop-blur-md border border-orange-200">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <svg className="w-4 h-4 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-xs text-orange-800">Secure</p>
              </div>
              <div className="p-3 bg-orange-50/70 rounded-lg backdrop-blur-md border border-orange-200">
                <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <svg className="w-4 h-4 text-yellow-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
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
            <a href={`${BASE_BACKEND_URL}/terms`} className="text-orange-900 underline hover:text-orange-700">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href={`${BASE_BACKEND_URL}/privacy`} className="text-orange-900 underline hover:text-orange-700">
              Privacy Policy
            </a>
          </p>
        </motion.div>
      </motion.div>

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