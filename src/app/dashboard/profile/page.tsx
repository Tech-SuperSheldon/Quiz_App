// app/dashboard/profile/page.tsx
"use client";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation"; // Import useRouter for redirection
export default function ProfilePage() {
  const [studentName, setStudentName] = useState("N/A");
  const [studentClass, setStudentClass] = useState("N/A");
  const [studentEmail, setStudentEmail] = useState("N/A");
  const [studentMobile, setStudentMobile] = useState("N/A"); // Assuming you'll add this to cookies
  const [studentExam, setStudentExam] = useState("N/A"); // Assuming you'll add this to cookies
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in before fetching profile data
    const token = Cookies.get("token");
    if (!token) {
      router.replace("/auth/login"); // Redirect to login if not authenticated
      return;
    }

    // Retrieve data from cookies
    setStudentName(Cookies.get("student_name") || "N/A");
    setStudentClass(Cookies.get("student_class") || "N/A");
    setStudentEmail(Cookies.get("student_email") || "N/A");

    // IMPORTANT: You need to ensure 'student_mobile' and 'student_exam'
    // are also being set in cookies in your Register component if you want them here.
    setStudentMobile(Cookies.get("student_mobile") || "N/A");
    setStudentExam(Cookies.get("student_exam") || "N/A");
  }, [router]);

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-xl mt-8">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">
        Your Profile
      </h1>

      <div className="space-y-4">
        <ProfileDetail label="Full Name" value={studentName} />
        <ProfileDetail label="Email Address" value={studentEmail} />
        <ProfileDetail label="Mobile Number" value={studentMobile} />
        <ProfileDetail label="Class" value={`Class ${studentClass}`} />
        <ProfileDetail label="Exam" value={studentExam} />
      </div>
    </div>
  );
}

// Helper component for displaying profile details
function ProfileDetail({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center py-3 border-b border-gray-100 last:border-b-0">
      <p className="w-full sm:w-1/3 text-lg font-medium text-gray-600">
        {label}:
      </p>
      <p className="w-full sm:w-2/3 text-lg text-gray-800 break-words">
        {value}
      </p>
    </div>
  );
}
