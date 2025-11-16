"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getAuthData } from "@/utils/authStorage";
import Cookies from "js-cookie";

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

interface QuizResult {
  is_correct: boolean;
  correct_answer: string;
  explanation: string;
  question_id: string;
  user_answer: string;
  time_spent: number;
}

interface QuizProps {
  onComplete?: (results: QuizResult) => void;
}

export default function Quiz({}: QuizProps) {
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

  // Timer effect
  useEffect(() => {
    if (quizStarted && !showResult) {
      const timer = setInterval(() => {
        setTimeSpent((prev) => prev + 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [quizStarted, showResult]);

  // Function to generate questions
  const generateQuestions = async (stageNumber: number = 1) => {
    try {
      let authData = getAuthData();
      let token = authData?.token;
      let userId = authData?.userId;

      if (!token || !userId) {
        const clientCookie = Cookies.get("auth-client");
        if (clientCookie) {
          const parsed = JSON.parse(clientCookie);
          token = token || parsed.token || parsed.auth_token || parsed.authToken;
          userId = userId || parsed.userId || parsed.user_id || parsed.id;
        }
      }

      if (!token || !userId) {
        console.warn("No token/user_id found, attempting with cookies.");
      }

      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };
      if (token) headers["Authorization"] = `Bearer ${token}`;

      const response = await fetch(
        "https://levelupbackend.supersheldon.online/api/questions/generate",
        {
          method: "POST",
          headers: headers,
          body: JSON.stringify({
            user_id: userId,
            course_type: "Naplap",
            stage_number: stageNumber,
            grade: 5,
            num_questions: 10,
          }),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.error || "Failed to generate questions");
      }

      return data.questions || [];
    } catch (error) {
      console.error(`❌ Error generating questions: ${error}`);
      throw error;
    }
  };

  // Start quiz function
  const startQuiz = async () => {
    setIsLoading(true);
    try {
      const newQuestions = await generateQuestions(1); // Start with stage 1
      if (newQuestions && newQuestions.length > 0) {
        setQuestions(newQuestions); // Set the fetched questions
        setQuizStarted(true); // Set quiz to started
      } else {
        alert("Unable to generate questions. Please try again later.");
      }
    } catch (error) {
      console.error("Error starting quiz:", error);
      alert("Failed to start quiz. Please try again.");
    } finally {
      setIsLoading(false); // Set loading state to false
    }
  };

const submitAnswer = async () => {
  if (!selectedAnswer || !currentQuestion) {
    // Add a warning for missing answer selection
    alert("Please select an answer before submitting.");
    return;
  }

  setIsSubmitting(true); // Set submitting to true to disable buttons
  try {
    let authData = getAuthData();
    let token = authData?.token;
    let userId = authData?.userId;

    // Check for token and userId in local storage/cookies
    if (!token || !userId) {
      const clientCookie = Cookies.get("auth-client");
      if (clientCookie) {
        const parsed = JSON.parse(clientCookie);
        token = token || parsed.token || parsed.auth_token || parsed.authToken;
        userId = userId || parsed.userId || parsed.user_id || parsed.id;
      }
    }

    if (!token || !userId) {
      console.warn("No token/user_id found, attempting with cookies.");
    }

    const submitHeaders: Record<string, string> = {
      "Content-Type": "application/json",
    };
    if (token) submitHeaders["Authorization"] = `Bearer ${token}`;

    const response = await fetch(
      "https://levelupbackend.supersheldon.online/api/questions/submit-answer",
      {
        method: "POST",
        headers: submitHeaders,
        body: JSON.stringify({
          question_id: currentQuestion.question_id,
          user_answer: selectedAnswer,
          time_spent: timeSpent,
          token,
        }),
      }
    );

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data?.error || "Failed to submit answer");
    }

    // Update the result based on API response
    setResult({
      is_correct: data.is_correct,
      correct_answer: data.correct_answer,
      explanation: data.explanation,
      question_id: currentQuestion.question_id,
      user_answer: selectedAnswer,
      time_spent: timeSpent,
    });

    // Show the result after submission
    setShowResult(true);

    // Update the question results and user answers state
    setQuestionResults((prev) => ({
      ...prev,
      [currentQuestionIndex]: data.is_correct ? "correct" : "incorrect",
    }));
    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestionIndex]: selectedAnswer,
    }));
  } catch (error) {
    console.error(`❌ Error submitting answer: ${error}`);
    alert("Failed to submit answer. Please try again.");
  } finally {
    setIsSubmitting(false); // Reset submitting state
  }
};

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.error || "Failed to submit answer");
      }

      setResult(data);
      setShowResult(true);
      setQuestionResults((prev) => ({
        ...prev,
        [currentQuestionIndex]: data.is_correct ? "correct" : "incorrect",
      }));
      setUserAnswers((prev) => ({
        ...prev,
        [currentQuestionIndex]: selectedAnswer,
      }));
    } catch (error) {
      console.error(`❌ Error submitting answer: ${error}`);
      alert("Failed to submit answer. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Function to go to the next question
  const nextQuestion = async () => {
    const nextIndex = currentQuestionIndex + 1;

    setCurrentQuestionIndex(nextIndex);

    if (userAnswers[nextIndex]) {
      setSelectedAnswer(userAnswers[nextIndex]);
      const nextResult = questionResults[nextIndex];
      setResult({
        is_correct: nextResult === "correct",
        correct_answer: questions[nextIndex].correct_answer,
        explanation: questions[nextIndex].explanation,
        question_id: questions[nextIndex].question_id,
        user_answer: userAnswers[nextIndex],
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

  // Function to get the color of the answer options
  const getOptionColor = (option: string) => {
    if (!showResult || !result) return "bg-white hover:bg-gray-50";

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
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Welcome to the Quiz!
            </h1>
            <motion.button
              onClick={startQuiz}
              disabled={isLoading}
              className="px-8 py-4 bg-indigo-600 text-white text-lg font-semibold rounded-xl hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isLoading ? (
                <div className="flex items-center gap-3">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Starting Quiz...
                </div>
              ) : (
                "Start Quiz"
              )}
            </motion.button>
          </div>
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
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex gap-6">
        {/* Main Quiz Content */}
        <div className="flex-1">
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
                  Question {currentQuestionIndex + 1}
                </span>
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
                  className={`w-full p-4 text-left border-2 rounded-lg transition-all duration-200 ${getOptionColor(option)} ${selectedAnswer === option && !showResult ? "border-indigo-500 bg-indigo-50" : ""}`}
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
                      className={`px-2 py-1 rounded text-sm font-medium ${result.is_correct ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
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
                    disabled={!selectedAnswer || isSubmitting || !!userAnswers[currentQuestionIndex]}
                    className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {isSubmitting ? "Submitting..." : userAnswers[currentQuestionIndex] ? "Already Attempted" : "Submit Answer"}
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
      </div>
    </div>
  );
}
