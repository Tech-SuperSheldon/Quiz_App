"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { PlayIcon, RocketLaunchIcon, LightBulbIcon } from "@heroicons/react/24/outline";
import { 
  ChevronLeftIcon, 
  ChevronRightIcon, 
  ClockIcon,
  CheckCircleIcon,
  QuestionMarkCircleIcon,
  FlagIcon,
  XMarkIcon,
  EyeIcon
} from "@heroicons/react/24/outline";
import Cookies from "js-cookie";

interface Question {
  question_id: string;
  question_name: string;
  question_options: string[];
  correct_answer: string;
  explanation: string;
  difficulty_level: string;
  question_category: string;
  course_type: string;
  stage_number: number;
  user_answer: string | null;
  is_correct: boolean;
  question_attempted: boolean;
  time_spent: number;
  created_at: string;
  updated_at: string;
  user_id: string;
}

export default function QuizPage() {
  const router = useRouter();
  const [quizStarted, setQuizStarted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [marked, setMarked] = useState<number[]>([]);
  const [review, setReview] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(55 * 60); // 55 min
  const [showFinishConfirm, setShowFinishConfirm] = useState(false);

  // const token = Cookies.get("token"); // Must exist

  const token =""

  // Timer
  useEffect(() => {
    if (!quizStarted || questions.length === 0) return;
    if (timeLeft <= 0) {
      handleFinishExam();
      return;
    }
    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, quizStarted, questions]);

  const startQuiz = async () => {
    if (!token) {
      alert("Token not found. Please login.");
      router.push("/auth/login");
      return;
    }

    setLoading(true);

    try {
      const userId = Cookies.get("user_id") || ""; // Must exist
      const res = await fetch("https://levelupbackend.supersheldon.online/api/questions/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          user_id: userId,
          course_type: "Naplap",
          stage_number: 1,
          num_questions: 10
        })
      });

      const data = await res.json();
      if (res.ok && data.questions) {
        setQuestions(data.questions);
        setQuizStarted(true);
      } else {
        console.error("API Error:", data);
        alert("Failed to generate quiz");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      alert("Error generating quiz");
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleOptionSelect = (option: string) => {
    setAnswers(prev => ({ ...prev, [currentQuestion]: option }));
    setQuestions(prev =>
      prev.map((q, idx) =>
        idx === currentQuestion
          ? { ...q, user_answer: option, question_attempted: true, is_correct: option === q.correct_answer }
          : q
      )
    );
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) setCurrentQuestion(prev => prev + 1);
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) setCurrentQuestion(prev => prev - 1);
  };

  const toggleMark = () => {
    setMarked(prev => (prev.includes(currentQuestion) ? prev.filter(i => i !== currentQuestion) : [...prev, currentQuestion]));
  };

  const toggleReview = () => {
    if (answers[currentQuestion] === undefined) {
      alert("Answer the question first before marking for review");
      return;
    }
    setReview(prev => (prev.includes(currentQuestion) ? prev.filter(i => i !== currentQuestion) : [...prev, currentQuestion]));
  };

  const goToQuestion = (idx: number) => {
    setCurrentQuestion(idx);
  };

  const getQuestionStatus = (idx: number) => {
    const userAnswer = answers[idx];
    const q = questions[idx];
    if (userAnswer !== undefined) return userAnswer === q.correct_answer ? "correct" : "wrong";
    if (review.includes(idx)) return "review";
    if (marked.includes(idx)) return "marked";
    return "not-visited";
  };

  const handleFinishExam = async () => {
    try {
      const submissionData = {
        user_id: Cookies.get("user_id"),
        answers: questions.map((q, idx) => ({
          question_id: q.question_id,
          user_answer: answers[idx] || null,
          time_spent: q.time_spent,
          is_correct: answers[idx] === q.correct_answer
        }))
      };

      await fetch("https://levelupbackend.supersheldon.online/api/questions/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify(submissionData)
      });

      router.push("/dashboard/quizzes/results");
    } catch (err) {
      console.error("Submit error:", err);
      router.push("/dashboard/quizzes/results");
    }
  };

  // ===================
  // Render
  // ===================
  if (!quizStarted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white/95 dark:bg-slate-900 p-4">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center max-w-xl">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl inline-block p-4 mb-4">
            <RocketLaunchIcon className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Ready to Test Your Knowledge?
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            <LightBulbIcon className="h-4 w-4 text-yellow-500 inline mr-1 mb-1" />
            Click below to start your personalized quiz!
          </p>
          <button
            onClick={startQuiz}
            disabled={loading}
            className={`${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
            } text-white font-bold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 mx-auto`}
          >
            {loading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : (
              <>
                <PlayIcon className="h-5 w-5" />
                Start Quiz
              </>
            )}
          </button>
        </motion.div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading questions...</p>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];
  const isAnswered = answers[currentQuestion] !== undefined;

  return (
    <div className="min-h-screen bg-white/95 dark:bg-slate-900 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Timer + Finish */}
        <motion.div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg rounded-2xl p-4 border border-gray-200/50 dark:border-slate-700/50 shadow-lg mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <ClockIcon className="h-5 w-5 text-red-500" />
            <span className="font-mono font-bold text-lg">{formatTime(timeLeft)}</span>
          </div>
          <motion.button onClick={() => setShowFinishConfirm(true)} className="bg-red-500 text-white px-4 py-2 rounded-xl">
            Finish Exam
          </motion.button>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Questions area */}
          <motion.div className="lg:col-span-3 bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg rounded-2xl border border-gray-200/50 dark:border-slate-700/50 shadow-lg p-6">
            <h2 className="text-lg font-semibold mb-4">{currentQ.question_name}</h2>
            <div className="space-y-3">
              {currentQ.question_options.map(option => {
                const selected = answers[currentQuestion] === option;
                return (
                  <button
                    key={option}
                    onClick={() => handleOptionSelect(option)}
                    className={`w-full text-left p-3 rounded-xl border ${
                      selected ? "bg-indigo-600 text-white" : "bg-gray-100 dark:bg-slate-700 text-gray-800 dark:text-gray-200"
                    }`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
            <div className="flex justify-between mt-4">
              <button onClick={handlePrevious} disabled={currentQuestion === 0} className="px-4 py-2 rounded-xl bg-gray-200">
                <ChevronLeftIcon className="h-4 w-4 inline" /> Previous
              </button>
              <button onClick={handleNext} disabled={currentQuestion === questions.length - 1} className="px-4 py-2 rounded-xl bg-indigo-600 text-white">
                Next <ChevronRightIcon className="h-4 w-4 inline" />
              </button>
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div className="lg:col-span-1 bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg rounded-2xl p-4 border border-gray-200/50 dark:border-slate-700/50 shadow-lg sticky top-6">
            <h3 className="text-sm font-bold mb-3 flex items-center gap-2">
              <QuestionMarkCircleIcon className="h-4 w-4" />
              Questions
            </h3>
            <div className="grid grid-cols-5 gap-1">
              {questions.map((_, idx) => {
                const status = getQuestionStatus(idx);
                return (
                  <button
                    key={idx}
                    onClick={() => goToQuestion(idx)}
                    className={`p-1 rounded text-xs ${
                      status === "correct"
                        ? "bg-green-500 text-white"
                        : status === "wrong"
                        ? "bg-red-500 text-white"
                        : status === "review"
                        ? "bg-blue-500 text-white"
                        : status === "marked"
                        ? "bg-yellow-500 text-white"
                        : "bg-gray-200 dark:bg-slate-700"
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Finish Confirm */}
      <AnimatePresence>
        {showFinishConfirm && (
          <motion.div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <motion.div className="bg-white dark:bg-slate-800 rounded-2xl p-6 max-w-md w-full shadow-xl">
              <h3 className="text-lg font-bold mb-4">Finish Exam?</h3>
              <div className="flex gap-3">
                <button onClick={() => setShowFinishConfirm(false)} className="flex-1 py-2 px-4 bg-gray-200 rounded-xl">
                  Continue Exam
                </button>
                <button onClick={handleFinishExam} className="flex-1 py-2 px-4 bg-red-500 text-white rounded-xl">
                  Finish Exam
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
