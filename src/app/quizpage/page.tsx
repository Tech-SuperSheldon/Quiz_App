'use client';

import React, { useState, useEffect } from 'react';
import StartPage from '../../components/exam/StartPage';
import ExamStartTransition from '../../components/exam/ExamStartTransition';
import ExamPage from '../../components/exam/ExamPage';
import ResultsPage from '../../components/exam/ResultsPage';
import { motion, AnimatePresence } from 'framer-motion';
import { Question, QuestionStatus, ExamState, ExamResult } from '../../components/types';

export default function QuizPage() {
  const [currentPage, setCurrentPage] = useState<'start' | 'transition' | 'exam' | 'results'>('start');
  const [examState, setExamState] = useState<ExamState | null>(null);
  const [examResult, setExamResult] = useState<ExamResult | null>(null);

  const handleStartExam = () => {
    setCurrentPage('transition');
  };

  const handleTransitionComplete = () => {
    setCurrentPage('exam');
  };

  const handleSubmitExam = (state: ExamState, questions: Question[]) => {
    // Calculate results
    let correct = 0;
    let wrong = 0;
    let attempted = 0;
    let unattempted = 0;

    const questionResults = questions.map(q => {
      const status = state.questionStatuses.find(s => s.questionId === q.id);
      const selectedAnswer = status?.selectedAnswer ?? null;
      const isCorrect = selectedAnswer === q.correctAnswer;

      if (selectedAnswer !== null) {
        attempted++;
        if (isCorrect) correct++;
        else wrong++;
      } else {
        unattempted++;
      }

      return {
        questionId: q.id,
        question: q.question,
        selectedAnswer,
        correctAnswer: q.correctAnswer,
        isCorrect,
        explanation: q.explanation,
      };
    });

    const accuracy = attempted > 0 ? (correct / attempted) * 100 : 0;
    const xp = Math.floor(correct * 10 + accuracy * 0.5);
    const timeTaken = 7200 - state.timeLeft; // 2 hours = 7200 seconds

    const result: ExamResult = {
      totalQuestions: questions.length,
      attempted,
      correct,
      wrong,
      unattempted,
      accuracy,
      xp,
      timeTaken,
      questionResults,
    };

    setExamResult(result);
    setCurrentPage('results');
  };

  const handleRetakeExam = () => {
    setExamResult(null);
    setCurrentPage('start');
  };

  return (
    <div className="min-h-screen mt-20 bg-gray-100">
      <AnimatePresence mode="wait">
        {currentPage === 'start' && (
          <motion.div
            key="start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <StartPage onStartExam={handleStartExam} />
          </motion.div>
        )}

        {currentPage === 'transition' && (
          <ExamStartTransition onComplete={handleTransitionComplete} />
        )}

        {currentPage === 'exam' && (
          <motion.div
            key="exam"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ExamPage onSubmit={handleSubmitExam} />
          </motion.div>
        )}

        {currentPage === 'results' && examResult && (
          <motion.div
            key="results"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <ResultsPage result={examResult} onRetake={handleRetakeExam} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
