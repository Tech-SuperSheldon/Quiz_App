"use client";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();

  // Toggle for Edit Mode
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  // We use a single object for the form data to make updating easier
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    year: "",     // maps to studentClass
    course: "",   // maps to studentExam
  });

  // Load data on mount
  useEffect(() => {
    const authCookie = Cookies.get("auth-client");

    if (!authCookie) {
      router.replace("/auth/login");
      return;
    }

    try {
      const data = JSON.parse(authCookie);

      // Parse course (handle array vs string)
      let courseStr = "N/A";
      if (Array.isArray(data.course)) {
        courseStr = data.course.join(", ");
      } else if (data.course) {
        courseStr = data.course;
      }

      // Initialize form state
      setFormData({
        name: data.name || "",
        email: data.email || "",
        mobile: data.mobile || "",
        year: data.year || "",
        course: courseStr,
      });

    } catch (error) {
      console.error("Failed to parse auth cookie:", error);
      router.replace("/auth/login");
    }
  }, [router]);

  // Handle Input Change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle Save
  const handleSave = async () => {
    setLoading(true);

    try {
      // 1. Get the CURRENT cookie data (we need the token/userId/exp)
      const existingCookieStr = Cookies.get("auth-client");
      if (!existingCookieStr) throw new Error("No session found");

      const existingData = JSON.parse(existingCookieStr);

      // 2. Prepare updated object
      // Note: We convert course string back to array if your backend expects an array
      const updatedData = {
        ...existingData, // Keep token, userId, exp, etc.
        name: formData.name,
        email: formData.email,
        mobile: formData.mobile,
        year: formData.year,
        course: [formData.course], // Wrapping back in array to match original structure
      };

      // 3. TODO: SEND TO BACKEND API
      // await axios.put('/api/student/update', updatedData); 
      // console.log("Simulating backend update...");
      await new Promise(resolve => setTimeout(resolve, 500)); // Fake delay

      // 4. Update the Cookie with new data
      Cookies.set("auth-client", JSON.stringify(updatedData), { expires: 7 }); // resetting expiry if needed

      // 5. Turn off edit mode
      setIsEditing(false);
      alert("Profile updated successfully!");

    } catch (error) {
      console.error("Update failed", error);
      alert("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-xl mt-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-extrabold text-gray-900">
          Your Profile
        </h1>
        <button
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          disabled={loading}
          className={`mt-4 md:mt-0 px-8 py-3 rounded-xl font-bold text-white transition-all duration-300 shadow-sm hover:shadow-md flex items-center ${
            isEditing
              ? "bg-green-600 text-white hover:bg-green-700"
              : "bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600"
          }`}
        >
          {loading ? "Saving..." : isEditing ? "Save Changes" : "Edit Profile"}
        </button>
      </div>

      <div className="space-y-4">
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
          isEditing={isEditing} // Often email is read-only, set to false if needed
          onChange={handleChange} 
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
          isEditing={isEditing} 
          onChange={handleChange} 
        />
        <ProfileInput 
          label="Exam / Course" 
          name="course" 
          value={formData.course} 
          isEditing={isEditing} 
          onChange={handleChange} 
        />
      </div>

      {isEditing && (
        <div className="mt-6 flex justify-end">
             <button
              onClick={() => setIsEditing(false)}
              className="text-gray-500 hover:text-gray-700 font-medium mr-4"
            >
              Cancel
            </button>
        </div>
      )}
    </div>
  );
}

// Reusable Component for Display OR Input
interface ProfileInputProps {
  label: string;
  name: string;
  value: string;
  isEditing: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function ProfileInput({ label, name, value, isEditing, onChange }: ProfileInputProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center py-3 border-b border-gray-100 last:border-b-0">
      <p className="w-full sm:w-1/3 text-lg font-medium text-gray-600">
        {label}:
      </p>
      <div className="w-full sm:w-2/3">
        {isEditing ? (
          <input
            type="text"
            name={name}
            value={value}
            onChange={onChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        ) : (
          <p className="text-lg text-gray-800 break-words font-medium">
            {value || <span className="text-gray-400 italic">Not Set</span>}
          </p>
        )}
      </div>
    </div>
  );
}