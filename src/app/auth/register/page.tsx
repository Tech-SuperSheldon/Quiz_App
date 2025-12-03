    "use client";

    import { useState, useEffect } from "react";
    import { toast, ToastContainer } from "react-toastify";
    import "react-toastify/dist/ReactToastify.css";
    import Image from "next/image";
    import { useRouter } from "next/navigation";
    import { storeRegistrationData } from "@/utils/authStorage";
    import { BASE_BACKEND_URL } from "@/config";

    // Data Mapping
    const COURSE_SUBJECTS: { [key: string]: string[] } = {
      NAPLAN: ["Reading", "Writing", "Language Conventions", "Numeracy"],
      "A-Level": ["Mathematics", "Physics", "Chemistry", "Biology", "English"],
      GCSE: [
        "Mathematics",
        "English",
        "Science (Physics, Chemistry, Biology)",
        "History",
        "Geography",
        "Computer Science",
        "Business",
        "Economics",
      ],
      ICAS: [
        "English",
        "Mathematics",
        "Science",
        "Digital Technologies",
        "Writing",
        "Spelling Bee",
      ],
      "Selective School Test": [
        "Reading",
        "Mathematical Reasoning",
        "Thinking Skills",
        "Writing",
      ],
    };

    export default function DummyRegister() {
      const router = useRouter();

      const [name, setName] = useState("");
      const [email, setEmail] = useState("");
      const [mobile, setMobile] = useState("");
      const [picture, setPicture] = useState<string | null>(null);
      const [grade, setGrade] = useState("");
      const [course, setCourse] = useState("");
      const [subject, setSubject] = useState("");
      const [isSubmitting, setIsSubmitting] = useState(false);
      const [errorMessage, setErrorMessage] = useState<string | null>(null);

      // ✅ Autofill from Google data
      useEffect(() => {
        const fetchTemp = async () => {
          try {
            const res = await fetch(`${BASE_BACKEND_URL}/api/users/user-data`);
            if (!res.ok) return;
            const json = await res.json();
            if (json?.found && json?.data) {
              const d = json.data;
              if (d.name) setName(d.name);
              if (d.email) setEmail(d.email);
              if (d.picture) setPicture(d.picture);
            }
          } catch (err) {
            console.error("Fetch user error:", err);
          }
        };
        fetchTemp();
      }, []);

      // ✅ Course Change
      const handleCourseChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCourse(e.target.value);
        setSubject("");
      };

      // ✅ ✅ ✅ FIXED SUBMIT HANDLER
      const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage(null);

        if (!name || !email || !grade || !course || !subject) {
          setErrorMessage("Please fill all required fields!");
          return;
        }

        setIsSubmitting(true);

        try {
          console.log("🔥 SUBMIT CLICKED");

          const res = await fetch(`${BASE_BACKEND_URL}/api/users/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, mobile, grade, course, subject }),
          });

          console.log("🔥 FETCH DONE:", res.status);

          const data = await res.json().catch(() => ({}));
          console.log("🔥 RESPONSE:", data);

          // ✅ SUCCESS CONDITION FIXED FOR YOUR BACKEND
          if (res.ok && data?.token) {
            console.log("✅ SUCCESS BLOCK");

            storeRegistrationData(data);

            toast.success("Registration successful — redirecting to login...");

            setTimeout(() => {
              window.location.href = "/auth/login";
            }, 1200);

            return;
          }

          console.log("❌ SUCCESS BLOCK SKIPPED");
          setErrorMessage(data?.message || "Registration failed");
          setIsSubmitting(false);
        } catch (err) {
          console.error("❌ REGISTER ERROR:", err);
          setErrorMessage("Registration failed");
          setIsSubmitting(false);
        }
      };

      return (
        <div className="min-h-screen w-full bg-gradient-to-br from-orange-50 via-orange-100 to-orange-200 flex items-center justify-center p-4">
          <ToastContainer position="top-right" autoClose={2500} />

          <div className="w-full max-w-md bg-white/60 backdrop-blur-xl p-8 rounded-2xl shadow-xl border">
            <div className="w-50 h-24 mx-auto mb-4">
              <Image
                src={picture || "/Final-Logo-bg-removed.png"}
                alt="Profile"
                width={196}
                height={96}
                className="object-cover rounded-lg"
              />
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              {errorMessage && (
                <div className="text-red-700 bg-red-100 p-2 text-sm rounded">
                  {errorMessage}
                </div>
              )}

              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full border p-3 rounded"
              />

              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border p-3 rounded"
              />

              <input
                type="tel"
                placeholder="Mobile (Optional)"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="w-full border p-3 rounded"
              />

              <select
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                required
                className="w-full border p-3 rounded"
              >
                <option value="">Select Year</option>
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i + 1} value={`Grade ${i + 1}`}>
                    Year {i + 1}
                  </option>
                ))}
              </select>

              <select
                value={course}
                onChange={handleCourseChange}
                required
                className="w-full border p-3 rounded"
              >
                <option value="">Select Course</option>
                {Object.keys(COURSE_SUBJECTS).map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>

              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
                disabled={!course}
                className="w-full border p-3 rounded"
              >
                <option value="">Select Subject</option>
                {course &&
                  COURSE_SUBJECTS[course]?.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
              </select>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-orange-500 text-white py-3 rounded"
              >
                {isSubmitting ? "Registering..." : "Complete Registration"}
              </button>
            </form>
          </div>
        </div>
      );
    }


