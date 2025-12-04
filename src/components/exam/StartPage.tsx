'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Clock, BookOpen, Target, Zap, TrendingUp, Brain, Award } from 'lucide-react';
import { Button } from '../../components/uinew/button';

interface StartPageProps {
  onStartExam: () => void;
  // Added these props for dynamic rendering
  subject?: string;
  courseName?: string;
}

export default function StartPage({ 
  onStartExam, 
  subject = "General", // Default fallback
  courseName = "Assessment" // Default fallback
}: StartPageProps) {
  const [termsAccepted, setTermsAccepted] = React.useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl w-full"
      >
        {/* Header with Animation */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="inline-block mb-4"
          >
            <div className="relative">
              {/* <Brain className="w-24 h-24 text-indigo-600" /> */}
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity
                }}
                className="absolute inset-0 bg-indigo-400 rounded-full blur-xl -z-10"
              />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl font-bold text-gray-800 mb-2 capitalize"
          >
            {/* Dynamic Subject & Course Name */}
            {courseName} {subject} Exam
          </motion.h1>

          {/* <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-gray-600"
          >
            Online Assessment - Batch 1
          </motion.p> */}
        </div>

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl shadow-2xl overflow-hidden"
        >
          {/* Exam Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-b-2 border-gray-100">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-gradient-to-br from-indigo-500 to-indigo-600 p-6 text-white"
            >
              <Clock className="w-10 h-10 mb-3" />
              {/* UPDATED: Time */}
              <div className="text-3xl font-bold mb-1">30 Mins</div>
              <div className="text-indigo-100">Total Duration</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 text-white"
            >
              <BookOpen className="w-10 h-10 mb-3" />
              {/* UPDATED: Questions */}
              <div className="text-3xl font-bold mb-1">10 Qs</div>
              <div className="text-purple-100">Multiple Choice</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-gradient-to-br from-pink-500 to-pink-600 p-6 text-white"
            >
              <Award className="w-10 h-10 mb-3" />
              {/* UPDATED: XP (Assuming 10 XP per question) */}
              <div className="text-3xl font-bold mb-1">100 XP</div>
              <div className="text-pink-100">Maximum Score</div>
            </motion.div>
          </div>

          {/* Instructions Section */}
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Target className="w-6 h-6 text-indigo-600" />
              Exam Instructions
            </h2>

            <div className="space-y-4 mb-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 }}
                className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg"
              >
                <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Time Management</h3>
                  <p className="text-gray-600 text-sm">
                    {/* UPDATED: Instruction Text */}
                    You have <strong>30 minutes</strong> to complete 10 questions. The exam will auto-submit when time expires.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.0 }}
                className="flex items-start gap-4 p-4 bg-green-50 rounded-lg"
              >
                <div className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Navigation</h3>
                  <p className="text-gray-600 text-sm">
                    Use <strong>Previous/Next</strong> buttons or click question numbers to navigate. You can change answers anytime before submitting.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.1 }}
                className="flex items-start gap-4 p-4 bg-yellow-50 rounded-lg"
              >
                <div className="flex-shrink-0 w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Marking System</h3>
                  <p className="text-gray-600 text-sm">
                    Use <strong>"Mark for Review"</strong> to flag difficult questions. <strong>"Clear Response"</strong> to remove your answer.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 }}
                className="flex items-start gap-4 p-4 bg-red-50 rounded-lg"
              >
                <div className="flex-shrink-0 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center font-bold">
                  4
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Warning System</h3>
                  <p className="text-gray-600 text-sm">
                    <strong>Do not switch tabs or windows</strong> during the exam. Maximum 5 warnings allowed. Exceeding may result in auto-submission.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.3 }}
                className="flex items-start gap-4 p-4 bg-purple-50 rounded-lg"
              >
                <div className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold">
                  5
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Scoring & Results</h3>
                  <p className="text-gray-600 text-sm">
                    Earn <strong>10 XP per correct answer</strong> plus accuracy bonus. View detailed explanations after submission.
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Question Status Legend */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 }}
              className="bg-gray-50 rounded-lg p-6 mb-6"
            >
              <h3 className="font-semibold text-gray-800 mb-4">Question Status Indicators</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center text-white font-bold text-sm">
                    1
                  </div>
                  <span className="text-sm text-gray-700"><strong>Attempted</strong> - Answer selected</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-300 rounded-md flex items-center justify-center text-gray-700 font-bold text-sm">
                    2
                  </div>
                  <span className="text-sm text-gray-700"><strong>Unattempted</strong> - Not answered</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-yellow-500 rounded-md flex items-center justify-center text-white font-bold text-sm">
                    3
                  </div>
                  <span className="text-sm text-gray-700"><strong>Marked</strong> - Flagged for review</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-orange-500 rounded-md flex items-center justify-center text-white font-bold text-sm">
                    4
                  </div>
                  <span className="text-sm text-gray-700"><strong>Answered & Marked</strong> - Both</span>
                </div>
              </div>
            </motion.div>

            {/* Terms & Conditions */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="mb-6"
            >
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="mt-1 w-5 h-5 accent-indigo-600 cursor-pointer"
                />
                <span className="text-sm text-gray-700 group-hover:text-gray-900">
                  I have read and understood all instructions. I agree to follow the exam rules and maintain academic integrity.
                </span>
              </label>
            </motion.div>

            {/* Start Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6 }}
              className="flex flex-col sm:flex-row gap-4 items-center justify-center"
            >
              <Button
                onClick={onStartExam}
                disabled={!termsAccepted}
                className={`
                  w-full sm:w-auto px-8 py-6 text-lg font-bold rounded-xl
                  transition-all duration-300 transform
                  ${termsAccepted 
                    ? 'bg-gradient-to-r from-orange-600 to-orange-600 hover:from-orange-700 hover:to-orange-700 hover:scale-105 shadow-lg hover:shadow-xl' 
                    : 'bg-gray-300 cursor-not-allowed'
                  }
                `}
              >
                <Zap className="w-5 h-5 mr-2 inline" />
                Start Exam Now
              </Button>
            </motion.div>

            {!termsAccepted && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center text-sm text-gray-500 mt-4"
              >
                Please accept the terms and conditions to continue
              </motion.p>
            )}
          </div>

          {/* Footer Tips */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.7 }}
            className="bg-gradient-to-r from-orange-50 to-orange-50 p-6 border-t-2 border-gray-100"
          >
            <div className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-gray-800 mb-1">Pro Tips for Success</h4>
                <p className="text-sm text-gray-600">
                  • Read each question carefully before selecting an answer<br/>
                  • Use the notes section to jot down important points<br/>
                  {/* UPDATED: Time management tip */}
                  • Manage your time - aim for 3 minutes per question<br/>
                  • Review marked questions before submitting<br/>
                  • Stay focused and don't switch tabs
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="text-center mt-6 text-sm text-gray-600"
        >
          <p>Good luck! 🍀 Give your best performance!</p>
        </motion.div>
      </motion.div>
    </div>
  );
}