"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function Register() {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [className, setClassName] = useState("");
  const [exam, setExam] = useState("");
  const [email, setEmail] = useState("");

  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // ✅ Save all user data in cookies
    Cookies.set("token", "logged_in", { expires: 7 });
    Cookies.set("student_name", name, { expires: 7 });
    Cookies.set("student_class", className, { expires: 7 });
    Cookies.set("student_email", email, { expires: 7 });
    Cookies.set("student_mobile", mobile, { expires: 7 }); // ✅ added
    Cookies.set("student_exam", exam, { expires: 7 });     // ✅ added

    // Redirect to dashboard
    router.push("/dashboard/profile"); // 🔄 directly go to profile after register
  };

  return (
    <div className="max-w-md mx-auto mt-30 bg-white/95 p-8 shadow-xl rounded-xl border border-gray-200">
      <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-800">
        Join Us Today
      </h2>
      <form className="space-y-5" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none text-gray-700 placeholder-gray-400 transition duration-200 ease-in-out"
          required
        />
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none text-gray-700 placeholder-gray-400 transition duration-200 ease-in-out"
          required
        />
        <input
          type="tel"
          placeholder="Mobile Number"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none text-gray-700 placeholder-gray-400 transition duration-200 ease-in-out"
          required
        />
        <select
          title="Class"
          value={className}
          onChange={(e) => setClassName(e.target.value)}
          className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none text-gray-700 placeholder-gray-400 transition duration-200 ease-in-out bg-white"
          required
        >
          <option value="">Select Class</option>
          <option value="9">Class 9</option>
          <option value="10">Class 10</option>
          <option value="11">Class 11</option>
          <option value="12">Class 12</option>
        </select>
        <input
          type="text"
          placeholder="Exam (e.g., JEE, NEET, Boards)"
          value={exam}
          onChange={(e) => setExam(e.target.value)}
          className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none text-gray-700 placeholder-gray-400 transition duration-200 ease-in-out"
          required
        />

        <button
          type="submit"
          className="w-full py-3 rounded-lg text-white font-semibold transition duration-300 ease-in-out bg-[#e66e37] shadow-[0_4px_10px_rgba(230,110,55,0.4)] hover:bg-[#e68355]"
        >
          Register
        </button>
      </form>
    </div>
  );
}
