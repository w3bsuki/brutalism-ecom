"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WifiOff } from "lucide-react";

export const OfflineNotice = () => {
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    // Check initial network status
    setIsOffline(!navigator.onLine);

    // Add event listeners for online/offline events
    const handleOffline = () => setIsOffline(true);
    const handleOnline = () => setIsOffline(false);

    window.addEventListener('offline', handleOffline);
    window.addEventListener('online', handleOnline);

    return () => {
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('online', handleOnline);
    };
  }, []);

  return (
    <AnimatePresence>
      {isOffline && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          className="fixed top-0 left-0 right-0 bg-red-600 text-white p-3 z-50 shadow-lg"
        >
          <div className="flex items-center justify-center gap-2">
            <WifiOff size={20} />
            <p className="font-space-mono font-bold text-sm">
              You are currently offline. Some features may be limited.
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}; 