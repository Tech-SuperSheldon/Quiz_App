"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function Settings() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [className, setClassName] = useState("");
  const [exam, setExam] = useState("");

  const router = useRouter();

  // Load user data from cookies
  useEffect(() => {
    setName(Cookies.get("student_name") || "");
    setEmail(Cookies.get("student_email") || "");
    setMobile(Cookies.get("student_mobile") || "");
    setClassName(Cookies.get("student_class") || "");
    setExam(Cookies.get("student_exam") || "");
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    // Save updated data to cookies
    Cookies.set("student_name", name, { expires: 7 });
    Cookies.set("student_email", email, { expires: 7 });
    Cookies.set("student_mobile", mobile, { expires: 7 });
    Cookies.set("student_class", className, { expires: 7 });
    Cookies.set("student_exam", exam, { expires: 7 });

    alert("Settings updated successfully!");
    router.push("/dashboard"); // Optional: redirect back
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white/95 p-6 shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Settings</h2>
      <form className="space-y-4" onSubmit={handleSave}>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          required
        />
        <input
          type="tel"
          placeholder="Mobile Number"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          required
        />
        <select
          title="Class"
          value={className}
          onChange={(e) => setClassName(e.target.value)}
          className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
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
          placeholder="Exam"
          value={exam}
          onChange={(e) => setExam(e.target.value)}
          className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          required
        />

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
