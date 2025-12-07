"use client";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { BASE_BACKEND_URL } from "@/config";

// --- Configuration Options ---
const COURSE_OPTIONS = [
  "NAPLAN",
  "A-Level",
  "GCSE",
  "ICAS",
  "Selective School Test"
];

// Use objects to map Label (Year) to Value (Grade)
const CLASS_OPTIONS = [
  { label: "Year 1", value: "Grade 1" },
  { label: "Year 2", value: "Grade 2" },
  { label: "Year 3", value: "Grade 3" },
  { label: "Year 4", value: "Grade 4" },
  { label: "Year 5", value: "Grade 5" },
  { label: "Year 6", value: "Grade 6" },
  { label: "Year 7", value: "Grade 7" },
  { label: "Year 8", value: "Grade 8" },
  { label: "Year 9", value: "Grade 9" },
  { label: "Year 10", value: "Grade 10" },
  { label: "Year 11", value: "Grade 11" },
  { label: "Year 12", value: "Grade 12" },
];

const SUBJECT_MAPPING: Record<string, string[]> = {
  "NAPLAN": ["Reading", "Writing", "Language Conventions", "Numeracy"],
  "A-Level": ["Mathematics", "Physics", "Chemistry", "Biology", "English"],
  "GCSE": [
    "Mathematics", "English", "Science (Physics, Chemistry, Biology)",
    "History", "Geography", "Computer Science", "Business", "Economics",
  ],
  "ICAS": [
    "English", "Mathematics", "Science", "Digital Technologies", "Writing", "Spelling Bee",
  ],
  "Selective School Test": [
    "Reading", "Mathematical Reasoning", "Thinking Skills", "Writing",
  ],
};

// --- Reusable Component ---
interface OptionObj {
  label: string;
  value: string;
}

interface ProfileInputProps {
  label: string;
  name: string;
  value: string;
  displayValue?: string;
  isEditing: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  disabled?: boolean;
  type?: "text" | "select"; 
  options?: string[] | OptionObj[]; 
}

function ProfileInput({ 
  label, 
  name, 
  value, 
  displayValue, 
  isEditing, 
  onChange, 
  disabled = false, 
  type = "text", 
  options = [] 
}: ProfileInputProps) {

  const textToShow = displayValue || value;

  return (
    <div className="flex flex-col md:flex-row md:items-center py-4 border-b border-gray-100 last:border-b-0">
      <p className="w-full md:w-1/3 text-lg font-semibold text-gray-600 mb-2 md:mb-0">
        {label}:
      </p>
      <div className="w-full md:w-2/3">
        {isEditing ? (
          type === "select" ? (
            <div className="relative">
              <select
                name={name}
                value={value}
                onChange={onChange}
                disabled={disabled}
                className={`w-full p-3 border border-gray-300 rounded-lg appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all text-gray-800 ${disabled ? 'bg-gray-100 cursor-not-allowed opacity-60' : ''}`}
              >
                <option value="" disabled>Select {label}</option>
                {options.map((opt: any) => {
                  const optLabel = typeof opt === 'string' ? opt : opt.label;
                  const optValue = typeof opt === 'string' ? opt : opt.value;
                  return (
                    <option key={optValue} value={optValue}>
                      {optLabel}
                    </option>
                  );
                })}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
              </div>
            </div>
          ) : (
            <input
              type="text"
              name={name}
              value={value}
              onChange={onChange}
              disabled={disabled}
              className={`w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all ${
                disabled ? "bg-gray-100 text-gray-500 cursor-not-allowed" : "text-gray-800"
              }`}
              placeholder={`Enter your ${label.toLowerCase()}`}
            />
          )
        ) : (
          <p className="text-lg text-gray-800 break-words font-medium pl-3">
            {textToShow && textToShow !== "N/A" ? textToShow : <span className="text-gray-400 italic">Not Set</span>}
          </p>
        )}
      </div>
    </div>
  );
}

