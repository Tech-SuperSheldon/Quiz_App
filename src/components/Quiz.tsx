"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getAuthData } from "@/utils/authStorage";
import Cookies from "js-cookie";
import Image from "next/image";

interface Question {
  _id: string;
  question_name: string;
  question_options: string[];
  correct_answer: string;
  explanation: string;
  question_category: string;
  difficulty_level: string;
  stage_number: number;
  course_type: string;
  time_spent: number;
  user_answer: string | null;
  is_correct: boolean;
  question_attempted: boolean;
}

interface QuizResult {
  is_correct: boolean;
  correct_answer: string;
  explanation: string;
  question_id: string;
  user_answer: string;
  time_spent: number;
}

export default function Quiz() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState<QuizResult | null>(null);
  const [timeSpent, setTimeSpent] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [isGeneratingMore, setIsGeneratingMore] = useState(false);
  const [questionResults, setQuestionResults] = useState<{
    [key: number]: "correct" | "incorrect" | "unanswered";
  }>({});
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: string }>({});

  const currentQuestion = questions[currentQuestionIndex];

  // Timer
  useEffect(() => {
    if (quizStarted && !showResult) {
      const timer = setInterval(() => setTimeSpent((prev) => prev + 1), 1000);
      return () => clearInterval(timer);
    }
  }, [quizStarted, showResult]);

  // Fetch questions
  const generateQuestions = async (stageNumber: number = 1) => {
    try {
      let authData = getAuthData();
      let token = authData?.token;
      let userId = authData?.userId;

      if (!token || !userId) {
        const cookie = Cookies.get("auth-client");
        if (cookie) {
          const parsed = JSON.parse(cookie);
          token = token || parsed.token;
          userId = userId || parsed.userId;
        }
      }

      const headers: any = { "Content-Type": "application/json" };
      if (token) headers.Authorization = `Bearer ${token}`;

      const res = await fetch(
        "https://levelupbackend.supersheldon.online/api/questions/generate",
        {
          method: "POST",
          headers,
          body: JSON.stringify({
            user_id: userId,
            course_type: "Naplap",
            stage_number: stageNumber,
            grade: 5,
            num_questions: 10,
          }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error);

      return data.questions || [];
    } catch (err) {
      console.error("❌ Generation error:", err);
      return [];
    }
  };

  // Start quiz
  const startQuiz = async () => {
    setIsLoading(true);
    const q = await generateQuestions();
    if (q.length > 0) {
      setQuestions(q);
      setQuizStarted(true);
    } else {
      alert("Unable to load questions");
    }
    setIsLoading(false);
  };

  // Submit answer
  const submitAnswer = async () => {
    if (!selectedAnswer) return alert("Please select an answer");

    // Safe ID validation (no bson)
    if (!currentQuestion._id || currentQuestion._id.length < 10) {
      alert("Invalid question ID");
      return;
    }

    setIsSubmitting(true);

    try {
      let authData = getAuthData();
      let token = authData?.token;
      let userId = authData?.userId;

      if (!token || !userId) {
        const cookie = Cookies.get("auth-client");
        if (cookie) {
          const parsed = JSON.parse(cookie);
          token = token || parsed.token;
          userId = userId || parsed.userId;
        }
      }

      const headers: any = { "Content-Type": "application/json" };
      if (token) headers.Authorization = `Bearer ${token}`;

      const res = await fetch(
        "https://levelupbackend.supersheldon.online/api/questions/submit-answer",
        {
          method: "POST",
          headers,
          body: JSON.stringify({
            question_id: currentQuestion._id,
            user_answer: selectedAnswer,
            time_spent: timeSpent,
            token,
          }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error);

      setResult({
        is_correct: data.is_correct,
        correct_answer: data.correct_answer,
        explanation: data.explanation,
        question_id: currentQuestion._id,
        user_answer: selectedAnswer,
        time_spent: timeSpent,
      });

      setQuestionResults((p) => ({
        ...p,
        [currentQuestionIndex]: data.is_correct ? "correct" : "incorrect",
      }));

      setUserAnswers((p) => ({ ...p, [currentQuestionIndex]: selectedAnswer }));

      setShowResult(true);
    } catch (err) {
      alert("Submit error");
      console.error(err);
    }

    setIsSubmitting(false);
  };

  // Next question
  const nextQuestion = () => {
    const next = currentQuestionIndex + 1;
    setCurrentQuestionIndex(next);

    if (userAnswers[next]) {
      const q = questions[next];
      const ans = userAnswers[next];
      const status = questionResults[next];

      setSelectedAnswer(ans);
      setResult({
        is_correct: status === "correct",
        correct_answer: q.correct_answer,
        explanation: q.explanation,
        question_id: q._id,
        user_answer: ans,
        time_spent: 0,
      });

      setShowResult(true);
    } else {
      setSelectedAnswer(null);
      setShowResult(false);
      setResult(null);
    }

    setTimeSpent(0);
  };

  // Option color
  const getOptionColor = (option: string) => {
    if (!showResult || !result) return "bg-white hover:bg-gray-50";

    if (option === result.correct_answer)
      return "bg-green-100 border-green-500 text-green-800";

    if (option === selectedAnswer && !result.is_correct)
      return "bg-red-100 border-red-500 text-red-800";

    return "bg-gray-100";
  };

  // Start screen
  if (!quizStarted)
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white shadow-lg rounded-xl p-8 text-center">
          <Image
            src="/Yellow and Blue Gradient Virtual Assistant Course Facebook Cover (5).jpg"
            width={150}
            height={150}
            alt="Quiz"
          />
          <motion.button
            onClick={startQuiz}
            disabled={isLoading}
            className="mt-6 px-8 py-4 bg-indigo-600 text-white rounded-xl"
          >
            {isLoading ? "Loading..." : "Start Quiz"}
          </motion.button>
        </div>
      </div>
    );

  // Loading state
  if (questions.length === 0)
    return (
      <div className="p-8 text-center">
        <p>Loading questions...</p>
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-right text-gray-500 mb-4 text-sm">
        Time: {timeSpent}s
      </div>

      <motion.div className="bg-white p-8 shadow-lg rounded-xl">
        <div className="mb-5">
          <div className="flex gap-3 mb-3">
            <span className="px-3 py-1 rounded bg-indigo-100">
              Question {currentQuestionIndex + 1}
            </span>
            <span className="px-3 py-1 rounded bg-indigo-100">
              {currentQuestion.question_category}
            </span>
            <span className="px-3 py-1 rounded bg-purple-100">
              {currentQuestion.difficulty_level}
            </span>
          </div>

          <h3 className="text-xl font-semibold">
            {currentQuestion.question_name}
          </h3>
        </div>

        <div className="space-y-3 mb-6">
          {currentQuestion.question_options.map((option, index) => (
            <motion.button
              key={index}
              onClick={() => !showResult && setSelectedAnswer(option)}
              disabled={showResult}
              className={`w-full p-4 border-2 rounded-lg ${getOptionColor(
                option
              )}`}
            >
              {option}
            </motion.button>
          ))}
        </div>

        {/* Result */}
        <AnimatePresence>
          {showResult && result && (
            <motion.div className="p-4 mb-6 rounded bg-indigo-50 border-l-4 border-indigo-500">
              <span
                className={`px-2 py-1 rounded text-sm ${
                  result.is_correct
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {result.is_correct ? "Correct!" : "Incorrect"}
              </span>
              <p className="mt-2">{result.explanation}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Buttons */}
        <div className="flex justify-end">
          {!showResult ? (
            <button
              onClick={submitAnswer}
              disabled={!selectedAnswer || isSubmitting}
              className="px-6 py-3 bg-indigo-600 text-white rounded-xl"
            >
              {isSubmitting ? "Submitting..." : "Submit Answer"}
            </button>
          ) : (
            <button
              onClick={nextQuestion}
              className="px-6 py-3 bg-green-600 text-white rounded-xl"
            >
              Next Question
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
}
