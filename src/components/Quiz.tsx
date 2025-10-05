"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getAuthData } from "@/utils/authStorage";

interface Question {
  question_id: string;
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

interface QuizProps {
  onComplete?: (results: any) => void;
}

export default function Quiz({ onComplete }: QuizProps) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [timeSpent, setTimeSpent] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [isGeneratingMore, setIsGeneratingMore] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  // Timer effect
  useEffect(() => {
    if (quizStarted && !showResult) {
      const timer = setInterval(() => {
        setTimeSpent((prev) => prev + 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [quizStarted, showResult]);

  const generateQuestions = async (stageNumber: number = 1) => {
    try {
      const authData = getAuthData();
      if (!authData) {
        throw new Error("Authentication required");
      }

      const response = await fetch("/api/quiz/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: authData.token,
          user_id: authData.userId,
          course_type: "Naplap",
          stage_number: stageNumber,
          num_questions: 10,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle 409 error (questions already exist) gracefully
        if (response.status === 409) {
          console.log(
            "Questions already exist for stage",
            stageNumber,
            "- continuing with existing questions"
          );
          return []; // Return empty array to indicate no new questions needed
        }
        throw new Error(data.error || "Failed to generate questions");
      }

      return data.questions;
    } catch (error) {
      console.error("Error generating questions:", error);
      throw error;
    }
  };

  const startQuiz = async () => {
    setIsLoading(true);
    try {
      const newQuestions = await generateQuestions(1);

      if (newQuestions && newQuestions.length > 0) {
        setQuestions(newQuestions);
        setQuizStarted(true);
      } else {
        // If no questions generated (409 error), try to continue anyway
        console.log("No questions generated, but continuing...");
        setQuizStarted(true);
      }
    } catch (error) {
      console.error("Error starting quiz:", error);
      alert("Failed to start quiz. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const submitAnswer = async () => {
    if (!selectedAnswer || !currentQuestion) return;

    setIsSubmitting(true);
    try {
      const authData = getAuthData();
      if (!authData) {
        throw new Error("Authentication required");
      }

      const response = await fetch("/api/quiz/submit-answer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: authData.token,
          question_id: currentQuestion.question_id,
          user_answer: selectedAnswer,
          time_spent: timeSpent,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit answer");
      }

      setResult(data);
      setShowResult(true);
    } catch (error) {
      console.error("Error submitting answer:", error);
      alert("Failed to submit answer. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextQuestion = async () => {
    const nextIndex = currentQuestionIndex + 1;

    // Generate more questions when reaching the 6th question (index 5)
    if (nextIndex === 5 && !isGeneratingMore) {
      setIsGeneratingMore(true);
      try {
        const currentStage = Math.floor(nextIndex / 10) + 2; // Calculate next stage
        const newQuestions = await generateQuestions(currentStage);

        // Only add questions if we got new ones
        if (newQuestions && newQuestions.length > 0) {
          setQuestions((prev) => [...prev, ...newQuestions]);
        } else {
          console.log(
            "No new questions generated, continuing with existing questions"
          );
        }
      } catch (error) {
        console.error("Failed to generate more questions:", error);
        // Don't show error to user, just continue with existing questions
      } finally {
        setIsGeneratingMore(false);
      }
    }

    setCurrentQuestionIndex(nextIndex);
    setSelectedAnswer(null);
    setShowResult(false);
    setResult(null);
    setTimeSpent(0);
  };

  const getOptionColor = (option: string) => {
    if (!showResult) return "bg-white hover:bg-gray-50";

    if (option === result.correct_answer) {
      return "bg-green-100 border-green-500 text-green-800";
    }

    if (option === selectedAnswer && !result.is_correct) {
      return "bg-red-100 border-red-500 text-red-800";
    }

    return "bg-gray-100";
  };

  if (!quizStarted) {
    return (
      <div className="max-w-2xl mx-auto p-8 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Ready to Start Your Quiz?
          </h2>
          <p className="text-gray-600 mb-8">
            You'll have 10 questions to answer. Take your time and choose the
            best answer for each question.
          </p>
          <motion.button
            onClick={startQuiz}
            disabled={isLoading}
            className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isLoading ? "Loading..." : "Start Quiz"}
          </motion.button>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="max-w-2xl mx-auto p-8 bg-white rounded-xl shadow-lg text-center">
        <p className="text-gray-600">Loading questions...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Timer */}
      <div className="mb-8 text-right">
        <span className="text-sm text-gray-500">Time: {timeSpent}s</span>
      </div>

      {/* Question Card */}
      <motion.div
        key={currentQuestionIndex}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        className="bg-white rounded-xl shadow-lg p-8 mb-6"
      >
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="px-3 py-1 bg-indigo-100 text-indigo-800 text-sm font-medium rounded-full">
              {currentQuestion.question_category}
            </span>
            <span className="px-3 py-1 bg-purple-100 text-purple-800 text-sm font-medium rounded-full">
              {currentQuestion.difficulty_level}
            </span>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 leading-relaxed">
            {currentQuestion.question_name}
          </h3>
        </div>

        {/* Options */}
        <div className="space-y-3 mb-8">
          {currentQuestion.question_options.map((option, index) => (
            <motion.button
              key={index}
              onClick={() => !showResult && setSelectedAnswer(option)}
              disabled={showResult}
              className={`w-full p-4 text-left border-2 rounded-lg transition-all duration-200 ${getOptionColor(
                option
              )} ${
                selectedAnswer === option && !showResult
                  ? "border-indigo-500 bg-indigo-50"
                  : ""
              }`}
              whileHover={!showResult ? { scale: 1.02 } : {}}
              whileTap={!showResult ? { scale: 0.98 } : {}}
            >
              <span className="font-medium">{option}</span>
            </motion.button>
          ))}
        </div>

        {/* Result Display */}
        <AnimatePresence>
          {showResult && result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 rounded-lg border-l-4 border-indigo-500 bg-indigo-50"
            >
              <div className="flex items-center gap-2 mb-2">
                <span
                  className={`px-2 py-1 rounded text-sm font-medium ${
                    result.is_correct
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {result.is_correct ? "Correct!" : "Incorrect"}
                </span>
              </div>
              <p className="text-gray-700 text-sm">{result.explanation}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Buttons */}
        <div className="flex justify-between">
          <div>
            {isGeneratingMore && (
              <div className="flex items-center gap-2 text-sm text-blue-600">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                Generating more questions...
              </div>
            )}
          </div>
          <div className="flex gap-3">
            {!showResult ? (
              <motion.button
                onClick={submitAnswer}
                disabled={!selectedAnswer || isSubmitting}
                className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isSubmitting ? "Submitting..." : "Submit Answer"}
              </motion.button>
            ) : (
              <motion.button
                onClick={nextQuestion}
                className="px-6 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Next Question
              </motion.button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
