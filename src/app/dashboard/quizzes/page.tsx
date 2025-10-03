"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { quizData } from "@/app/data/quizData";

export default function QuizzesPage() {
  const router = useRouter();

  const classes = [...new Set(quizData.map((q) => q.class))];
  const exams = [...new Set(quizData.map((q) => q.exam))];
  const topics = [...new Set(quizData.map((q) => q.topic))];

  const [selectedClass, setSelectedClass] = useState(classes[0]);
  const [selectedExam, setSelectedExam] = useState(exams[0]);
  const [selectedTopic, setSelectedTopic] = useState(topics[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const quiz = quizData.find(
      (q) =>
        q.class === selectedClass &&
        q.exam === selectedExam &&
        q.topic === selectedTopic
    );
    if (!quiz) return alert("No quiz found!");
    router.push(`/dashboard/quizzes/${quiz.id}`);
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-[calc(100vh-48px)] p-6 bg-gradient-to-br from-indigo-50 to-purple-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md border border-gray-100">
        <h1 className="text-3xl font-bold mb-6 text-center">Choose Your Quiz</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { label: "Class", value: selectedClass, setter: setSelectedClass, options: classes },
            { label: "Exam", value: selectedExam, setter: setSelectedExam, options: exams },
            { label: "Topic", value: selectedTopic, setter: setSelectedTopic, options: topics },
          ].map((field) => (
            <div key={field.label} className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">{field.label}</label>
              <select
                aria-label={field.label}
                value={field.value}
                onChange={(e) => field.setter(e.target.value)}
                className="block w-full pl-4 pr-10 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg appearance-none bg-white"
              >
                {field.options.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
              <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
            </div>
          ))}
          <button className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 transition-all duration-200">
            Start Quiz
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
}
