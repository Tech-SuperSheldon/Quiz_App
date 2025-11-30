"use client";

import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { storeRegistrationData } from "@/utils/authStorage";


const BASE_BACKEND_URL = "https://92c52865-c657-478a-b2e0-625fc822f55b-00-23crg2t5cyi67.pike.replit.dev:5000";

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

    // added 'subject' to validation
    if (!name || !email || !grade || !course || !subject) {
      setErrorMessage("Please fill all required fields!");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch(`${BASE_BACKEND_URL}/api/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },

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
      <div className="max-w-md mx-auto mt-20 bg-white/95 p-8 shadow-xl rounded-xl border border-gray-200 text-center">
        <h2 className="text-2xl font-bold text-green-600 mb-4">
          Registration Successful!
        </h2>
        <p className="text-gray-700">
          Welcome, <span className="font-semibold">{name}</span>! You have
          successfully registered for{" "}
          <span className="font-semibold">{course}</span> ({subject}) in {grade}.
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
          onError={(e) => {
            console.error("Image failed to load:", picture);
          }}
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

        {/* Name */}
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          required
        />

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          required
        />

        {/* Mobile */}
        <input
          type="tel"
          placeholder="Mobile Number (Optional)"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        />

        {/* Grade Selection */}
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

        {/* Course Selection */}
        <div>
            <label htmlFor="course" className="block text-left font-semibold text-gray-700 mb-1">
                Course
            </label>
            <select
            id="course"
            value={course}
            onChange={handleCourseChange}
            className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white"
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
        <div className={`transition-all duration-300 ${course ? 'opacity-100' : 'opacity-50'}`}>
            <label htmlFor="subject" className="block text-left font-semibold text-gray-700 mb-1">
                Subject
            </label>
            <select
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
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
          className="w-full py-3 rounded-lg text-white font-semibold transition duration-300 ease-in-out bg-[#e66e37] shadow-[0_4px_10px_rgba(230,110,55,0.4)] hover:bg-[#e68355] disabled:opacity-70 disabled:cursor-not-allowed"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Registering..." : "Complete Registration"}
        </button>
      </form>
    </div>
  );
}
