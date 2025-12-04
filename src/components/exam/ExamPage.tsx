"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Loader2 } from 'lucide-react';
import Cookies from "js-cookie";
import { getAuthData } from "@/utils/authStorage"; 
import { Button } from '@/components/uinew/button'; 
import { BASE_BACKEND_URL } from "@/config";

const QUESTIONS_PER_STAGE = 10;

// --- TYPES ---
interface ApiQuestion {
  _id: string;
  question_name: string;
  question_options: string[];
  correct_answer: string;
  explanation: string;
  question_category: string;
  difficulty_level: string;
  stage_number: number;
}

export interface UIQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  subject: string;
}

export interface QuestionStatus {
  questionId: string;
  status: 'attempted' | 'unattempted' | 'marked' | 'answered-marked';
  selectedAnswer: number | null;
}

export interface ExamState {
  currentQuestion: number;
  questionStatuses: QuestionStatus[];
  timeLeft: number;
  warnings: number;
  notes: string;
}

interface ExamPageProps {
  // FIX: Explicitly defining the two arguments expected by the parent
  onSubmit: (state: ExamState, questions: UIQuestion[]) => void;
  initialStage?: number;
}

export default function ExamPage({ onSubmit, initialStage = 1 }: ExamPageProps) {
  // --- STATE ---
  const [questions, setQuestions] = useState<UIQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentStage, setCurrentStage] = useState(initialStage);

  // UI State
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questionStatuses, setQuestionStatuses] = useState<QuestionStatus[]>([]);
  const [timeLeft, setTimeLeft] = useState(1800); 
  const [warnings, setWarnings] = useState(0);
  const [notes, setNotes] = useState('');
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- AUTH HELPER ---
  const getTokenAndUserId = useCallback(() => {
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
  }, []);

  // --- API: GENERATE QUESTIONS ---
  const fetchQuestions = useCallback(async (stage: number) => {
    setLoading(true);
    try {
      const { token, userId, course, subject, year } = getTokenAndUserId();

      if (!token || !userId) {
        alert("Authentication missing. Please log in.");
        setLoading(false);
        return;
      }

      console.log(`Generating questions for Stage ${stage}...`);

      const res = await fetch(`${BASE_BACKEND_URL}/api/questions/generate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          user_id: userId,
          course_type: course,
          stage_number: stage,
          grade: year,
          subject: subject,
          num_questions: QUESTIONS_PER_STAGE,
        }),
      });

      if (res.status === 409) {
        alert("Stage already completed! Moving to next...");
        fetchQuestions(stage + 1); 
        setCurrentStage(stage + 1);
        return;
      }

      const data = await res.json();
      const apiQuestions: ApiQuestion[] = data.questions || [];

      const uiQuestions: UIQuestion[] = apiQuestions.map((q) => {
        const correctIndex = q.question_options.findIndex(opt => 
           opt.trim().toLowerCase() === q.correct_answer.trim().toLowerCase()
        );

        return {
          id: q._id,
          question: q.question_name,
          options: q.question_options,
          correctAnswer: correctIndex !== -1 ? correctIndex : 0, 
          explanation: q.explanation,
          subject: q.question_category
        };
      });

      setQuestions(uiQuestions);
      setQuestionStatuses(uiQuestions.map(q => ({
        questionId: q.id,
        status: 'unattempted',
        selectedAnswer: null
      })));

    } catch (err) {
      console.error("Error fetching questions:", err);
      alert("Failed to load questions from AI.");
    } finally {
      setLoading(false);
    }
  }, [getTokenAndUserId]);

  useEffect(() => {
    fetchQuestions(currentStage);
  }, [fetchQuestions, currentStage]);

  useEffect(() => {
    if (loading) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleFinalSubmit(); 
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [loading]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) setWarnings(prev => prev + 1);
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  const handleSelectAnswer = (optionIndex: number) => {
    setQuestionStatuses(prev => prev.map(qs => {
      if (qs.questionId === questions[currentQuestionIndex].id) {
        return {
          ...qs,
          selectedAnswer: optionIndex,
          status: qs.status === 'marked' ? 'answered-marked' : 'attempted'
        };
      }
      return qs;
    }));
  };

  const handleClearResponse = () => {
    setQuestionStatuses(prev => prev.map(qs => {
      if (qs.questionId === questions[currentQuestionIndex].id) {
        return {
          ...qs,
          selectedAnswer: null,
          status: qs.status === 'answered-marked' ? 'marked' : 'unattempted'
        };
      }
      return qs;
    }));
  };

  const handleMarkForReview = () => {
    setQuestionStatuses(prev => prev.map(qs => {
      if (qs.questionId === questions[currentQuestionIndex].id) {
        return {
          ...qs,
          status: qs.selectedAnswer !== null ? 'answered-marked' : 'marked'
        };
      }
      return qs;
    }));
  };

  // --- SUBMISSION LOGIC (FIXED) ---
  const handleFinalSubmit = async () => {
    setIsSubmitting(true);
    setShowSubmitDialog(false);
    const { token } = getTokenAndUserId();

    const answeredQuestions = questionStatuses.filter(qs => qs.selectedAnswer !== null);

    const submissionPromises = answeredQuestions.map(async (qs) => {
        const questionObj = questions.find(q => q.id === qs.questionId);
        if(!questionObj || qs.selectedAnswer === null) return null;

        const answerText = questionObj.options[qs.selectedAnswer]; 

        try {
            const res = await fetch(`${BASE_BACKEND_URL}/api/questions/submit-answer`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({
                    question_id: qs.questionId,
                    user_answer: answerText,
                    time_spent: 60,
                    token,
                }),
            });

            // HANDLE 409: Ignore if already submitted
            if (res.status === 409) return { status: 'already_submitted' };

            return await res.json();
        } catch (e) {
            console.error("Submission failed for Q:", qs.questionId);
            return null;
        }
    });

    await Promise.all(submissionPromises);

    // Construct State Object
    const examState: ExamState = {
        currentQuestion: currentQuestionIndex,
        questionStatuses: questionStatuses,
        timeLeft: timeLeft,
        warnings: warnings,
        notes: notes
    };

    setIsSubmitting(false);

    // FIX: Pass examState as 1st arg, questions array as 2nd arg
    onSubmit(examState, questions);
  };

  // --- RENDER ---
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return { hours, minutes, seconds: secs };
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'attempted': return 'bg-green-500 text-white';
      case 'unattempted': return 'bg-gray-300 text-gray-700';
      case 'marked': return 'bg-yellow-500 text-white';
      case 'answered-marked': return 'bg-orange-500 text-white';
      default: return 'bg-gray-300 text-gray-700';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 gap-4">
         <Loader2 className="w-12 h-12 text-indigo-600 animate-spin" />
         <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-800">Generating Exam Stage {currentStage}</h2>
            <p className="text-gray-500">Our AI is preparing your unique questions...</p>
         </div>
      </div>
    );
  }

  if (questions.length === 0) return <div className="p-10 text-center">No questions loaded.</div>;

  const currentQ = questions[currentQuestionIndex];
  const currentStatus = questionStatuses.find(qs => qs.questionId === currentQ.id);
  const time = formatTime(timeLeft);
  const counts = {
    attempted: questionStatuses.filter(qs => qs.status === 'attempted').length,
    unattempted: questionStatuses.filter(qs => qs.status === 'unattempted').length,
    marked: questionStatuses.filter(qs => qs.status === 'marked').length,
    answeredMarked: questionStatuses.filter(qs => qs.status === 'answered-marked').length,
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-2 bg-gray-200 z-50">
        <motion.div
          className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
          initial={{ width: 0 }}
          animate={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-4">
          {/* Header */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-indigo-200 to-indigo-300 rounded-lg p-4 shadow-sm">
              <div className="text-sm text-indigo-700">Stage {currentStage}</div>
              <div className="font-semibold text-indigo-900 line-clamp-1">{currentQ.subject || 'General'} Exam</div>
              <div className="text-xs text-indigo-600 mt-1">
                Question {currentQuestionIndex + 1} of {questions.length}
              </div>
            </div>

            <div className={`rounded-lg p-4 flex items-center gap-2 shadow-sm ${
              warnings >= 4 ? 'bg-red-200 animate-pulse' : warnings >= 2 ? 'bg-orange-100' : 'bg-yellow-50'
            }`}>
              <AlertTriangle className={`w-5 h-5 ${
                warnings >= 4 ? 'text-red-600' : warnings >= 2 ? 'text-orange-500' : 'text-yellow-600'
              }`} />
              <span className={`font-semibold ${
                warnings >= 4 ? 'text-red-700' : warnings >= 2 ? 'text-orange-700' : 'text-yellow-700'
              }`}>
                Warnings: {warnings}/5
              </span>
            </div>
          </div>

          {/* Status Bar */}
          <div className="bg-white rounded-lg p-4 shadow-sm hidden md:block">
            <div className="flex flex-wrap gap-4 text-xs lg:text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span>Attempted : {counts.attempted}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                <span>Unattempted : {counts.unattempted}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <span>Marked : {counts.marked}</span>
              </div>
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-white rounded-lg p-6 shadow-sm min-h-[400px]">
            <h2 className="text-xl mb-6 font-medium text-gray-800">
              Q {currentQuestionIndex + 1}. {currentQ.question}
            </h2>

            <div className="space-y-3">
              {currentQ.options.map((option, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                    currentStatus?.selectedAnswer === index
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-gray-200 hover:border-indigo-300'
                  }`}
                  onClick={() => handleSelectAnswer(index)}
                >
                  <div className="flex items-center justify-center w-5 h-5 mt-0.5">
                    <input
                      type="checkbox"
                      checked={currentStatus?.selectedAnswer === index}
                      onChange={() => handleSelectAnswer(index)}
                      className="w-4 h-4 accent-indigo-600"
                    />
                  </div>
                  <div>
                    <span className="font-semibold mr-2">{String.fromCharCode(65 + index)}.</span>
                    <span className="text-gray-700">{option}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            <Button
              onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
              disabled={currentQuestionIndex === 0}
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              Previous
            </Button>
            <Button
              onClick={handleClearResponse}
              variant="outline"
              className="border-2 border-gray-300"
            >
              Clear
            </Button>
            <Button
              onClick={handleMarkForReview}
              variant="outline"
              className="border-2 border-yellow-500 text-yellow-700 hover:bg-yellow-50"
            >
              Mark For Review
            </Button>
            <Button
              onClick={() => setCurrentQuestionIndex(prev => Math.min(questions.length - 1, prev + 1))}
              disabled={currentQuestionIndex === questions.length - 1}
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              Next
            </Button>
            <Button
              onClick={() => setShowSubmitDialog(true)}
              className="bg-green-700 hover:bg-green-800 ml-auto"
            >
              Submit Stage
            </Button>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Time Left */}
          <div className="bg-indigo-100 rounded-lg p-4">
            <div className="text-center mb-3 font-semibold text-indigo-900">Time Left</div>
            <div className="grid grid-cols-3 gap-2 text-center text-indigo-800">
              <div>
                <div className="text-2xl font-bold">{String(time.hours).padStart(2, '0')}</div>
                <div className="text-[10px] uppercase">Hours</div>
              </div>
              <div>
                <div className="text-2xl font-bold">{String(time.minutes).padStart(2, '0')}</div>
                <div className="text-[10px] uppercase">Min</div>
              </div>
              <div>
                <div className="text-2xl font-bold">{String(time.seconds).padStart(2, '0')}</div>
                <div className="text-[10px] uppercase">Sec</div>
              </div>
            </div>
          </div>

          {/* Question Palette */}
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="text-center mb-3 font-semibold text-sm">Question Palette</div>
            <div className="grid grid-cols-5 gap-2">
              {questions.map((q, index) => {
                const status = questionStatuses.find(qs => qs.questionId === q.id);
                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentQuestionIndex(index)}
                    className={`aspect-square rounded-md flex items-center justify-center text-sm font-semibold transition-all ${
                      getStatusColor(status?.status || 'unattempted')
                    } ${currentQuestionIndex === index ? 'ring-2 ring-indigo-600 ring-offset-2' : ''}`}
                  >
                    {index + 1}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Notes */}
          <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-100">
            <div className="text-center mb-3 font-semibold text-yellow-800 text-sm">Quick Notes</div>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full h-32 p-3 rounded-lg border border-yellow-200 bg-white focus:border-yellow-400 outline-none resize-none text-sm"
              placeholder="Jot down formulas or hints..."
            />
          </div>
        </div>
      </div>

      {/* Submit Confirmation Dialog */}
      <AnimatePresence>
      {showSubmitDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-xl p-6 max-w-md w-full shadow-2xl"
          >
            <h3 className="text-xl font-bold mb-4 text-gray-900">Submit Stage {currentStage}?</h3>
            <p className="text-gray-600 mb-6">
              You have attempted <span className="font-bold text-indigo-600">{counts.attempted}</span> out of {questions.length} questions.
              <br/><br/>
              <span className="text-sm">Once submitted, you cannot change your answers for this stage.</span>
            </p>
            <div className="flex gap-3 justify-end">
              <Button
                onClick={() => setShowSubmitDialog(false)}
                variant="outline"
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                onClick={handleFinalSubmit}
                className="bg-indigo-600 hover:bg-indigo-700 min-w-[100px]"
                disabled={isSubmitting}
              >
                {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin mx-auto"/> : "Submit"}
              </Button>
            </div>
          </motion.div>
        </div>
      )}
      </AnimatePresence>
    </div>
  );
}