"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function Settings() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    mobile: "",
    grade: "",
    course: "",
    picture: "",
  });

  const router = useRouter();

  // ✅ Load user data from "auth-client" cookie
  useEffect(() => {
    try {
      const storedData = Cookies.get("auth-client");
      if (storedData) {
        const parsed = JSON.parse(storedData);
        setUser({
          name: parsed.name || "",
          email: parsed.email || "",
          mobile: parsed.mobile || "",
          grade: parsed.grade || "",
          course: parsed.course || "",
          picture: parsed.picture || "",
        });
      }
    } catch (err) {
      console.error("Failed to load user data:", err);
    }
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    // ✅ Save updated data back to cookie
    Cookies.set("auth-client", JSON.stringify(user), {
      expires: 7,
      sameSite: "lax",
    });

    alert("Settings updated successfully!");
    router.push("/dashboard");
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white/95 p-6 shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Profile Settings</h2>

      {user.picture && (
        <div className="flex justify-center mb-4">
          <img
            src={user.picture}
            alt="Profile"
            className="w-24 h-24 rounded-full shadow-md"
          />
        </div>
      )}

      <form className="space-y-4" onSubmit={handleSave}>
        <input
          type="text"
          placeholder="Full Name"
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
          className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          required
        />

        <input
          type="tel"
          placeholder="Mobile Number"
          value={user.mobile}
          onChange={(e) => setUser({ ...user, mobile: e.target.value })}
          className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        />

        <input
          type="text"
          placeholder="Grade"
          value={user.grade}
          onChange={(e) => setUser({ ...user, grade: e.target.value })}
          className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        />

        <input
          type="text"
          placeholder="Course"
          value={user.course}
          onChange={(e) => setUser({ ...user, course: e.target.value })}
          className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
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
