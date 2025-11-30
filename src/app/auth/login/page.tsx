"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import GoogleAuthWrapper from "./GoogleAuthWrapper";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const BASE_BACKEND_URL = "https://92c52865-c657-478a-b2e0-625fc822f55b-00-23crg2t5cyi67.pike.replit.dev:5000";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState("email"); // 'email' or 'otp'
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // --- STEP 1: SEND OTP ---
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

  // --- STEP 2: VERIFY OTP ---
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
        // Store Auth Data
        localStorage.setItem(
          "authData",
          JSON.stringify({
            token: data.token,
            userId: data.user.id,
            course: data.user.course,
            subject: data.user.subject,
            year: data.user.grade
          })
        );

        // Set Cookie
        document.cookie = `auth-client=${JSON.stringify({
          token: data.token,
          userId: data.user.id,
          course: data.user.course,
          subject: data.user.subject,
          year: data.user.grade
          
        })}; path=/; max-age=86400; SameSite=Lax`;

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">

      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-blue-500/5 rounded-full blur-3xl"></div>
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
          <div className="w-20 h-20 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-600">
            Sign in to continue your learning journey
          </p>
        </motion.div>

        {/* Login Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-200/50 p-8"
        >
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {step === 'email' ? "Sign in with Email" : "Enter Verification Code"}
              </h2>
              <p className="text-sm text-gray-600">
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
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Enter your email address"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white text-gray-900 placeholder-gray-500 transition-all duration-200"
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
                    <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-2">
                      One-Time Password
                    </label>
                    <input
                      type="text"
                      id="otp"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                      onKeyDown={handleKeyDown}
                      placeholder="Enter 6-digit code"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white text-gray-900 placeholder-gray-500 transition-all duration-200 tracking-widest text-center text-xl"
                      disabled={isLoading}
                      maxLength={6}
                    />
                    <button 
                      onClick={() => setStep('email')}
                      className="text-xs text-indigo-600 hover:text-indigo-800 mt-2 hover:underline"
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
                className="w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">Or</span>
              </div>
            </div>

            {/* Google Auth - Remains the same */}
            <div className="text-center">
               <h3 className="text-lg font-semibold text-gray-800 mb-2">Sign in with Google</h3>
               <p className="text-sm text-gray-600 mb-4">Quick and secure access to your account</p>
            </div>
            <GoogleAuthWrapper />

            {/* Footer Links & Features (Same as before) */}
            <div className="relative mt-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">Secure & Fast</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-center mt-4">
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-xs text-gray-600">Secure</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <p className="text-xs text-gray-600">Fast</p>
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
          <p className="text-sm text-gray-500">
            By signing in, you agree to our{" "}
            <a href={`${BASE_BACKEND_URL}/terms`} className="text-indigo-600 hover:text-indigo-500 transition-colors">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href={`${BASE_BACKEND_URL}/privacy`} className="text-indigo-600 hover:text-indigo-500 transition-colors">
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
        progressClassName="bg-gradient-to-r from-indigo-600 to-purple-600"
      />
    </div>
  );
}
