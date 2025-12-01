'use client';

import React, { useState } from 'react';
import { ExamResult } from '../types';
import { Trophy, Clock, Target, TrendingUp, CheckCircle2, XCircle, AlertCircle, BookOpen, Award, Zap, RefreshCw } from 'lucide-react';
import { Button } from '../../components/uinew/button';
import { motion } from 'framer-motion';

interface ResultsPageProps {
  result: ExamResult;
  onRetake: () => void;
}

export default function ResultsPage({ result, onRetake }: ResultsPageProps) {
  const [showExplanations, setShowExplanations] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'correct' | 'wrong' | 'unattempted'>('all');

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours}h ${minutes}m ${secs}s`;
  };

  const getPerformanceLevel = () => {
    if (result.accuracy >= 90) return { text: 'Excellent', color: 'text-green-600', bgColor: 'bg-green-100' };
    if (result.accuracy >= 75) return { text: 'Very Good', color: 'text-blue-600', bgColor: 'bg-blue-100' };
    if (result.accuracy >= 60) return { text: 'Good', color: 'text-yellow-600', bgColor: 'bg-yellow-100' };
    if (result.accuracy >= 40) return { text: 'Average', color: 'text-orange-600', bgColor: 'bg-orange-100' };
    return { text: 'Needs Improvement', color: 'text-red-600', bgColor: 'bg-red-100' };
  };

  const performance = getPerformanceLevel();

  const filteredQuestions = result.questionResults.filter(qr => {
    if (selectedFilter === 'correct') return qr.isCorrect;
    if (selectedFilter === 'wrong') return !qr.isCorrect && qr.selectedAnswer !== null;
    if (selectedFilter === 'unattempted') return qr.selectedAnswer === null;
    return true;
  });

  const keyPoints = [
    `You answered ${result.correct} questions correctly out of ${result.attempted} attempted questions.`,
    `Your accuracy rate is ${result.accuracy.toFixed(1)}%, which is ${performance.text.toLowerCase()}.`,
    `You earned ${result.xp} XP points for this exam.`,
    result.wrong > 0 ? `Review the ${result.wrong} incorrect answers to improve your understanding.` : 'Perfect score! All attempted questions were correct!',
    result.unattempted > 0 ? `You left ${result.unattempted} questions unattempted. Try to complete all questions next time.` : 'Great job completing all questions!',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-4 pb-12">
      <div className="max-w-7xl mx-auto">
        {/* Header with Success Animation */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 mt-8"
        >
          <motion.div
            initial={{ rotate: -180, scale: 0 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="inline-block mb-4"
          >
            <Trophy className="w-24 h-24 text-yellow-500" />
          </motion.div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Exam Completed!</h1>
          <p className="text-xl text-gray-600">Here's how you performed</p>
        </motion.div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* XP Card */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl p-6 text-white shadow-lg"
          >
            <div className="flex items-center justify-between mb-2">
              <Zap className="w-8 h-8" />
              <Award className="w-6 h-6 opacity-50" />
            </div>
            <div className="text-5xl font-bold mb-1">{result.xp}</div>
            <div className="text-purple-100">XP Earned</div>
            <div className="mt-4 text-sm opacity-75">
              {result.xp >= 200 ? '🏆 Amazing!' : result.xp >= 100 ? '⭐ Great!' : '💪 Keep going!'}
            </div>
          </motion.div>

          {/* Time Card */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl p-6 text-white shadow-lg"
          >
            <div className="flex items-center justify-between mb-2">
              <Clock className="w-8 h-8" />
              <Target className="w-6 h-6 opacity-50" />
            </div>
            <div className="text-3xl font-bold mb-1">{formatTime(result.timeTaken)}</div>
            <div className="text-blue-100">Time Taken</div>
            <div className="mt-4 text-sm opacity-75">
              Avg: {(result.timeTaken / result.totalQuestions).toFixed(0)}s per question
            </div>
          </motion.div>

          {/* Accuracy Card */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-6 text-white shadow-lg"
          >
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="w-8 h-8" />
              <CheckCircle2 className="w-6 h-6 opacity-50" />
            </div>
            <div className="text-5xl font-bold mb-1">{result.accuracy.toFixed(1)}%</div>
            <div className="text-green-100">Accuracy</div>
            <div className={`mt-4 px-3 py-1 rounded-full text-sm inline-block ${performance.bgColor} ${performance.color} font-semibold`}>
              {performance.text}
            </div>
          </motion.div>
        </div>

        {/* Summary Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-8"
        >
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-indigo-600" />
            Exam Summary
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-3xl font-bold text-gray-800">{result.totalQuestions}</div>
              <div className="text-sm text-gray-600 mt-1">Total Questions</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-3xl font-bold text-blue-600">{result.attempted}</div>
              <div className="text-sm text-gray-600 mt-1">Attempted</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-3xl font-bold text-green-600">{result.correct}</div>
              <div className="text-sm text-gray-600 mt-1">Correct</div>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <div className="text-3xl font-bold text-red-600">{result.wrong}</div>
              <div className="text-sm text-gray-600 mt-1">Wrong</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-3xl font-bold text-gray-600">{result.unattempted}</div>
              <div className="text-sm text-gray-600 mt-1">Unattempted</div>
            </div>
          </div>

          {/* Key Points */}
          <div className="bg-indigo-50 rounded-lg p-6">
            <h3 className="font-bold text-lg mb-3 text-indigo-900">📌 Key Points</h3>
            <ul className="space-y-2">
              {keyPoints.map((point, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-indigo-600 mt-1">•</span>
                  <span className="text-gray-700">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-3 mb-6">
          <Button
            onClick={() => setSelectedFilter('all')}
            className={selectedFilter === 'all' ? 'bg-indigo-600' : 'bg-gray-400'}
          >
            All Questions ({result.totalQuestions})
          </Button>
          <Button
            onClick={() => setSelectedFilter('correct')}
            className={selectedFilter === 'correct' ? 'bg-green-600' : 'bg-gray-400'}
          >
            <CheckCircle2 className="w-4 h-4 mr-2" />
            Correct ({result.correct})
          </Button>
          <Button
            onClick={() => setSelectedFilter('wrong')}
            className={selectedFilter === 'wrong' ? 'bg-red-600' : 'bg-gray-400'}
          >
            <XCircle className="w-4 h-4 mr-2" />
            Wrong ({result.wrong})
          </Button>
          <Button
            onClick={() => setSelectedFilter('unattempted')}
            className={selectedFilter === 'unattempted' ? 'bg-gray-600' : 'bg-gray-400'}
          >
            <AlertCircle className="w-4 h-4 mr-2" />
            Unattempted ({result.unattempted})
          </Button>
        </div>

        {/* Questions Review */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="space-y-4"
        >
          <h2 className="text-2xl font-bold mb-4">Detailed Review</h2>
          {filteredQuestions.map((qr, index) => {
            const allOptions = ['A', 'B', 'C', 'D'];
            return (
              <div
                key={qr.questionId}
                className={`bg-white rounded-xl shadow-md p-6 border-l-4 ${
                  qr.selectedAnswer === null
                    ? 'border-gray-400'
                    : qr.isCorrect
                    ? 'border-green-500'
                    : 'border-red-500'
                }`}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                    qr.selectedAnswer === null
                      ? 'bg-gray-100'
                      : qr.isCorrect
                      ? 'bg-green-100'
                      : 'bg-red-100'
                  }`}>
                    {qr.selectedAnswer === null ? (
                      <AlertCircle className="w-6 h-6 text-gray-500" />
                    ) : qr.isCorrect ? (
                      <CheckCircle2 className="w-6 h-6 text-green-600" />
                    ) : (
                      <XCircle className="w-6 h-6 text-red-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2">
                      Q{qr.questionId}. {qr.question}
                    </h3>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {qr.selectedAnswer !== null && (
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          qr.isCorrect
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        }`}>
                          Your Answer: {allOptions[qr.selectedAnswer]}
                        </span>
                      )}
                      {!qr.isCorrect && (
                        <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-700">
                          Correct Answer: {allOptions[qr.correctAnswer]}
                        </span>
                      )}
                      {qr.selectedAnswer === null && (
                        <span className="px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700">
                          Not Attempted
                        </span>
                      )}
                    </div>
                    {showExplanations && (
                      <div className="bg-blue-50 rounded-lg p-4 mt-3">
                        <div className="flex items-start gap-2">
                          <BookOpen className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <div className="font-semibold text-blue-900 mb-1">Explanation:</div>
                            <div className="text-gray-700 text-sm leading-relaxed">
                              {qr.explanation}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 justify-center mt-8">
          <Button
            onClick={() => setShowExplanations(!showExplanations)}
            variant="outline"
            className="border-2 border-indigo-300"
          >
            {showExplanations ? 'Hide' : 'Show'} Explanations
          </Button>
          <Button
            onClick={onRetake}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Retake Exam
          </Button>
        </div>
      </div>
    </div>
  );
}
