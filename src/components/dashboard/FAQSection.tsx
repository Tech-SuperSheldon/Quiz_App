"use client";
import { useState } from "react";
import ScrollAnimation from "./ScrollAnimation";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "When will Room be launched?",
      answer:
        "We are working hard to launch in the coming months. By joining the waitlist, you'll be the first to know and will receive an exclusive invitation to play.",
    },
    {
      question: "Is the game free to play?",
      answer:
        "Yes, Room is free to play! We offer both free and premium features to enhance your experience.",
    },
    {
      question: "Can I challenge my friends directly?",
      answer:
        "Absolutely! You can create private rooms and invite your friends to compete directly in your favorite categories.",
    },
  ];

  return (
    <section id="faq" className="py-16 px-6 bg-gray-50">
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

