"use client";

import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { storeRegistrationData } from "@/utils/authStorage";
import { BASE_BACKEND_URL } from "@/config";

// Data Mapping based on your requirements
const COURSE_SUBJECTS: { [key: string]: string[] } = {
  "NAPLAN": [
    "Reading",
    "Writing",
    "Language Conventions",
    "Numeracy"
  ],
  "A-Level": [
    "Mathematics",
    "Physics",
    "Chemistry",
    "Biology",
    "English"
  ],
  "GCSE": [
    "Mathematics",
    "English",
    "Science (Physics, Chemistry, Biology)",
    "History",
    "Geography",
    "Computer Science",
    "Business",
    "Economics"
  ],
  "ICAS": [
    "English",
    "Mathematics",
    "Science",
    "Digital Technologies",
    "Writing",
    "Spelling Bee"
  ],
  "Selective School Test": [
    "Reading",
    "Mathematical Reasoning",
    "Thinking Skills",
    "Writing"
  ]
};

export default function DummyRegister() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [picture, setPicture] = useState<string | null>(null);

  // State remains 'grade' to satisfy backend requirement
  const [grade, setGrade] = useState("");

  // Updated state for Course and Subject
  const [course, setCourse] = useState("");
  const [subject, setSubject] = useState("");

  const [submitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Auto-fill from Google sign-in data
  useEffect(() => {
    const fetchTemp = async () => {
      try {
        const res = await fetch(`${BASE_BACKEND_URL}/api/users/user-data`);
        if (!res.ok) return;
        const json = await res.json();
        console.log("Fetched user data:", json);
        if (json?.found && json?.data) {
          const d = json.data;
          if (d.name) setName(d.name);
          if (d.email) setEmail(d.email);
          if (d.picture) setPicture(d.picture);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchTemp();
  }, []);

  // Handle Course Change to reset Subject
  const handleCourseChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCourse(e.target.value);
    setSubject(""); // Reset subject when course changes
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!name || !email || !grade || !course || !subject) {
      setErrorMessage("Please fill all required fields!");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch(`${BASE_BACKEND_URL}/api/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Sending 'grade' key with value like "Grade 1" (Backend Happy), but user saw "Year 1"
        body: JSON.stringify({ name, email, mobile, grade, course, subject }),
      });

      const data = await res.json().catch(() => ({}));

      if (
        res.ok &&
        data &&
        data.success &&
        data.message === "User created successfully"
      ) {
        if (data.token && data.user) {
          storeRegistrationData(data);
        }
        const dest = data.redirectTo || "/dashboard";
        toast.success("Registration successful — redirecting...");
        setTimeout(() => {
          if (dest === "/dashboard" || dest.includes("/dashboard")) {
            window.location.assign(dest);
          } else {
            router.replace(dest);
          }
        }, 400);
        return;
      }

      const msg = data?.error || data?.message || "Registration failed";
      setErrorMessage(msg);
    } catch {
      setErrorMessage("Registration failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-orange-50 via-orange-100 to-orange-200 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white/50 backdrop-blur-2xl p-8 shadow-xl rounded-2xl border border-white/40 text-center">
          <h2 className="text-2xl font-bold text-green-600 mb-4">
            Registration Successful!
          </h2>
          <p className="text-gray-700">
            Welcome, <span className="font-semibold">{name}</span>! You have
            successfully registered for{" "}
            <span className="font-semibold">{course}</span> ({subject}) in {grade.replace("Grade", "Year")}.
          </p>
          <p className="mt-4 text-orange-800/60">Redirecting to your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-orange-50 via-orange-100 to-orange-200 flex items-center justify-center p-4 relative overflow-hidden">

      {/* Background Decorative Blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -right-32 w-64 h-64 bg-orange-300/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-yellow-300/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-200/30 rounded-full blur-3xl"></div>
      </div>

      {/* Card Container */}
      <div className="relative z-10 w-full max-w-md bg-white/50 backdrop-blur-2xl p-8 rounded-2xl shadow-xl border border-white/40 text-center">
        <ToastContainer position="top-right" autoClose={2500} />

        {/* Profile Picture */}
        <div className="w-39 h-24 mx-auto mb-4 shadow-lg rounded-lg overflow-hidden border border-white/60 bg-white/40 backdrop-blur-lg">
          <Image
            src={picture || "/Final-Logo-bg-removed.png"}
            alt="Profile"
            width={96}
            height={96}
            className="object-cover w-full h-full"
            priority
            onError={(e) => {
              console.error("Image failed to load:", picture);
            }}
          />
        </div>

        {/* Greeting */}
        <p className="text-orange-800 mb-3">
          Hi, <span className="font-semibold">{name}</span>
        </p>

        {/* Registration Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          {errorMessage && (
            <div className="text-sm text-red-700 bg-red-100 border border-red-200 p-2 rounded-lg">
              {errorMessage}
            </div>
          )}

          {/* Name */}
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-orange-300 px-4 py-3 rounded-lg bg-white/70 backdrop-blur-md focus:ring-2 focus:ring-orange-400 focus:outline-none text-orange-900 placeholder-orange-700/40"
            required
          />

          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-orange-300 px-4 py-3 rounded-lg bg-white/70 backdrop-blur-md focus:ring-2 focus:ring-orange-400 focus:outline-none text-orange-900 placeholder-orange-700/40"
            required
          />

          {/* Mobile */}
          <input
            type="tel"
            placeholder="Mobile Number (Optional)"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            className="w-full border border-orange-300 px-4 py-3 rounded-lg bg-white/70 backdrop-blur-md focus:ring-2 focus:ring-orange-400 focus:outline-none text-orange-900 placeholder-orange-700/40"
          />

          {/* Year Selection (Value sent as Grade) */}
          <select
            title="Year"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            className="w-full border border-orange-300 px-4 py-3 rounded-lg bg-white/70 backdrop-blur-md focus:ring-2 focus:ring-orange-400 focus:outline-none text-orange-900"
            required
          >
            <option value="">Select Year</option>
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i + 1} value={`Grade ${i + 1}`}>
                {/* Visual Label says "Year", Value sent is "Grade" */}
                Year {i + 1}
              </option>
            ))}
          </select>

          {/* Course Selection */}
          <div className="text-left">
            <label htmlFor="course" className="block text-sm font-semibold text-orange-800 mb-1 ml-1">
              Course
            </label>
            <select
              id="course"
              value={course}
              onChange={handleCourseChange}
              className="w-full border border-orange-300 px-4 py-3 rounded-lg bg-white/70 backdrop-blur-md focus:ring-2 focus:ring-orange-400 focus:outline-none text-orange-900"
              required
            >
              <option value="">Select Course</option>
              {Object.keys(COURSE_SUBJECTS).map((courseName) => (
                <option key={courseName} value={courseName}>
                  {courseName}
                </option>
              ))}
            </select>
          </div>

          {/* Subject Selection (Dependent on Course) */}
          <div className={`text-left transition-all duration-300 ${course ? 'opacity-100' : 'opacity-50'}`}>
            <label htmlFor="subject" className="block text-sm font-semibold text-orange-800 mb-1 ml-1">
              Subject
            </label>
            <select
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full border border-orange-300 px-4 py-3 rounded-lg bg-white/70 backdrop-blur-md focus:ring-2 focus:ring-orange-400 focus:outline-none text-orange-900 disabled:cursor-not-allowed disabled:bg-white/40"
              required
              disabled={!course}
            >
              <option value="">Select Subject</option>
              {course && COURSE_SUBJECTS[course]?.map((sub) => (
                <option key={sub} value={sub}>
                  {sub}
                </option>
              ))}
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-lg text-white font-semibold bg-gradient-to-r from-orange-500 to-orange-400 shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Registering..." : "Complete Registration"}
          </button>
        </form>
      </div>
    </div>
  );
}