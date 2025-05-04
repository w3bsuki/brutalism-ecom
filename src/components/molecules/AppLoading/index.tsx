"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export const AppLoading = () => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + Math.random() * 10;
        return newProgress > 100 ? 100 : newProgress;
      });
    }, 200);

    // Hide the loading screen after a certain time
    const hideTimeout = setTimeout(() => {
      if (progress >= 100) {
        setIsVisible(false);
      }
    }, 2500);

    return () => {
      clearInterval(interval);
      clearTimeout(hideTimeout);
    };
  }, [progress]);

  // When progress reaches 100, trigger the exit animation
  useEffect(() => {
    if (progress >= 100) {
      const timeout = setTimeout(() => {
        setIsVisible(false);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [progress]);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-white"
    >
      <div className="w-full max-w-sm px-6">
        <h1 className="mb-8 text-center font-space-mono text-3xl font-bold uppercase">
          Brutalist Hats
        </h1>
        
        <div className="relative h-2 w-full overflow-hidden bg-white/20">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="absolute left-0 top-0 h-full bg-white"
          />
        </div>
        
        <div className="mt-4 flex justify-between">
          <span className="font-space-mono text-sm uppercase">{progress.toFixed(0)}%</span>
          <span className="font-space-mono text-sm uppercase">Loading...</span>
        </div>
      </div>
    </motion.div>
  );
}; 