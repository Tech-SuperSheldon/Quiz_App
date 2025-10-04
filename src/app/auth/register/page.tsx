"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function DummyRegister() {
  const router = useRouter();

  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("john.doe@example.com");
  const [mobile, setMobile] = useState("");
  const [grade, setGrade] = useState("");
  const [course, setCourse] = useState<"NAPLAN" | "ICAS" | "">("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !grade || !course) {
      alert("Please fill all required fields!");
      return;
    }

    console.log({ name, email, mobile, grade, course });
    setSubmitted(true);

    // Redirect to dashboard after 2 seconds
    setTimeout(() => {
      router.push("/dashboard");
    }, 2000);
  };

  if (submitted) {
    return (
      <div className="max-w-md mx-auto mt-20 bg-white/95 p-8 shadow-xl rounded-xl border border-gray-200 text-center">
        <h2 className="text-2xl font-bold text-green-600 mb-4">
          Registration Successful!
        </h2>
        <p className="text-gray-700">
          Welcome, <span className="font-semibold">{name}</span>! You have
          successfully registered for <span className="font-semibold">{course}</span> in {grade}.
        </p>
        <p className="mt-4 text-gray-500">Redirecting to your dashboard...</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-20 bg-white/95 p-8 shadow-xl rounded-xl border border-gray-200 text-center">
      {/* Profile Picture */}
      <div className="w-24 h-24 mx-auto mb-4 shadow rounded-full overflow-hidden">
        <Image
          src="/Final-Logo-bg-removed.png"
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
        <label htmlFor="course" className="block text-left font-semibold text-gray-700">
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
        >
          Complete Registration
        </button>
      </form>
    </div>
  );
}
