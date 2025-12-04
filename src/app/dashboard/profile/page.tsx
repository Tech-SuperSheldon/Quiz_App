"use client";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const [studentName, setStudentName] = useState("N/A");
  const [studentClass, setStudentClass] = useState("N/A");
  const [studentEmail, setStudentEmail] = useState("N/A");
  const [studentMobile, setStudentMobile] = useState("N/A"); 
  const [studentExam, setStudentExam] = useState("N/A");
  const router = useRouter();

  useEffect(() => {
    const authCookie = Cookies.get("auth-client");

    if (!authCookie) {
      router.replace("/auth/login");
      return;
    }

    try {
    
      const data = JSON.parse(authCookie);
      setStudentName(data.name || "N/A");
      setStudentEmail(data.email || "N/A");
      setStudentClass(data.year || "N/A");

      if (Array.isArray(data.course)) {
        setStudentExam(data.course.join(", "));
      } else {
        setStudentExam(data.course || "N/A");
      }
      setStudentMobile(data.mobile || "N/A");

    } catch (error) {
      console.error("Failed to parse auth cookie:", error);
      router.replace("/auth/login");
    }

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
        {/* Adjusted label slightly since data comes as 'Grade 10' */}
        <ProfileDetail label="Class / Year" value={studentClass} />
        <ProfileDetail label="Exam / Course" value={studentExam} />
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