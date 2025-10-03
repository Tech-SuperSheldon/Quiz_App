"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { quizData } from "@/app/data/quizData";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";

type Question = {
  questionId: string;
  questionText: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
};

type Quiz = {
  id: string;
  class: string;
  exam: string;
  topic: string;
  questions: Question[];
};

export default function QuizPage() {
  const params = useParams();
  const router = useRouter();
  const quizId = params.quizId as string;

  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  useEffect(() => {
    const q = quizData.find((item) => item.id === quizId);
    if (!q) router.push("/dashboard/quizzes");
    else setQuiz(q);
  }, [quizId, router]);

  if (!quiz) return <p className="p-6 text-center">Loading Quiz...</p>;

  const question = quiz.questions[currentIndex];

  const handleOptionClick = (opt: string) => {
    if (!showAnswer) {
      setSelectedOption(opt);
      setShowAnswer(true);
      if (opt === question.correctAnswer) setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex === quiz.questions.length - 1) setQuizFinished(true);
    else {
      setCurrentIndex(currentIndex + 1);
      setSelectedOption(null);
      setShowAnswer(false);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setSelectedOption(null);
      setShowAnswer(false);
    }
  };

  const handleRetake = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setShowAnswer(false);
    setScore(0);
    setQuizFinished(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-48px)] p-6 bg-gradient-to-br from-indigo-50 to-purple-100">
      <motion.div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-2xl border border-gray-100">
        {!quizFinished ? (
          <AnimatePresence mode="wait">
            <motion.div
              key={question.questionId}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
              <h2 className="text-xl font-semibold mb-4">
                Question {currentIndex + 1} / {quiz.questions.length}
              </h2>
              <p className="mb-6 text-gray-700">{question.questionText}</p>

              <div className="space-y-3">
                {question.options.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => handleOptionClick(opt)}
                    disabled={showAnswer}
                    className={`w-full p-4 border rounded-lg text-left transition
                      ${
                        selectedOption === opt
                          ? showAnswer
                            ? opt === question.correctAnswer
                              ? "border-green-500 bg-green-50"
                              : "border-red-500 bg-red-50"
                            : "border-indigo-500 bg-indigo-50"
                          : "border-gray-200 bg-white hover:border-indigo-300 hover:bg-indigo-50"
                      }`}
                  >
                    <div className="flex justify-between items-center">
                      {opt}
                      {showAnswer && selectedOption === opt && (
                        <>
                          {opt === question.correctAnswer ? (
                            <CheckCircleIcon className="h-5 w-5 text-green-500" />
                          ) : (
                            <XCircleIcon className="h-5 w-5 text-red-500" />
                          )}
                        </>
                      )}
                    </div>
                  </button>
                ))}
              </div>

              {showAnswer && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-blue-800 rounded shadow"
                >
                  <strong>Explanation:</strong> {question.explanation}
                </motion.div>
              )}

              <div className="flex justify-between mt-6">
                <button
                  onClick={handlePrev}
                  disabled={currentIndex === 0 || !showAnswer}
                  className={`px-5 py-2 rounded-lg ${
                    currentIndex === 0 || !showAnswer
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
                  }`}
                >
                  Previous
                </button>

                <button
                  onClick={handleNext}
                  disabled={!showAnswer}
                  className={`px-5 py-2 rounded-lg ${
                    !showAnswer
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-indigo-600 text-white hover:bg-indigo-700"
                  }`}
                >
                  {currentIndex === quiz.questions.length - 1 ? "Finish Quiz" : "Next"}
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-10">
            <h2 className="text-3xl font-bold mb-4">Quiz Finished!</h2>
            <p className="text-xl mb-6">
              You scored {score} / {quiz.questions.length}
            </p>
            <div className="flex justify-center gap-4">
              <button onClick={handleRetake} className="bg-indigo-600 text-white py-3 px-6 rounded hover:bg-indigo-700">
                Retake
              </button>
              <button onClick={() => router.push("/dashboard/quizzes")} className="bg-gray-200 text-gray-800 py-3 px-6 rounded hover:bg-gray-300">
                Back
              </button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
