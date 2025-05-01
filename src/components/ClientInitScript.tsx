"use client";

import { useEffect } from "react";
import { registerHooks } from "@/lib/register-hooks";

/**
 * ClientInitScript initializes client-side functionality when the app loads.
 * 
 * This component:
 * - Registers necessary hooks and event listeners
 * - Runs once when the application mounts
 * - Returns null (doesn't render any visible UI)
 */
export function ClientInitScript() {
  useEffect(() => {
    registerHooks();
  }, []);
  
  return null;
} 