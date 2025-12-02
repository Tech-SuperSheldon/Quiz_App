"use client";

import { motion } from "framer-motion";

// --- INTERFACES ---
interface QuizHistoryEntry {
  question_id: string;
  question_name: string;
  correct_answer: string;
  explanation?: string;
  user_answer: string;
  is_correct: boolean;
  stage_number: number;
}

interface StageStats {
  correct: number;
  wrong: number;
  accuracy: number;
  xpEarned: number;
  totalTime: number;
}

interface QuizResultSummaryProps {
  stage: number;
  stats: StageStats;
  history: QuizHistoryEntry[];
  onRetake: () => void;
  onContinue: () => void;
  isGeneratingNext: boolean;
  hasMoreStages: boolean;
}

export default function QuizResultSummary({
  stage,
  stats,
  history,
  onRetake,
  onContinue,
  isGeneratingNext,
  hasMoreStages,
}: QuizResultSummaryProps) {

  // --- 1. DEBUGGING: Check what is actually arriving ---
  console.log("--- SUMMARY DEBUG ---");
  console.log("Current Stage Prop:", stage);
  console.log("Full History:", history);
  
  // --- 2. FIX: Convert both to numbers to ensure they match ---
  // We also check if the history item belongs to 'stage' OR 'stage - 1' 
  // (In case the parent already incremented the stage counter)
  const currentStageHistory = history.filter((h) => {
    const historyStage = Number(h.stage_number);
    const targetStage = Number(stage);
    return historyStage === targetStage;
  });

  console.log("Filtered History:", currentStageHistory);
  console.log("Stats Received:", stats);
  // -----------------------------------------------------

  return (
    <div className="max-w-3xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-3xl shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-2">Stage {stage} Complete!</h2>
          <p className="text-indigo-100">Here is how you performed</p>
        </div>

        <div className="p-8">
          {/* XP Earned Badge - DYNAMIC DATA */}
          <div className="flex justify-center mb-8">
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg mb-3 border-4 border-yellow-200">
                <span className="text-4xl">⚡</span>
              </div>
              <span className="text-3xl font-bold text-gray-800">
                +{stats.xpEarned} XP
              </span>
              <span className="text-sm text-gray-500">Level Points Earned</span>
            </div>
          </div>

          {/* Stats Grid - DYNAMIC DATA */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-green-50 p-4 rounded-xl text-center border border-green-100">
              <div className="text-3xl font-bold text-green-600">
                {stats.correct}
              </div>
              <div className="text-xs text-green-800 uppercase font-semibold tracking-wide">
                Correct
              </div>
            </div>
            <div className="bg-red-50 p-4 rounded-xl text-center border border-red-100">
              <div className="text-3xl font-bold text-red-600">
                {stats.wrong}
              </div>
              <div className="text-xs text-red-800 uppercase font-semibold tracking-wide">
                Incorrect
              </div>
            </div>
            <div className="bg-blue-50 p-4 rounded-xl text-center border border-blue-100">
              <div className="text-3xl font-bold text-blue-600">
                {stats.accuracy}%
              </div>
              <div className="text-xs text-blue-800 uppercase font-semibold tracking-wide">
                Accuracy
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl text-center border border-gray-100">
              <div className="text-3xl font-bold text-gray-600">
                {Math.floor(stats.totalTime / 60)}m {stats.totalTime % 60}s
              </div>
              <div className="text-xs text-gray-600 uppercase font-semibold tracking-wide">
                Time Taken
              </div>
            </div>
          </div>

          {/* --- DETAILED REVIEW SECTION (DYNAMIC MAPPING) --- */}
          <div className="mb-8 border-t pt-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Detailed Review & Explanations
            </h3>

            {/* THIS LOOP REPLACES THE HARDCODED "Punctuation" TEXT */}
            <div className="space-y-4 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
              {currentStageHistory.length === 0 ? (
                <p className="text-gray-500 text-center">No history found for this stage.</p>
              ) : (
                currentStageHistory.map((h, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-xl border ${
                      h.is_correct
                        ? "bg-green-50 border-green-200"
                        : "bg-red-50 border-red-200"
                    }`}
                  >
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1">
                        <p className="font-semibold text-gray-800 mb-2">
                          {index + 1}. {h.question_name}
                        </p>

                        {/* User Answer */}
                        <p className="text-sm">
                          <span className="font-medium text-gray-500">
                            Your Answer:{" "}
                          </span>
                          <span
                            className={
                              h.is_correct
                                ? "text-green-700"
                                : "text-red-600 font-bold"
                            }
                          >
                            {h.user_answer}
                          </span>
                        </p>

                        {/* Correct Answer (only show if wrong) */}
                        {!h.is_correct && (
                          <p className="text-sm mt-1">
                            <span className="font-medium text-gray-500">
                              Correct Answer:{" "}
                            </span>
                            <span className="text-green-700 font-medium">
                              {h.correct_answer}
                            </span>
                          </p>
                        )}

                        {/* --- EXPLANATION BLOCK --- */}
                        {h.explanation && (
                          <div className="mt-3 p-3 bg-white/60 rounded-lg border border-gray-200 text-sm text-gray-700">
                            <span className="font-bold text-indigo-600">💡 Explanation: </span>
                            {h.explanation}
                          </div>
                        )}

                      </div>
                      <span className="text-xl">
                        {h.is_correct ? "✅" : "❌"}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* --- ACTION BUTTONS --- */}
          <div className="flex flex-col gap-3">
            {/* RETAKE BUTTON (Only shows if there are wrong answers) */}
            {stats.wrong > 0 && (
              <button
                onClick={onRetake}
                className="w-full py-4 bg-white border-2 border-indigo-100 hover:border-indigo-300 hover:bg-indigo-50 text-indigo-700 font-bold rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 text-lg"
              >
                <span>↺</span> Retake {stats.wrong} Wrong Questions
              </button>
            )}

            {/* CONTINUE BUTTON */}
            <button
              onClick={onContinue}
              disabled={isGeneratingNext}
              className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 text-lg"
            >
              {isGeneratingNext ? (
                <>
                  <span className="animate-spin inline-block h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
                  Generating Next Stage...
                </>
              ) : (
                <>
                  {stats.wrong > 0
                    ? "Skip Retake & Continue →"
                    : hasMoreStages 
                      ? `Continue to Stage ${stage + 1} →` 
                      : "Finish Quiz 🎉"}
                </>
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}