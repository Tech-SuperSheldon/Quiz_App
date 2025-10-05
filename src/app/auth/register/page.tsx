"use client";

import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { storeAuthData } from "@/utils/authStorage";

export default function DummyRegister() {
  const router = useRouter();

  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("john.doe@example.com");
  const [mobile, setMobile] = useState("");
  const [picture, setPicture] = useState<string | null>(null);
  const [grade, setGrade] = useState("");
  const [course, setCourse] = useState<"NAPLAN" | "ICAS" | "">("");
  const [submitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!name || !email || !grade || !course) {
      setErrorMessage("Please fill all required fields!");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ name, email, mobile, grade, course }),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok && data && data.success) {
        // Store auth data locally
        if (data.token && data.user) {
          storeAuthData({
            token: data.token,
            userId: data.user.id,
            user: data.user
          });
        }
        
        // Redirect to backend-provided path or default dashboard
        const dest = data.redirectTo || "/dashboard";
        // show a short success toast so user sees confirmation
        toast.success("Registration successful — redirecting...");
        console.log("Redirecting to", dest);
        setTimeout(() => {
          if (dest === "/dashboard" || dest.includes("/dashboard")) {
            window.location.assign(dest);
          } else {
            router.replace(dest);
          }
        }, 400);
        return;
      }

      // Show error
      const msg = data?.error || data?.message || "Registration failed";
      setErrorMessage(msg);
    } catch (err: unknown) {
  setErrorMessage("Registration failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    // Fetch temporary Google user data (if present) from server-side cookie
    const fetchTemp = async () => {
      try {
        const res = await fetch("/api/auth/user-data");
        if (!res.ok) return;
        const json = await res.json();
        if (json?.found && json?.data) {
          const d = json.data;
          if (d.name) setName(d.name);
          if (d.email) setEmail(d.email);
          if (d.picture) setPicture(d.picture);
        }
      } catch {
        // ignore
      }
    };

    fetchTemp();
  }, []);

  if (submitted) {
    return (
      <div className="max-w-md mx-auto mt-20 bg-white/95 p-8 shadow-xl rounded-xl border border-gray-200 text-center">
        <h2 className="text-2xl font-bold text-green-600 mb-4">
          Registration Successful!
        </h2>
        <p className="text-gray-700">
          Welcome, <span className="font-semibold">{name}</span>! You have
          successfully registered for{" "}
          <span className="font-semibold">{course}</span> in {grade}.
        </p>
        <p className="mt-4 text-gray-500">Redirecting to your dashboard...</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-20 bg-white/95 p-8 shadow-xl rounded-xl border border-gray-200 text-center">
      <ToastContainer position="top-right" autoClose={2500} />
      {/* Profile Picture */}
      <div className="w-24 h-24 mx-auto mb-4 shadow rounded-full overflow-hidden">
        <Image
          src={picture || "/Final-Logo-bg-removed.png"}
          alt="Profile"
          width={96}
          height={96}
          className="object-cover w-full h-full"
          priority
        />
      </div>

      {/* Greeting */}
      <p className="text-gray-600 mb-2">
        Hi, <span className="font-semibold">{name}</span>
      </p>

      {/* Registration Form */}
      <form className="space-y-5" onSubmit={handleSubmit}>
        {errorMessage && (
          <div className="text-sm text-red-600 bg-red-50 p-2 rounded">
            {errorMessage}
          </div>
        )}
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          required
        />
        <input
          type="tel"
          placeholder="Mobile Number (Optional)"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        />
        <select
          title="Grade"
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
          className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white"
          required
        >
          <option value="">Select Grade</option>
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i + 1} value={`Grade ${i + 1}`}>
              Grade {i + 1}
            </option>
          ))}
        </select>
        <label
          htmlFor="course"
          className="block text-left font-semibold text-gray-700"
        >
          Course
        </label>
        <select
          id="course"
          value={course}
          onChange={(e) => setCourse(e.target.value as "NAPLAN" | "ICAS")}
          className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white"
          required
        >
          <option value="">Select Course</option>
          <option value="NAPLAN">NAPLAN</option>
          <option value="ICAS">ICAS</option>
        </select>
        <button
          type="submit"
          className="w-full py-3 rounded-lg text-white font-semibold transition duration-300 ease-in-out bg-[#e66e37] shadow-[0_4px_10px_rgba(230,110,55,0.4)] hover:bg-[#e68355]"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Registering..." : "Complete Registration"}
        </button>
      </form>
    </div>
  );
}