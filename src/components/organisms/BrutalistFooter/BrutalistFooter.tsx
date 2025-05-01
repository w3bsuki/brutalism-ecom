"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Instagram, Facebook } from "lucide-react";
import { BrutalistFooterProps } from "./types";
import { cn } from "@/lib/utils";

const footerLinks = [
  {
    title: "SHOP",
    links: [
      { name: "ALL PRODUCTS", href: "/collections" },
      { name: "NEW ARRIVALS", href: "/new/arrivals" },
      { name: "BEST SELLERS", href: "/new/best-sellers" },
      { name: "ON SALE", href: "/sale" },
    ],
  },
  {
    title: "COLLECTIONS",
    links: [
      { name: "SNAPBACK", href: "/styles/snapback" },
      { name: "FITTED", href: "/styles/fitted" },
      { name: "DAD HATS", href: "/styles/dad-hats" },
      { name: "BEANIES", href: "/styles/beanies" },
    ],
  },
  {
    title: "COMPANY",
    links: [
      { name: "ABOUT US", href: "/about" },
      { name: "CONTACT", href: "/contact" },
      { name: "STORES", href: "/stores" },
    ],
  },
  {
    title: "HELP",
    links: [
      { name: "SHIPPING & RETURNS", href: "/shipping" },
      { name: "FAQ", href: "/faq" },
      { name: "PRIVACY POLICY", href: "/privacy" },
      { name: "TERMS OF SERVICE", href: "/terms" },
    ],
  },
];

/**
 * BrutalistFooter - The main footer component for the website
 * 
 * Displays links organized by category, newsletter signup, company logo,
 * copyright information, and social media links, all styled with brutalist design elements.
 */
export function BrutalistFooter({ className, ...props }: BrutalistFooterProps) {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className={cn("bg-black text-white border-t-4 theme-accent-border w-full", className)} {...props}>
      {/* Newsletter signup - brutalist style */}
      <div className="w-full theme-accent-bg py-10 border-y-4 border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-black text-black uppercase tracking-tighter leading-none">
                JOIN THE HAT GANG
              </h2>
              <p className="mt-3 text-black font-bold">
                Get 15% off your first order + exclusive drops
              </p>
            </div>

            <div className="w-full md:w-1/2">
              <div className="relative flex">
                <input
                  type="email"
                  placeholder="YOUR EMAIL"
                  className="w-full py-3 px-4 bg-white theme-border text-black font-bold focus:outline-none"
                  aria-label="Email for newsletter"
                />
                <button 
                  className="whitespace-nowrap group inline-flex items-center justify-center bg-black text-white py-3 px-5 theme-border font-bold text-base uppercase hover:bg-white hover:text-black transition-colors"
                  aria-label="Sign up for newsletter"
                >
                  SIGN UP <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
          {footerLinks.map((section) => (
            <div key={section.title} className="relative">
              <h3 className="text-xl font-black uppercase mb-6 text-white tracking-tight inline-block relative">
                {section.title}
                <div className="absolute h-2 w-full theme-accent-bg -bottom-1 left-0 z-0"></div>
              </h3>
              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-white/80 hover:theme-accent-text font-bold transition-colors text-sm tracking-wide"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Logo and social media */}
        <div className="mt-16 pt-8 border-t-4 border-white/20 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start">
            <Link href="/" className="text-3xl font-black text-black uppercase tracking-tighter theme-accent-bg px-3 py-1 transform rotate-1 theme-border inline-block">
              ХУЛИГАНКА
            </Link>
            <p className="mt-2 text-white/60 text-sm">
              © {currentYear} ХУЛИГАНКА LLC. All rights reserved.
            </p>
          </div>
          
          {/* Social media links - brutalist style */}
          <div className="flex gap-3">
            {[
              { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
              { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
            ].map((social, index) => (
              <a
                key={social.href}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className={`bg-white text-black p-2 theme-border theme-hover-accent transform ${index === 0 ? 'rotate-2' : 'rotate-1'}`}
              >
                <social.icon size={20} />
              </a>
            ))}
          </div>
        </div>
        
        {/* Bottom brutalist design element */}
        <div className="mt-8 relative">
          <div className="h-6 theme-accent-bg border-t-4 border-b-4 border-black"></div>
          <div className="absolute top-0 right-0 w-24 h-6 bg-white border-l-4 border-black transform -skew-x-12"></div>
          <div className="absolute top-0 left-1/4 w-12 h-6 bg-black border-r-4 theme-accent-border transform skew-x-12"></div>
        </div>
      </div>
    </footer>
  );
} 