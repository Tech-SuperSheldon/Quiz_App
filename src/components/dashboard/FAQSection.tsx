"use client";
import { useState } from "react";
import ScrollAnimation from "./ScrollAnimation";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "What types of exam-prep quizzes does LevelUp Quiz offer?",
      answer: `LevelUp Quiz provides practice quizzes for a wide range of exams, including NAPLAN, SAT, ACT, GCSE, IELTS, and more. Each quiz is designed to match the exam style, difficulty level, and question format to help students prepare effectively.`,
    },
    {
      question: "Are the quizzes based on real exam formats?",
      answer: `Yes! All our quizzes are created to closely follow the official structure and standards of each exam. This includes question types, timing style, difficulty progression, and subject areas—so students can practice in a realistic exam-like environment.`,
    },
    {
      question: "Can I track my improvement over time?",
      answer: `Yes! LevelUp Quiz includes built-in progress tracking so you can monitor your scores, accuracy, and improvement across different exams like NAPLAN and SAT. This helps you identify strengths and target areas that need more practice.`,
    },
  ];

  return (
    <section id="faq" className="py-16 px-6 ">
      <div className="max-w-4xl mx-auto">
        <ScrollAnimation direction="up" delay={0.1}>
          <h2 className="text-4xl font-bold text-black mb-12 text-center">
            Frequently Asked Questions
          </h2>
        </ScrollAnimation>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <ScrollAnimation key={index} direction="up" delay={0.2 + index * 0.1}>
            <div
              className={`border-2 rounded-lg overflow-hidden transition-all ${
                openIndex === index
                  ? "border-orange-500 shadow-lg"
                  : "border-gray-200"
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                className="w-full px-6 py-4 flex items-center justify-between bg-white hover:bg-gray-50 transition"
              >
                <span className="font-semibold text-black text-left">
                  {faq.question}
                </span>
                <span className="text-orange-500 text-xl">
                  {openIndex === index ? "▲" : "▼"}
                </span>
              </button>
              {openIndex === index && (
                <div className="px-6 py-4 bg-white border-t border-orange-500">
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  );
}

