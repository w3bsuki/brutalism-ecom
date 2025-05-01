"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { X } from "lucide-react";

export interface CookieConsentProps {
  // Include any props if needed, or keep empty
}

/**
 * CookieConsent component
 * 
 * A cookie consent banner with options to accept all, essential only, or customize
 */
export function CookieConsent(props: CookieConsentProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already made a cookie choice
    const cookieConsent = localStorage.getItem("cookie-consent");
    if (!cookieConsent) {
      // Show banner after a short delay
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptAll = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setIsVisible(false);
    // Here you would initialize analytics, marketing cookies, etc.
  };

  const acceptEssential = () => {
    localStorage.setItem("cookie-consent", "essential");
    setIsVisible(false);
    // Here you would only initialize essential cookies
  };

  const dismiss = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-3 sm:p-4 bg-white border-t-2 border-black shadow-[0px_-4px_0px_0px_rgba(0,0,0,0.1)]">
      <div className="max-w-7xl mx-auto relative">
        <button 
          onClick={dismiss}
          className="absolute right-2 top-2 p-1 hover:bg-gray-100 rounded-full"
          aria-label="Close cookie consent"
        >
          <X size={20} />
        </button>
        
        <div className="pr-8">
          <h3 className="text-lg font-bold mb-2">Cookie Settings</h3>
          
          <p className="text-sm text-gray-600 mb-4">
            We use cookies to enhance your browsing experience, analyze site traffic, and personalize content.
            By clicking "Accept All", you consent to our use of cookies. Read our{" "}
            <Link href="/cookie-policy" className="text-black font-medium underline hover:text-yellow-600">
              Cookie Policy
            </Link>{" "}
            and{" "}
            <Link href="/privacy-policy" className="text-black font-medium underline hover:text-yellow-600">
              Privacy Policy
            </Link>{" "}
            to learn more.
          </p>
          
          <div className="flex flex-wrap gap-2">
            <button
              onClick={acceptAll}
              className="bg-black text-white font-bold py-2 px-4 border-2 border-black hover:bg-yellow-300 hover:text-black transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
            >
              ACCEPT ALL
            </button>
            
            <button
              onClick={acceptEssential}
              className="bg-white text-black font-bold py-2 px-4 border-2 border-black hover:bg-gray-100 transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
            >
              ESSENTIAL ONLY
            </button>
            
            <Link
              href="/cookie-policy"
              className="bg-gray-100 text-black font-bold py-2 px-4 border-2 border-black hover:bg-gray-200 transition-colors"
            >
              CUSTOMIZE
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 