export default function ProfilePage() {
  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    year: "",     
    course: "",
    subject: "",   
  });

  useEffect(() => {
    const authCookie = Cookies.get("auth-client");

    if (!authCookie) {
      router.replace("/auth/login");
      return;
    }

    try {
      const data = JSON.parse(authCookie);

      let courseStr = "";
      if (Array.isArray(data.course)) {
        courseStr = data.course[0] || ""; 
      } else if (data.course) {
        courseStr = data.course;
      }

      setFormData({
        name: data.name || "",
        email: data.email || "",
        mobile: data.mobile || "",
        year: data.year || "", 
        course: courseStr,
        subject: data.subject || "", 
      });

    } catch (error) {
      console.error("Failed to parse auth cookie:", error);
      router.replace("/auth/login");
    }
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      const newData = { ...prev, [name]: value };

      if (name === "course") {
        newData.subject = ""; 
      }

      return newData;
    });
  };

  const handleSave = async () => {
    setLoading(true);

    try {
      const existingCookieStr = Cookies.get("auth-client");
      if (!existingCookieStr) throw new Error("No session found");

      const existingData = JSON.parse(existingCookieStr);
      const token = existingData.token; 

      const courseArray = formData.course ? [formData.course] : [];

      const payload = {
        name: formData.name,
        mobile: formData.mobile,
        year: formData.year,
        course: courseArray, 
        subject: formData.subject, 
      };

      const response = await fetch(`${BASE_BACKEND_URL}/api/profile/update`, {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}` 
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to update profile");
      }

      // 1. UPDATE COOKIE
      const updatedCookieData = {
        ...existingData,
        name: formData.name,
        mobile: formData.mobile,
        year: formData.year,
        course: courseArray,
        subject: formData.subject, 
      };
      Cookies.set("auth-client", JSON.stringify(updatedCookieData), { expires: 7 });

      // 2. UPDATE LOCAL STORAGE "authData"
      // We read the existing localStorage first to preserve other fields (like userId, token)
      const storedAuthData = localStorage.getItem("authData");
      if (storedAuthData) {
        try {
            const parsedAuthData = JSON.parse(storedAuthData);

            const updatedAuthData = {
                ...parsedAuthData, // Keep existing token, email, userId
                name: formData.name,
                mobile: formData.mobile,
                year: formData.year,
                course: courseArray,
                subject: formData.subject
            };

            localStorage.setItem("authData", JSON.stringify(updatedAuthData));
            console.log("Local Storage 'authData' updated successfully");
        } catch (err) {
            console.error("Error updating local storage:", err);
        }
      }

      setIsEditing(false);
      alert("Profile updated successfully!");

    } catch (error: any) {
      console.error("Update failed", error);
      alert(error.message || "Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const currentSubjects = formData.course ? SUBJECT_MAPPING[formData.course] || [] : [];

  const displayYearLabel = CLASS_OPTIONS.find(opt => opt.value === formData.year)?.label || formData.year;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-8 bg-white shadow-2xl rounded-2xl">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 pb-4 border-b border-gray-200">
        <div>
             <h1 className="text-4xl font-extrabold text-gray-900">
             Your Profile
             </h1>
             <p className="text-gray-500 mt-2">Manage your personal information</p>
        </div>

        <button
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          disabled={loading}
          className={`mt-4 md:mt-0 px-8 py-3 rounded-xl font-bold text-white transition-all duration-300 shadow-sm hover:shadow-md flex items-center ${
            loading ? "opacity-70 cursor-not-allowed" : ""
          } ${
            isEditing
              ? "bg-green-600 hover:bg-green-700" 
              : "bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600"
          }`}
        >
          {loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Saving...
            </>
          ) : isEditing ? (
            "Save Changes"
          ) : (
            "Edit Profile"
          )}
        </button>
      </div>

      <div className="space-y-2 bg-gray-50 p-6 rounded-xl border border-gray-100">

        <ProfileInput 
          label="Full Name" 
          name="name" 
          value={formData.name} 
          isEditing={isEditing} 
          onChange={handleChange} 
        />

        <ProfileInput 
          label="Email Address" 
          name="email" 
          value={formData.email} 
          isEditing={isEditing} 
          onChange={handleChange}
          disabled={true} 
        />

        <ProfileInput 
          label="Mobile Number" 
          name="mobile" 
          value={formData.mobile} 
          isEditing={isEditing} 
          onChange={handleChange} 
        />

        <ProfileInput 
          label="Class / Year" 
          name="year" 
          value={formData.year} 
          displayValue={displayYearLabel} 
          isEditing={isEditing} 
          onChange={handleChange} 
          type="select"           
          options={CLASS_OPTIONS} 
        />

        <ProfileInput 
          label="Exam / Course" 
          name="course" 
          value={formData.course} 
          isEditing={isEditing} 
          onChange={handleChange} 
          type="select"            
          options={COURSE_OPTIONS} 
        />

        <ProfileInput 
          label="Subject" 
          name="subject" 
          value={formData.subject} 
          isEditing={isEditing} 
          onChange={handleChange} 
          type="select"            
          options={currentSubjects} 
          disabled={!formData.course} 
        />
      </div>

      {isEditing && (
        <div className="mt-8 flex justify-end border-t border-gray-200 pt-6">
             <button
              onClick={() => {
                setIsEditing(false);
                const authCookie = Cookies.get("auth-client");
                if(authCookie) {
                    const data = JSON.parse(authCookie);
                    let courseStr = "";
                    if (Array.isArray(data.course)) courseStr = data.course[0] || "";
                    else if (data.course) courseStr = data.course;

                    setFormData(prev => ({
                      ...prev, 
                      name: data.name || "", 
                      mobile: data.mobile || "", 
                      year: data.year || "",
                      course: courseStr,
                      subject: data.subject || ""
                    }))
                }
              }}
              disabled={loading}
              className="px-6 py-2 rounded-lg text-gray-600 hover:text-gray-800 hover:bg-gray-100 font-semibold transition-colors mr-2"
            >
              Cancel
            </button>
        </div>
      )}
    </div>
  );
}