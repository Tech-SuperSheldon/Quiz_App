'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, CheckCircle2 } from 'lucide-react';

interface ExamStartTransitionProps {
  onComplete: () => void;
}

export default function ExamStartTransition({ onComplete }: ExamStartTransitionProps) {
  const [countdown, setCountdown] = useState(3);
  const [showReady, setShowReady] = useState(false);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setShowReady(true);
      const readyTimer = setTimeout(() => {
        onComplete();
      }, 1000);
      return () => clearTimeout(readyTimer);
    }
  }, [countdown, onComplete]);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-orange-600 via-orange-500 to-amber-600 flex items-center justify-center z-50">
      <AnimatePresence mode="wait">
        {!showReady ? (
          <motion.div
            key="countdown"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="text-center"
          >
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360]
                }}
                transition={{ duration: 1 }}
                className="text-white mb-6"
              >
              <Zap className="w-24 h-24 mx-auto" />
            </motion.div>
            <motion.div
              key={countdown}
              initial={{ scale: 0, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0, opacity: 0, y: -20 }}
              className="text-9xl font-bold text-white"
            >
              {countdown}
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-2xl text-white/80 mt-4"
            >
              Get Ready!
            </motion.p>
          </motion.div>
        ) : (
          <motion.div
            key="ready"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="text-center"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
              }}
              transition={{ duration: 0.5, repeat: Infinity }}
              className="text-white mb-6"
            >
              <CheckCircle2 className="w-32 h-32 mx-auto" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-6xl font-bold text-white"
            >
              Let's Begin!
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
