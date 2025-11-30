"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getAuthData } from "@/utils/authStorage";
import Cookies from "js-cookie";
import Image from "next/image";
// IMPORT THE NEW COMPONENT
import QuizResultSummary from "@/components/QuizResultSummary";

// --- CONSTANTS ---
const QUESTIONS_PER_STAGE = 10;
const XP_PER_CORRECT = 5; 
const BASE_BACKEND_URL = "https://92c52865-c657-478a-b2e0-625fc822f55b-00-23crg2t5cyi67.pike.replit.dev:5000";

// --- INTERFACES ---
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

interface QuizHistoryEntry {
  question_id: string;
  question_name: string;
  correct_answer: string;
  explanation?: string;
  user_answer: string;
  is_correct: boolean;
  stage_number: number;
  time_spent: number;
  attempted_at: string;
}

interface StageStats {
  correct: number;
  wrong: number;
  accuracy: number;
  xpEarned: number;
  totalTime: number;
}

export default function Quiz() {
  // --- STATE ---
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentStage, setCurrentStage] = useState(1);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Single Question Result
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState<QuizResult | null>(null);

  // Stage Summary Result
  const [showStageResult, setShowStageResult] = useState(false);
  const [stageStats, setStageStats] = useState<StageStats | null>(null);

  // General State
  const [timeSpent, setTimeSpent] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [isGeneratingMore, setIsGeneratingMore] = useState(false);
  const [userAnswers, setUserAnswers] = useState<{ [index: number]: string }>({});
  const [hasMoreStages, setHasMoreStages] = useState(true);
  const [quizHistory, setQuizHistory] = useState<QuizHistoryEntry[]>([]);

  const currentQuestion = questions[currentQuestionIndex];

  // --- EFFECTS ---

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const stored = localStorage.getItem("levelup_quiz_history");
      if (stored) {
        setQuizHistory(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to parse quiz history", e);
    }
  }, []);

  useEffect(() => {
    if (quizStarted && !showResult && !showStageResult) {
      const timer = setInterval(
        () => setTimeSpent((prev) => prev + 1),
        1000
      );
      return () => clearInterval(timer);
    }
  }, [quizStarted, showResult, showStageResult]);

  // --- DERIVED STATS ---
  const totalAnswered = useMemo(() => Object.keys(userAnswers).length, [userAnswers]);
  const totalLoaded = useMemo(() => (questions.length === 0 ? 1 : questions.length), [questions.length]);
  const progressPercent = useMemo(() => Math.round((totalAnswered / totalLoaded) * 100), [totalAnswered, totalLoaded]);
  const correctCount = useMemo(() => quizHistory.filter((h) => h.is_correct).length, [quizHistory]);
  const accuracy = useMemo(() => quizHistory.length === 0 ? 0 : Math.round((correctCount / quizHistory.length) * 100), [correctCount, quizHistory.length]);

  // --- AUTH UTILITIES ---
  const getTokenAndUserId = () => {
    const authData = getAuthData();
    let token = authData?.token;
    let userId = authData?.userId;
    let subject = authData?.subject || authData?.user?.subject;
    let year = authData?.year || authData?.grade || authData?.user?.year || authData?.user?.grade;
    let rawCourse = authData?.course || authData?.course_type || authData?.user?.course || authData?.user?.course_type;
    let course = Array.isArray(rawCourse) ? rawCourse[0] : rawCourse;

    if (!token || !userId || !course) {
      const cookie = Cookies.get("auth-client");
      if (cookie) {
        try {
          const parsed = JSON.parse(cookie);
          token = token || parsed.token || parsed.auth_token;
          userId = userId || parsed.userId || parsed.user_id;
          subject = subject || parsed.subject;
          year = year || parsed.year || parsed.grade;
          let cookieCourse = parsed.course || parsed.course_type;
          if (parsed.user) {
            subject = subject || parsed.user.subject;
            year = year || parsed.user.grade || parsed.user.year;
            cookieCourse = cookieCourse || parsed.user.course || parsed.user.course_type;
          }
          if (!course && cookieCourse) {
             course = Array.isArray(cookieCourse) ? cookieCourse[0] : cookieCourse;
          }
        } catch (e) {
          console.error("Error parsing auth cookie", e);
        }
      }
    }
    return { token, userId, course, subject, year };
  };

  // --- API CALLS ---
  const generateQuestions = async (stageNumber: number) => {
    try {
      const { token, userId, course, subject, year } = getTokenAndUserId();
      if (!token || !userId) return [];

      const res = await fetch(`${BASE_BACKEND_URL}/api/questions/generate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          user_id: userId,
          course_type: course,
          stage_number: stageNumber,
          grade: year,
          subject: subject,
          num_questions: QUESTIONS_PER_STAGE,
        }),
      });

      const data = await res.json();
      if (res.status === 409) return "ALREADY_COMPLETED";
      if (!res.ok) return [];

      return (data.questions || []) as Question[];
    } catch (err) {
      console.error("❌ Error generating questions:", err);
      return [];
    }
  };

  const startQuiz = async () => {
    setIsLoading(true);
    let attemptStage = 1;
    let foundQuestions: Question[] | "ALREADY_COMPLETED" | [] = [];

    while (attemptStage <= 20) {
        const result = await generateQuestions(attemptStage);
        if (result === "ALREADY_COMPLETED") {
            attemptStage++;
            continue;
        }
        if (Array.isArray(result) && result.length > 0) {
            foundQuestions = result;
            break; 
        }
        break; 
    }

    if (Array.isArray(foundQuestions) && foundQuestions.length > 0) {
      setQuestions(foundQuestions);
      setCurrentStage(attemptStage);
      setCurrentQuestionIndex(0);
      setQuizStarted(true);
      setSelectedAnswer(null);
      setShowResult(false);
      setResult(null);
      setTimeSpent(0);
    } else if (attemptStage > 20) {
      alert("You have completed all available stages!");
    } else {
      alert("Unable to load questions. Please try again later.");
    }
    setIsLoading(false);
  };

  const pushHistory = (entry: QuizHistoryEntry) => {
    setQuizHistory((prev) => {
      const updated = [...prev, entry];
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem("levelup_quiz_history", JSON.stringify(updated));
        } catch (e) {
          console.error("Failed to save quiz history", e);
        }
      }
      return updated;
    });
  };

  const submitAnswer = async () => {
    if (!selectedAnswer || !currentQuestion) {
      alert("Please select an answer");
      return;
    }
    if (!currentQuestion._id || currentQuestion._id.length < 10) {
      alert("Invalid question ID");
      return;
    }

    setIsSubmitting(true);
    const selectedOptionKey = selectedAnswer.split(" - ")[0]; 

    // --- LOCAL VALIDATION ---
    if (currentQuestion.correct_answer && currentQuestion.correct_answer.length > 0) {
        const isCorrect = selectedAnswer.startsWith(currentQuestion.correct_answer);
        const localResult: QuizResult = {
            is_correct: isCorrect,
            correct_answer: currentQuestion.correct_answer,
            explanation: currentQuestion.explanation || "Review your previous attempt for details.",
            question_id: currentQuestion._id,
            user_answer: selectedAnswer, 
            time_spent: timeSpent,
        };
        setResult(localResult);
        setShowResult(true);
        setUserAnswers((prev) => ({ ...prev, [currentQuestionIndex]: selectedAnswer }));
        setIsSubmitting(false);
        return; 
    }

    // --- API SUBMISSION ---
    try {
      const { token } = getTokenAndUserId();
      if (!token) {
        alert("You are not authenticated");
        setIsSubmitting(false);
        return;
      }

      const res = await fetch(`${BASE_BACKEND_URL}/api/questions/submit-answer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          question_id: currentQuestion._id,
          user_answer: selectedOptionKey, 
          time_spent: timeSpent,
          token,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.error || "Failed to submit answer");
        setIsSubmitting(false);
        return;
      }

      const quizResult: QuizResult = {
        is_correct: data.is_correct,
        correct_answer: data.correct_answer,
        explanation: data.explanation,
        question_id: currentQuestion._id,
        user_answer: selectedAnswer,
        time_spent: timeSpent,
      };

      setResult(quizResult);
      setShowResult(true);

      setUserAnswers((prev) => ({ ...prev, [currentQuestionIndex]: selectedAnswer }));

      pushHistory({
        question_id: currentQuestion._id,
        question_name: currentQuestion.question_name,
        correct_answer: data.correct_answer,
        explanation: data.explanation, 
        user_answer: selectedAnswer, 
        is_correct: data.is_correct,
        stage_number: currentStage,
        time_spent: timeSpent,
        attempted_at: new Date().toISOString(),
      });
    } catch (err) {
      console.error("Error submitting answer", err);
      alert("Error submitting answer");
    }

    setIsSubmitting(false);
  };

  const calculateStageStats = () => {
    const currentStageHistory = quizHistory.filter((h) => h.stage_number === currentStage);
    const correct = currentStageHistory.filter((h) => h.is_correct).length;
    const total = currentStageHistory.length;
    const wrong = total - correct;
    const acc = total === 0 ? 0 : Math.round((correct / total) * 100);
    const totalTime = currentStageHistory.reduce((acc, curr) => acc + curr.time_spent, 0);

    setStageStats({
      correct,
      wrong,
      accuracy: acc,
      xpEarned: correct * XP_PER_CORRECT,
      totalTime,
    });
  };

  const nextQuestion = async () => {
    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex % QUESTIONS_PER_STAGE === 0 && nextIndex === questions.length) {
        calculateStageStats();
        setShowStageResult(true);
        return;
    }
    if (nextIndex < questions.length) {
      setCurrentQuestionIndex(nextIndex);
      setSelectedAnswer(null);
      setShowResult(false);
      setResult(null);
      setTimeSpent(0);
      return;
    }
  };

  const continueToNextStage = async () => {
    if (!hasMoreStages) {
      alert("You’ve completed all available stages. Great job!");
      return;
    }
    setIsGeneratingMore(true);
    let attemptStage = currentStage + 1;
    let newStageQuestions: Question[] | "ALREADY_COMPLETED" | [] = [];

    while (attemptStage <= 20) {
        const result = await generateQuestions(attemptStage);
        if (result === "ALREADY_COMPLETED") {
            attemptStage++;
            continue;
        }
        if (Array.isArray(result) && result.length > 0) {
            newStageQuestions = result;
            break;
        }
        break;
    }
    setIsGeneratingMore(false);

    if (!Array.isArray(newStageQuestions) || newStageQuestions.length === 0) {
      setHasMoreStages(false);
      alert("No more stages available. You’ve finished the quiz set!");
      return;
    }

    setQuestions((prev) => [...prev, ...newStageQuestions]);
    setCurrentStage(attemptStage); 
    setCurrentQuestionIndex((prev) => prev + 1);

    setSelectedAnswer(null);
    setShowResult(false);
    setShowStageResult(false); 
    setResult(null);
    setTimeSpent(0);
  };

  const handleRetake = () => {
    const currentStageHistory = quizHistory.filter((h) => h.stage_number === currentStage);
    const wrongQuestionIds = currentStageHistory.filter((h) => !h.is_correct).map((h) => h.question_id);
    if (wrongQuestionIds.length === 0) return;

    const questionsToRetake = questions
      .filter((q) => wrongQuestionIds.includes(q._id))
      .map((q) => {
        const previousAttempt = currentStageHistory.find(h => h.question_id === q._id);
        return {
            ...q,
            correct_answer: previousAttempt?.correct_answer || q.correct_answer,
            explanation: previousAttempt?.explanation || q.explanation || "" 
        };
      });

    const newHistory = quizHistory.filter((h) => !(h.stage_number === currentStage && wrongQuestionIds.includes(h.question_id)));

    setQuizHistory(newHistory);
    if (typeof window !== "undefined") {
      localStorage.setItem("levelup_quiz_history", JSON.stringify(newHistory));
    }

    setQuestions(questionsToRetake);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setShowStageResult(false);
    setResult(null);
    setTimeSpent(0);
    setUserAnswers({}); 
  };

  const getOptionClasses = (option: string) => {
    const base = "w-full p-4 border-2 rounded-lg text-left text-sm md:text-base transition-all duration-200 flex items-start gap-3";
    if (!showResult || !result) {
      const selected = selectedAnswer === option ? "border-indigo-500 bg-indigo-50 shadow-sm" : "border-gray-200 bg-white hover:bg-gray-50";
      return `${base} ${selected}`;
    }
    if (option.startsWith(result.correct_answer)) { 
      return `${base} border-green-500 bg-green-50`;
    }
    if (option === selectedAnswer && !result.is_correct) {
      return `${base} border-red-500 bg-red-50`;
    }
    return `${base} border-gray-200 bg-gray-100`;
  };

  const getOptionLabel = (index: number) => String.fromCharCode("A".charCodeAt(0) + index);

  // --- RENDER 1: START SCREEN ---
  if (!quizStarted) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center gap-6">
          <Image
            src="/Yellow and Blue Gradient Virtual Assistant Course Facebook Cover (5).jpg"
            width={400} height={200} alt="Super Sheldon LevelUp Quiz"
            className="w-full rounded-xl object-cover"
          />
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold text-gray-900">SuperSheldon LevelUp Quiz</h1>
            <p className="text-gray-600 text-sm">Adaptive stages. {QUESTIONS_PER_STAGE} questions per stage. Instant feedback.</p>
          </div>
          <motion.button
            onClick={startQuiz} disabled={isLoading}
            whileHover={{ scale: isLoading ? 1 : 1.03 }} whileTap={{ scale: 0.97 }}
            className="px-10 py-4 bg-indigo-600 text-white font-semibold rounded-xl shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isLoading ? "Starting..." : "Start Quiz"}
          </motion.button>
        </div>
      </div>
    );
  }

  // --- RENDER 2: STAGE RESULT SCREEN (USING NEW COMPONENT) ---
  if (showStageResult && stageStats) {
    return (
      <QuizResultSummary 
        stage={currentStage}
        stats={stageStats}
        history={quizHistory}
        onRetake={handleRetake}
        onContinue={continueToNextStage}
        isGeneratingNext={isGeneratingMore}
        hasMoreStages={hasMoreStages}
      />
    );
  }

  // --- RENDER 3: LOADING ---
  if (questions.length === 0) {
    return (
      <div className="max-w-2xl mx-auto p-8 bg-white rounded-xl shadow-lg text-center">
        <p className="text-gray-600">Loading questions...</p>
      </div>
    );
  }

  // --- RENDER 4: MAIN QUIZ INTERFACE ---
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Top bar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-medium text-gray-600">Overall Progress</span>
            <span className="text-xs font-semibold text-indigo-700">{totalAnswered}/{questions.length} answered ({progressPercent}%)</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div className="h-3 bg-indigo-500 rounded-full transition-all duration-300" style={{ width: `${progressPercent}%` }} />
          </div>
        </div>
        <div className="flex gap-3 items-center justify-between md:justify-end text-sm">
          <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-800 font-medium">Stage {currentStage}</span>
          <span className="text-gray-500 text-xs md:text-sm">Time: <span className="font-semibold">{timeSpent}s</span></span>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1">
          <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}
            className="bg-white rounded-2xl shadow-xl p-6 md:p-8"
          >
            <div className="mb-6">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="px-3 py-1 bg-indigo-100 text-indigo-800 text-xs font-medium rounded-full">Question {currentQuestionIndex + 1}</span>
                <span className="px-3 py-1 bg-sky-100 text-sky-800 text-xs font-medium rounded-full">{currentQuestion.question_category}</span>
                <span className="px-3 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-full">{currentQuestion.difficulty_level}</span>
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 leading-relaxed">{currentQuestion.question_name}</h3>
            </div>

            <div className="space-y-3 mb-6">
              {currentQuestion.question_options.map((option, index) => (
                <motion.button
                  key={index}
                  onClick={() => !showResult && setSelectedAnswer(option)}
                  disabled={showResult}
                  whileHover={!showResult ? { scale: 1.01 } : undefined}
                  whileTap={!showResult ? { scale: 0.99 } : undefined}
                  className={getOptionClasses(option)}
                >
                  <div className="flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-full border text-xs font-semibold mt-1 bg-white">{getOptionLabel(index)}</div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">{option}</p>
                    {!showResult && selectedAnswer === option && <p className="text-[11px] text-indigo-600 mt-1">Selected</p>}
                  </div>
                </motion.button>
              ))}
            </div>

            <AnimatePresence>
              {showResult && result && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
                  className="mb-6 p-4 rounded-xl border-l-4 border-indigo-500 bg-indigo-50"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${result.is_correct ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                      {result.is_correct ? "✅ Correct" : "❌ Incorrect"}
                    </span>
                    <span className="text-xs text-gray-500">Correct answer: <span className="font-semibold">{result.correct_answer}</span></span>
                  </div>
                  <p className="text-xs md:text-sm text-gray-700">{result.explanation}</p>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex items-center justify-between mt-2">
              <div className="text-xs text-gray-500 flex items-center gap-2">
                {isGeneratingMore && <div className="flex items-center gap-2 text-blue-600"><span className="animate-spin inline-block h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full" /><span>Loading next stage…</span></div>}
              </div>
              <div className="flex gap-3">
                {!showResult ? (
                  <motion.button
                    onClick={submitAnswer}
                    disabled={!selectedAnswer || isSubmitting}
                    whileHover={!isSubmitting ? { scale: 1.02 } : undefined} whileTap={!isSubmitting ? { scale: 0.98 } : undefined}
                    className="px-6 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-xl shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Answer"}
                  </motion.button>
                ) : (
                  <motion.button
                    onClick={nextQuestion}
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    className="px-6 py-2.5 bg-green-600 text-white text-sm font-semibold rounded-xl shadow-md"
                  >
                    Next Question →
                  </motion.button>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        <div className="w-full lg:w-72 space-y-4">
          <div className="bg-white rounded-2xl shadow-md p-4">
            <h4 className="text-sm font-semibold text-gray-900 mb-2">Quiz Summary</h4>
            <p className="text-xs text-gray-600 mb-1">Total attempts: <span className="font-semibold">{quizHistory.length}</span></p>
            <p className="text-xs text-gray-600 mb-1">Correct answers: <span className="font-semibold">{correctCount}</span></p>
            <p className="text-xs text-gray-600">Accuracy: <span className="font-semibold">{accuracy}%</span></p>
          </div>
          <div className="bg-white rounded-2xl shadow-md p-4">
            <h4 className="text-sm font-semibold text-gray-900 mb-3">Recent Questions</h4>
            {quizHistory.length === 0 ? (
              <p className="text-xs text-gray-500">Answer questions to see your history here.</p>
            ) : (
              <div className="space-y-2 max-h-72 overflow-y-auto">
                {quizHistory.slice(-5).reverse().map((h, idx) => (
                  <div key={idx} className="border rounded-lg p-2.5 text-xs space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-800 truncate max-w-[150px]">Stage {h.stage_number}</span>
                      <span className={h.is_correct ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}>{h.is_correct ? "✓" : "✗"}</span>
                    </div>
                    <p className="text-[11px] text-gray-700 line-clamp-2">{h.question_name}</p>
                    <p className="text-[11px] text-gray-500">Your answer: <span className="font-medium">{h.user_answer}</span></p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
