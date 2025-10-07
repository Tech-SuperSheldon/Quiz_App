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

  const generateQuestions = async (stageNumber: number = 1) => {
    try {
      const authData = getAuthData();
      if (!authData) {
        throw new Error("Authentication required");
      }

      console.log(
        `📡 API CALL: Calling generateQuestions API for stage ${stageNumber}`
      );
      console.log(`📡 API CALL: Request body:`, {
        token: authData.token ? "***TOKEN***" : "NO_TOKEN",
        user_id: authData.userId,
        course_type: "Naplap",
        stage_number: stageNumber,
        num_questions: 10,
      });

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
      console.log(
        `📡 API RESPONSE: Status ${response.status} for stage ${stageNumber}`
      );
      console.log(`📡 API RESPONSE: Full response data:`, data);
      console.log(
        `📡 API RESPONSE: Response headers:`,
        Object.fromEntries(response.headers.entries())
      );

      if (!response.ok) {
        // Handle 409 error (questions already exist) by trying next stage
        if (response.status === 409) {
          console.log(
            `🔄 STAGE PROGRESSION: Questions already exist for stage ${stageNumber}, trying stage ${
              stageNumber + 1
            }`
          );

          // Always try next stage when 409 error occurs (infinite stages)
          return await generateQuestions(stageNumber + 1);
        }
        throw new Error(data.error || "Failed to generate questions");
      }

      console.log(
        `✅ API SUCCESS: Generated ${
          data.questions?.length || 0
        } questions for stage ${stageNumber}`
      );
      return data.questions;
    } catch (error) {
      console.error(
        `❌ API ERROR: Error generating questions for stage ${stageNumber}:`,
        error
      );
      throw error;
    }
  };

  const startQuiz = async () => {
    console.log(`🚀 QUIZ START: Starting quiz for user`);
    setIsLoading(true);
    try {
      // Always start with stage 1, the generateQuestions function will handle stage progression
      console.log(
        `🚀 QUIZ START: Calling generateQuestions(1) to get initial questions`
      );
      const newQuestions = await generateQuestions(1);

      if (newQuestions && newQuestions.length > 0) {
        setQuestions(newQuestions);
        setQuizStarted(true);
        // Log details about the first question to check its status
        if (newQuestions[0]) {
          console.log(
            `📋 INITIAL QUESTION DETAILS: First question ID: ${newQuestions[0].question_id}`
          );
          console.log(
            `📋 INITIAL QUESTION DETAILS: Question attempted: ${newQuestions[0].question_attempted}`
          );
          console.log(
            `📋 INITIAL QUESTION DETAILS: User answer: ${newQuestions[0].user_answer}`
          );
          console.log(
            `📋 INITIAL QUESTION DETAILS: Stage number: ${newQuestions[0].stage_number}`
          );
        }
      } else {
        // If no questions generated (all stages already have questions)
        console.log("No questions generated after trying all stages");
        alert("Unable to generate questions. Please try again later.");
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

    // Prevent submitting answer for already attempted questions
    if (userAnswers[currentQuestionIndex]) {
      console.log(
        `⚠️ SUBMIT BLOCKED: Question ${
          currentQuestionIndex + 1
        } already attempted`
      );
      return;
    }

    setIsSubmitting(true);
    try {
      const authData = getAuthData();
      if (!authData) {
        throw new Error("Authentication required");
      }

      console.log(
        `📤 SUBMIT ANSWER: Submitting answer for question ${
          currentQuestionIndex + 1
        } (ID: ${currentQuestion.question_id})`
      );
      console.log(
        `📤 SUBMIT ANSWER: Answer: "${selectedAnswer}", Time: ${timeSpent}s`
      );
      console.log(`📤 SUBMIT ANSWER: Request body:`, {
        token: authData.token ? "***TOKEN***" : "NO_TOKEN",
        question_id: currentQuestion.question_id,
        user_answer: selectedAnswer,
        time_spent: timeSpent,
      });

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
      console.log(
        `📤 SUBMIT RESPONSE: Status ${response.status} for question ${
          currentQuestionIndex + 1
        }`
      );
      console.log(`📤 SUBMIT RESPONSE: Full response data:`, data);
      console.log(
        `📤 SUBMIT RESPONSE: Response headers:`,
        Object.fromEntries(response.headers.entries())
      );

      if (!response.ok) {
        // Handle 409 error (answer already submitted) gracefully
        if (response.status === 409) {
          console.log(
            `⚠️ SUBMIT WARNING: Answer already submitted for question ${
              currentQuestionIndex + 1
            } (ID: ${currentQuestion.question_id})`
          );
          console.log(
            `⚠️ SUBMIT WARNING: Question attempted status: ${currentQuestion.question_attempted}`
          );
          console.log(
            `⚠️ SUBMIT WARNING: User answer status: ${currentQuestion.user_answer}`
          );

          // Instead of showing "already submitted", simulate a successful submission
          // This handles the backend inconsistency where questions show as not attempted but backend says they are
          const mockResult = {
            is_correct: selectedAnswer === currentQuestion.correct_answer,
            correct_answer: currentQuestion.correct_answer,
            explanation: currentQuestion.explanation,
            question_id: currentQuestion.question_id,
            user_answer: selectedAnswer,
            time_spent: timeSpent,
          };

          console.log(
            `🔄 SUBMIT FIX: Simulating successful submission for question ${
              currentQuestionIndex + 1
            }`
          );
          setResult(mockResult);
          setShowResult(true);

          // Update question results for the grid
          setQuestionResults((prev) => ({
            ...prev,
            [currentQuestionIndex]: mockResult.is_correct
              ? "correct"
              : "incorrect",
          }));

          // Store user's answer
          setUserAnswers((prev) => ({
            ...prev,
            [currentQuestionIndex]: selectedAnswer,
          }));
          return;
        }
        throw new Error(data.error || "Failed to submit answer");
      }

      console.log(
        `✅ SUBMIT SUCCESS: Answer submitted successfully for question ${
          currentQuestionIndex + 1
        }`
      );
      setResult(data);
      setShowResult(true);

      // Update question results for the grid
      setQuestionResults((prev) => ({
        ...prev,
        [currentQuestionIndex]: data.is_correct ? "correct" : "incorrect",
      }));

      // Store user's answer
      setUserAnswers((prev) => ({
        ...prev,
        [currentQuestionIndex]: selectedAnswer,
      }));
    } catch (error) {
      console.error(
        `❌ SUBMIT ERROR: Error submitting answer for question ${
          currentQuestionIndex + 1
        }:`,
        error
      );
      // Don't show alert for 409 errors, just log them
      if (
        !(
          error instanceof Error && error.message?.includes("already submitted")
        )
      ) {
        alert("Failed to submit answer. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextQuestion = async () => {
    const nextIndex = currentQuestionIndex + 1;
    console.log(
      `➡️ NEXT QUESTION: Moving from question ${
        currentQuestionIndex + 1
      } to question ${nextIndex + 1}`
    );

    // Generate more questions on 2nd, 12th, 22nd, 32nd, etc.
    // This means: index 1 (2nd question), index 11 (12th question), index 21 (22nd question), etc.
    const shouldGenerateMore =
      (nextIndex === 1 || (nextIndex > 1 && (nextIndex - 1) % 10 === 0)) &&
      !isGeneratingMore;

    if (shouldGenerateMore) {
      console.log(
        `🔄 QUESTION GENERATION: Should generate more questions at question ${
          nextIndex + 1
        }`
      );
    }

    let questionsGenerated = false;

    if (shouldGenerateMore) {
      setIsGeneratingMore(true);
      try {
        // Calculate stage based on how many batches of 10 questions we've had
        // For 2nd question (index 1): stage 2, for 12th question (index 11): stage 3, for 22nd question (index 21): stage 4, etc.
        const currentStage = Math.floor(nextIndex / 10) + 2;
        console.log(
          `🚀 TRIGGERING generateQuestions API for stage ${currentStage} at question ${
            nextIndex + 1
          }`
        );

        const newQuestions = await generateQuestions(currentStage);

        // Only add questions if we got new ones - append them to the end
        if (newQuestions && newQuestions.length > 0) {
          setQuestions((prev) => [...prev, ...newQuestions]);
          console.log(
            `✅ SUCCESS: Added ${newQuestions.length} new questions to the end of the quiz`
          );
          // Log details about the first question to check its status
          if (newQuestions[0]) {
            console.log(
              `📋 QUESTION DETAILS: First new question ID: ${newQuestions[0].question_id}`
            );
            console.log(
              `📋 QUESTION DETAILS: Question attempted: ${newQuestions[0].question_attempted}`
            );
            console.log(
              `📋 QUESTION DETAILS: User answer: ${newQuestions[0].user_answer}`
            );
            console.log(
              `📋 QUESTION DETAILS: Stage number: ${newQuestions[0].stage_number}`
            );
          }

          questionsGenerated = true;
        } else {
          console.log(
            `⚠️ WARNING: No new questions generated for stage ${currentStage}, continuing with existing questions`
          );
        }
      } catch (error) {
        console.error(
          `❌ ERROR: Failed to generate more questions for stage ${
            Math.floor(nextIndex / 10) + 2
          }:`,
          error
        );
        // Don't show error to user, just continue with existing questions
      } finally {
        setIsGeneratingMore(false);
      }
    }

    // Always advance to next question (whether new questions were generated or not)
    console.log(`➡️ ADVANCING: Moving to question ${nextIndex + 1}`);
    setCurrentQuestionIndex(nextIndex);

    // Check if the next question was already attempted
    if (userAnswers[nextIndex]) {
      // Show the previous answer and result for attempted questions
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
      // Reset for unattempted questions
      setSelectedAnswer(null);
      setShowResult(false);
      setResult(null);
    }
    setTimeSpent(0);
  };

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
            <div className="mb-8">
              <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-10 h-10 text-indigo-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <h1 className="text-4xl font-bold text-gray-800 mb-4">
                Welcome to the Quiz!
              </h1>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                Test your knowledge with our comprehensive quiz. You&apos;ll
                start with 10 questions, and more will be generated
                automatically as you progress through the quiz.
              </p>
            </div>

            {/* Quiz Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-6 h-6 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Smart Progression
                </h3>
                <p className="text-sm text-gray-600">
                  Questions are generated automatically as you progress through
                  the quiz
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-6 h-6 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Instant Feedback
                </h3>
                <p className="text-sm text-gray-600">
                  Get immediate results and explanations for each question
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-6 h-6 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Progress Tracking
                </h3>
                <p className="text-sm text-gray-600">
                  Visual grid shows your progress and question status
                </p>
              </div>
            </div>

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
                <div className="flex items-center gap-3">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Start Quiz
                </div>
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
                    disabled={
                      !selectedAnswer ||
                      isSubmitting ||
                      !!userAnswers[currentQuestionIndex]
                    }
                    className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {isSubmitting
                      ? "Submitting..."
                      : userAnswers[currentQuestionIndex]
                      ? "Already Attempted"
                      : "Submit Answer"}
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

        {/* Question Grid Sidebar - Right Side */}
        <div className="w-64 flex-shrink-0">
          <div className="bg-white rounded-xl shadow-lg p-4 sticky top-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Questions
            </h3>
            <div className="grid grid-cols-5 gap-2">
              {Array.from(
                {
                  length: Math.max(
                    questions.length + (isGeneratingMore ? 10 : 0),
                    10
                  ),
                },
                (_, index) => {
                  const questionNumber = index + 1;
                  const result = questionResults[index];
                  const isCurrent = index === currentQuestionIndex;
                  const isAnswered =
                    result === "correct" || result === "incorrect";
                  const isSkeleton =
                    index >= questions.length && isGeneratingMore;

                  return (
                    <button
                      key={index}
                      onClick={() => {
                        if (index < questions.length) {
                          setCurrentQuestionIndex(index);
                          // If question was already answered, show the previous answer and result
                          if (userAnswers[index]) {
                            setSelectedAnswer(userAnswers[index]);
                            // Always show result for attempted questions
                            setResult({
                              is_correct: result === "correct",
                              correct_answer: questions[index].correct_answer,
                              explanation: questions[index].explanation,
                              question_id: questions[index].question_id,
                              user_answer: userAnswers[index],
                              time_spent: 0,
                            });
                            setShowResult(true);
                          } else {
                            setSelectedAnswer(null);
                            setShowResult(false);
                            setResult(null);
                          }
                          setTimeSpent(0);
                        }
                      }}
                      disabled={index >= questions.length && !isSkeleton}
                      className={`
                        w-10 h-10 rounded-lg text-sm font-medium transition-all duration-200
                        ${
                          isSkeleton
                            ? "bg-gray-200 animate-pulse"
                            : isCurrent
                            ? "bg-indigo-600 text-white ring-2 ring-indigo-300"
                            : isAnswered
                            ? result === "correct"
                              ? "bg-green-500 text-white hover:bg-green-600"
                              : "bg-red-500 text-white hover:bg-red-600"
                            : index < questions.length
                            ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
                            : "bg-gray-100 text-gray-400 cursor-not-allowed"
                        }
                      `}
                    >
                      {isSkeleton ? (
                        <div className="w-4 h-4 bg-gray-300 rounded animate-pulse"></div>
                      ) : (
                        questionNumber
                      )}
                    </button>
                  );
                }
              )}
            </div>
            <div className="mt-4 text-xs text-gray-500">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-3 h-3 bg-green-500 rounded"></div>
                <span>Correct</span>
              </div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-3 h-3 bg-red-500 rounded"></div>
                <span>Incorrect</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-indigo-600 rounded"></div>
                <span>Current</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
