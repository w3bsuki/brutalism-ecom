"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

let deferredPrompt: any;

export const PWAInstallPrompt = () => {
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
      return;
    }

    // Listen for the beforeinstallprompt event
    window.addEventListener('beforeinstallprompt', (e) => {
      // Prevent Chrome 76+ from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later
      deferredPrompt = e;
      // Show our custom install prompt
      setTimeout(() => {
        setShowInstallPrompt(true);
      }, 3000); // Show after 3 seconds
    });

    // Listen for app installed event
    window.addEventListener('appinstalled', () => {
      // Hide the prompt
      setShowInstallPrompt(false);
      setIsInstalled(true);
      console.log('PWA was installed');
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', () => {});
      window.removeEventListener('appinstalled', () => {});
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    
    // Show the install prompt
    deferredPrompt.prompt();
    
    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    
    // We no longer need the prompt
    deferredPrompt = null;
    
    // Hide our custom install prompt
    setShowInstallPrompt(false);
    
    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
    } else {
      console.log('User dismissed the install prompt');
    }
  };

  const dismissPrompt = () => {
    setShowInstallPrompt(false);
    // Don't show again for this session
    localStorage.setItem('pwaPromptDismissed', 'true');
  };

  // Don't show if already installed or user dismissed
  if (isInstalled || localStorage.getItem('pwaPromptDismissed') === 'true') {
    return null;
  }

  return (
    <AnimatePresence>
      {showInstallPrompt && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 bg-black text-white p-4 z-50 shadow-lg"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-lg font-space-mono font-bold mb-1">Add to Home Screen</h3>
              <p className="text-sm mb-3">Install this app on your device for quick access and offline use.</p>
              <button
                onClick={handleInstallClick}
                className="px-4 py-2 bg-white text-black font-space-mono font-bold hover:bg-gray-200 transition-colors"
              >
                Install
              </button>
            </div>
            <button 
              onClick={dismissPrompt} 
              className="p-1"
              aria-label="Dismiss installation prompt"
            >
              <X size={24} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}; 