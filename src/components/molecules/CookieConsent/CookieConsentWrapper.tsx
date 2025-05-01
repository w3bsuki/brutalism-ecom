"use client";

import React, { useEffect, useState } from "react";
import { CookieConsent } from "./CookieConsent";

/**
 * Wrapper for the CookieConsent component that handles hydration
 */
export function CookieConsentWrapper() {
  // Use state to avoid hydration mismatch
  const [isMounted, setIsMounted] = useState(false);

  // Only show after client-side hydration is complete
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Don't render anything until after hydration
  if (!isMounted) {
    return null;
  }

  return <CookieConsent />;
} 