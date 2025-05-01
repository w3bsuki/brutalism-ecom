"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, Search, ShoppingBag, X, ChevronDown, Instagram, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/hooks/use-cart";
import { navItems } from "./types";
import { ThemeToggle } from "@/components/atoms/ThemeToggle";
import { Separator } from "@/components/ui/separator";

// Button glow animation
/*
const buttonBlinkVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: [0, 0.6, 0],
    transition: {
      repeat: Infinity,
      duration: 2,
      repeatDelay: 4,
    }
  }
};
*/

/**
 * BrutalistNavbar component
 * 
 * A brutalist-style navigation bar with mobile responsiveness, 
 * dropdown menus, search functionality, and cart integration.
 */
export function BrutalistNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileActiveSubmenu, setMobileActiveSubmenu] = useState<string | null>(null);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  // Separate states for desktop and mobile search
  const [desktopSearchOpen, setDesktopSearchOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  
  const { totalItems } = useCart();
  
  // Refs for click outside detection
  const desktopSearchRef = useRef<HTMLDivElement>(null);
  const desktopSearchButtonRef = useRef<HTMLButtonElement>(null);
  
  // Ensure component renders client-side only
  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen || mobileSearchOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen, mobileSearchOpen]);
  
  // Desktop search click outside handler
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        desktopSearchOpen && 
        desktopSearchRef.current && 
        !desktopSearchRef.current.contains(event.target as Node) &&
        desktopSearchButtonRef.current && 
        !desktopSearchButtonRef.current.contains(event.target as Node)
      ) {
        setDesktopSearchOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [desktopSearchOpen]);

  const handleMouseEnter = (label: string) => {
    setActiveDropdown(label);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  const toggleMobileSubmenu = (label: string) => {
    setMobileActiveSubmenu(prev => prev === label ? null : label);
  };

  // Toggle desktop search popup
  const toggleDesktopSearch = () => {
    setDesktopSearchOpen(!desktopSearchOpen);
  };
  
  // Toggle mobile search
  const toggleMobileSearch = () => {
    setMobileSearchOpen(!mobileSearchOpen);
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  };
  
  // Handle search form submission
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const input = form.querySelector('input') as HTMLInputElement;
    if (input && input.value.trim()) {
      // Implement actual search functionality here
      console.log(`Searching for: ${input.value}`);
      // Replace with your actual search implementation
      // For example: router.push(`/search?q=${encodeURIComponent(input.value)}`);
      
      // Clear the input and close search after submitting
      input.value = '';
      setDesktopSearchOpen(false);
      setMobileSearchOpen(false);
    }
  };

  return (
    <header 
      className={`sticky top-0 z-40 bg-black transition-all duration-300 border-4 border-[color:hsl(var(--theme-primary))] w-full ${
        scrolled ? "py-2 sm:py-3" : "py-3 sm:py-5"
      }`}
    >
      <div className="w-[95%] mx-auto">
        <div className="flex items-center justify-between">
          {/* Left - Logo and Social Icons */}
          <div className="flex items-center gap-4 relative py-3">
            {/* Main border with pulsing animation - ADDED back with new styling */}
            
            <div className="relative">
              <Link 
                href="/" 
                className="text-xl sm:text-2xl font-black tracking-tight text-white relative group truncate flex items-center gap-3 z-10 border-[4px] border-[color:hsl(var(--theme-primary))] p-2 hover:bg-[color:hsl(var(--theme-primary))] hover:text-black transition-all duration-300"
              >
                INDECISIVE WEAR
                <div className="flex items-center border-l-2 border-[color:hsl(var(--theme-primary))] pl-2">
                  <ThemeToggle />
                </div>
              </Link>
              <div className="absolute -inset-1 border border-white opacity-40 pointer-events-none"></div>
            </div>

            {/* Shadcn Separator between logo and social icons */}
            <div className="relative h-12 mx-3 flex items-center">
              <Separator orientation="vertical" className="h-full w-3 bg-[color:hsl(var(--theme-primary))]" />
              <div className="absolute inset-0 -m-0.5 border border-white opacity-40 pointer-events-none"></div>
            </div>
            
            {/* Social Media Icons - Improved styling */}
            <div className="hidden md:flex items-center gap-3 z-10 relative">
              <div className="flex items-center relative group z-20">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="theme-accent-bg p-2 flex items-center justify-center border-2 border-black group-hover:bg-black group-hover:text-white transition-all"
                  aria-label="Instagram"
                >
                  <Instagram size={18} strokeWidth={2.5} />
                </a>
                {/* White glow border */}
                <div className="absolute -inset-1 border-2 border-white pointer-events-none z-10 opacity-60"></div>
              </div>
              
              <div className="flex items-center relative group z-20">
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="theme-accent-bg p-2 flex items-center justify-center border-2 border-black group-hover:bg-black group-hover:text-white transition-all"
                  aria-label="TikTok"
                >
                  <svg 
                    width="18" 
                    height="18" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    className="fill-current"
                  >
                    <path d="M19.321 5.562a5.122 5.122 0 0 1-3.664-1.514 5.12 5.12 0 0 1-1.514-3.664h-3.844v12.926c0 1.614-1.312 2.926-2.926 2.926a2.927 2.927 0 0 1-2.927-2.926 2.927 2.927 0 0 1 2.927-2.927c.323 0 .634.052.926.149V6.488a6.963 6.963 0 0 0-.926-.062C3.736 6.426 0 10.163 0 14.8c0 4.636 3.736 8.373 8.373 8.373 4.638 0 8.374-3.737 8.374-8.373V9.146a9.064 9.064 0 0 0 5.316 1.703v-3.844c-.94 0-1.84-.149-2.742-.443z"/>
                  </svg>
                </a>
                {/* White glow border */}
                <div className="absolute -inset-1 border-2 border-white pointer-events-none z-10 opacity-60"></div>
              </div>
            </div>
          </div>

          {/* Middle - Desktop Navigation - Fixed to be perfectly centered */}
          <div className="hidden md:flex justify-center absolute left-0 right-0 mx-auto">
            <nav className="flex items-center justify-center gap-8">
              {navItems.map((item) => (
                <div
                  key={item.label}
                  className="relative group"
                  onMouseEnter={() => handleMouseEnter(item.label)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    href={item.href}
                    className="flex items-center text-white font-black text-sm tracking-widest hover:theme-accent-text transition-colors py-1 relative uppercase"
                  >
                    {item.label}
                    {item.children && (
                      <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-300 ${activeDropdown === item.label ? "rotate-180 theme-accent-text" : ""}`} />
                    )}
                    <span className="absolute left-0 -bottom-1 w-full h-[3px] theme-accent-bg scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></span>
                  </Link>
                  
                  <div className={`absolute h-[3px] -bottom-1 left-0 theme-accent-bg transition-all duration-300 ${
                    activeDropdown === item.label ? "w-full" : "w-0"
                  }`} />
                  
                  <AnimatePresence>
                    {item.children && activeDropdown === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 w-60 bg-white border-4 border-black overflow-hidden z-50 theme-shadow"
                      >
                        <div className="py-1">
                          {item.children.map((child) => (
                            <Link
                              key={child.label}
                              href={child.href}
                              className="block px-4 py-2.5 text-sm font-bold text-black tracking-tight theme-hover-accent border-b border-black last:border-b-0 hover:pl-6 duration-150"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
              
              {/* Search Icon in Navigation */}
              <button
                ref={desktopSearchButtonRef}
                className="text-white hover:theme-accent-text transition-colors relative group"
                onClick={toggleDesktopSearch}
                aria-label="Search"
              >
                <Search size={20} strokeWidth={2.5} />
                <span className="absolute left-0 -bottom-1 w-full h-[3px] theme-accent-bg scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></span>
              </button>
            </nav>
          </div>
          
          {/* Right - Icons and Buttons */}
          <div className="flex items-center justify-end flex-shrink-0 gap-2 md:gap-4">
            {/* Mobile Search Button */}
            <button
              className="md:hidden text-white hover:theme-accent-text transition-colors p-1.5"
              aria-label="Search"
              onClick={toggleMobileSearch}
            >
              <Search size={20} strokeWidth={2.5} />
            </button>

            {/* SHOP & CART Button with glowing effect - Combined */}
            <div className="hidden md:flex items-center gap-3">
              {/* Shop Button */}
              <div className="relative group z-20">
                <Link 
                  href="/shop"
                  className="theme-accent-bg border-4 border-black font-black uppercase text-black tracking-widest text-base px-6 py-2 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all"
                >
                  SHOP
                </Link>
                {/* White glow border */}
                <div className="absolute -inset-1 border-2 border-white pointer-events-none z-10 opacity-60"></div>
              </div>

              {/* Cart Button */}
              <div className="relative group z-20">
                <Link
                  href="/cart"
                  className="theme-accent-bg border-4 border-black font-black uppercase text-black tracking-widest text-base p-2 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all"
                >
                  <div className="relative">
                    <ShoppingBag className="h-6 w-6" />
                    <span className="absolute -top-1 -right-1 bg-white text-black text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center border-2 border-black group-hover:scale-110 transition-transform">
                      {totalItems}
                    </span>
                  </div>
                </Link>
                {/* White glow border */}
                <div className="absolute -inset-1 border-2 border-white pointer-events-none z-10 opacity-60"></div>
              </div>
            </div>
            
            {/* Mobile Cart Button */}
            <Link
              href="/cart"
              className="md:hidden relative p-1.5 text-white hover:theme-accent-text transition-colors group"
            >
              <div className="relative">
                <ShoppingBag className="h-6 w-6" />
                <span className="absolute -top-1 -right-1 theme-accent-bg text-black text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center border-2 border-black group-hover:scale-110 transition-transform">
                  {totalItems}
                </span>
              </div>
            </Link>
            
            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white p-1.5"
              onClick={() => {
                setMobileMenuOpen(!mobileMenuOpen);
                if (mobileSearchOpen) {
                  setMobileSearchOpen(false);
                }
              }}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? (
                <X size={24} strokeWidth={2.5} />
              ) : (
                <Menu size={24} strokeWidth={2.5} />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Desktop Search Popup */}
      {desktopSearchOpen && (
        <div 
          ref={desktopSearchRef}
          className="absolute z-50 right-[2.5%] top-20 bg-white p-2 border-4 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] md:block"
        >
          <form onSubmit={handleSearchSubmit} className="flex">
            <input
              type="text"
              placeholder="Search..."
              className="pl-3 py-2 w-64 border-r-0 border-2 border-black focus:outline-none"
              autoFocus
            />
            <button 
              type="submit"
              className="bg-[color:hsl(var(--theme-primary))] border-2 border-black py-2 px-4 font-bold hover:bg-black hover:text-[color:hsl(var(--theme-primary))] transition-colors"
            >
              GO
            </button>
          </form>
          <button 
            onClick={() => setDesktopSearchOpen(false)}
            className="absolute -top-2 -right-2 bg-black text-white w-5 h-5 rounded-full flex items-center justify-center border-2 border-white"
            aria-label="Close search"
            title="Close search"
          >
            <X size={12} />
          </button>
        </div>
      )}

      {/* Mobile Search Bar */}
      {mobileSearchOpen && (
        <div className="md:hidden fixed inset-x-0 top-[59px] sm:top-[73px] z-50 px-4 pt-4 pb-6 bg-black border-4 border-t-0 border-[color:hsl(var(--theme-primary))]">
          <div className="w-[95%] mx-auto">
            <form onSubmit={handleSearchSubmit} className="relative">
              <Search
                size={18}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search..."
                className="pl-11 pr-24 py-3 w-full border-3 border-black font-medium focus:outline-none focus:ring-0 focus:border-[color:hsl(var(--theme-primary))]"
                autoFocus
              />
              <button 
                type="submit"
                className="absolute right-0 top-0 h-full px-4 bg-[color:hsl(var(--theme-primary))] border-l-3 border-black font-bold text-sm uppercase hover:bg-black hover:text-[color:hsl(var(--theme-primary))] transition-colors"
              >
                Search
              </button>
            </form>
            <div className="flex justify-end mt-3">
              <button 
                onClick={() => setMobileSearchOpen(false)}
                className="text-white text-sm font-bold flex items-center hover:text-[color:hsl(var(--theme-primary))] transition-colors"
              >
                <X size={16} className="mr-1" />
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile menu full screen overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden fixed inset-0 top-[59px] sm:top-[73px] bg-black border-4 border-t-0 border-[color:hsl(var(--theme-primary))] overflow-auto pb-20 z-50"
          >
            {/* Diagonal pattern for brutalist style */}
            <div className="absolute inset-0 w-full h-full opacity-5 pointer-events-none z-0" 
              style={{ 
                backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 20px, #FDE047 20px, #FDE047 22px)',
                backgroundSize: '50px 50px'
              }} 
            />
            
            <div className="w-[95%] mx-auto p-6 relative z-10">
              <nav className="flex flex-col divide-y-2 divide-gray-800">
                {navItems.map((item) => (
                  <div key={item.label} className="py-4">
                    <div className="flex items-center justify-between">
                      {!item.children ? (
                        <Link 
                          href={item.href}
                          className="text-white text-2xl font-black tracking-tight hover:text-[color:hsl(var(--theme-primary))] transition-colors relative group"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {item.label}
                          <span className="absolute -bottom-1 left-0 w-0 h-1 bg-[color:hsl(var(--theme-primary))] group-hover:w-full transition-all duration-300 ease-in-out"></span>
                        </Link>
                      ) : (
                        <button
                          className="flex items-center justify-between w-full text-left text-white text-2xl font-black tracking-tight group"
                          onClick={() => toggleMobileSubmenu(item.label)}
                        >
                          <div className="relative">
                            <span>{item.label}</span>
                            <span className={`absolute -bottom-1 left-0 h-1 bg-[color:hsl(var(--theme-primary))] transition-all duration-300 ease-in-out ${
                              mobileActiveSubmenu === item.label ? "w-full" : "w-0"
                            }`}></span>
                          </div>
                          <div className={`w-8 h-8 flex items-center justify-center bg-[color:hsl(var(--theme-primary))] rounded-none border-2 border-black transform transition-all duration-300 ${
                            mobileActiveSubmenu === item.label ? "rotate-90 bg-white" : ""
                          }`}>
                            <ChevronRight
                              className="w-5 h-5 text-black"
                            />
                          </div>
                        </button>
                      )}
                    </div>
                    
                    {/* Mobile Submenu */}
                    {item.children && (
                      <AnimatePresence>
                        {mobileActiveSubmenu === item.label && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="mt-3 ml-4 overflow-hidden"
                          >
                            <div className="flex flex-col space-y-3 border-l-4 border-[color:hsl(var(--theme-primary))] pl-4">
                              {item.children.map((child) => (
                                <Link
                                  key={child.label}
                                  href={child.href}
                                  className="text-gray-300 font-bold text-lg py-1 hover:text-[color:hsl(var(--theme-primary))] transition-colors flex items-center group"
                                  onClick={() => setMobileMenuOpen(false)}
                                >
                                  <span className="w-2 h-2 bg-[color:hsl(var(--theme-primary))] mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                  {child.label}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    )}
                  </div>
                ))}
              </nav>

              {/* Mobile Shop Button */}
              <div className="mt-8">
                <div className="flex flex-col sm:flex-row gap-3 w-full">
                  <Link
                    href="/shop"
                    className="relative inline-block group"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <div className="relative bg-[color:hsl(var(--theme-primary))] border-4 border-black font-black uppercase text-black tracking-widest px-6 py-3.5 text-center text-xl z-10 flex items-center justify-center gap-2 group-hover:bg-black group-hover:text-white transition-colors duration-200">
                      <span>SHOP NOW</span>
                      <ChevronRight className="w-5 h-5" />
                      <span className="absolute inset-0 bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out -z-10"></span>
                    </div>
                    <div className="absolute inset-0 bg-white border-4 border-black translate-x-3 translate-y-3 -z-10"></div>
                  </Link>

                  <Link
                    href="/cart"
                    className="relative inline-block group"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <div className="relative bg-[color:hsl(var(--theme-primary))] border-4 border-black font-black uppercase text-black tracking-widest px-6 py-3.5 text-center text-xl z-10 flex items-center justify-center gap-2 group-hover:bg-black group-hover:text-white transition-colors duration-200">
                      <ShoppingBag className="h-5 w-5" />
                      <span className="relative">
                        CART
                        <span className="absolute -top-3 -right-3 bg-white text-black text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center border-2 border-black group-hover:scale-110 transition-transform">
                          {totalItems}
                        </span>
                      </span>
                      <span className="absolute inset-0 bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out -z-10"></span>
                    </div>
                    <div className="absolute inset-0 bg-white border-4 border-black translate-x-3 translate-y-3 -z-10"></div>
                  </Link>
                </div>
              </div>
              
              {/* Mobile Social Links */}
              <div className="mt-8 pt-6 border-t-2 border-gray-800">
                <h3 className="text-white font-bold text-lg mb-4 tracking-tight">FOLLOW US</h3>
                <div className="flex items-center gap-4">
                  <div className="flex items-center relative group z-20">
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="theme-accent-bg p-2 flex items-center justify-center border-2 border-black group-hover:bg-black group-hover:text-white transition-all"
                      aria-label="Instagram"
                    >
                      <Instagram size={18} strokeWidth={2.5} />
                    </a>
                    {/* White glow border */}
                    <div className="absolute -inset-1 border-2 border-white pointer-events-none z-10 opacity-60"></div>
                  </div>
                  
                  <div className="flex items-center relative group z-20">
                    <a
                      href="https://tiktok.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="theme-accent-bg p-2 flex items-center justify-center border-2 border-black group-hover:bg-black group-hover:text-white transition-all"
                      aria-label="TikTok"
                    >
                      <svg 
                        width="18" 
                        height="18" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg"
                        className="fill-current"
                      >
                        <path d="M19.321 5.562a5.122 5.122 0 0 1-3.664-1.514 5.12 5.12 0 0 1-1.514-3.664h-3.844v12.926c0 1.614-1.312 2.926-2.926 2.926a2.927 2.927 0 0 1-2.927-2.926 2.927 2.927 0 0 1 2.927-2.927c.323 0 .634.052.926.149V6.488a6.963 6.963 0 0 0-.926-.062C3.736 6.426 0 10.163 0 14.8c0 4.636 3.736 8.373 8.373 8.373 4.638 0 8.374-3.737 8.374-8.373V9.146a9.064 9.064 0 0 0 5.316 1.703v-3.844c-.94 0-1.84-.149-2.742-.443z"/>
                      </svg>
                    </a>
                    {/* White glow border */}
                    <div className="absolute -inset-1 border-2 border-white pointer-events-none z-10 opacity-60"></div>
                  </div>
                </div>
              </div>

              {/* Copyright in mobile menu footer */}
              <div className="border-t-2 border-[color:hsl(var(--theme-primary))] mt-6 py-4 text-center">
                <p className="text-gray-400 text-sm">© {new Date().getFullYear()} INDECISIVE WEAR</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile search overlay */}
      <AnimatePresence>
        {mobileSearchOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 bg-black border-4 border-t-0 border-[color:hsl(var(--theme-primary))] z-50 flex flex-col pt-20"
          >
            <button
              onClick={toggleMobileSearch}
              className="absolute top-4 right-4 p-2 text-white hover:text-[color:hsl(var(--theme-primary))] transition-colors"
              aria-label="Close search"
            >
              <X size={24} />
            </button>
            
            <div className="w-[95%] mx-auto px-6 py-8">
              <h2 className="text-white text-xl font-bold mb-6">Search Products</h2>
              <form onSubmit={handleSearchSubmit} className="relative mb-6">
                <input
                  type="text"
                  placeholder="Search for hats..."
                  className="w-full bg-gray-900 text-white border-2 border-gray-800 p-4 pr-12 focus:outline-none focus:border-[color:hsl(var(--theme-primary))] font-medium rounded-none"
                  autoFocus
                />
                <button
                  type="submit"
                  className="absolute right-0 top-0 h-full px-4 text-white hover:text-[color:hsl(var(--theme-primary))]"
                  aria-label="Search"
                >
                  <Search size={20} />
                </button>
              </form>
              <div className="text-gray-400">
                <p className="mb-4">Popular searches:</p>
                <div className="flex flex-wrap gap-2">
                  {["Snapback", "Dad Hat", "Beanie", "Summer", "Limited"].map((term) => (
                    <button
                      key={term}
                      className="bg-gray-800 text-white px-3 py-1 text-sm hover:bg-[color:hsl(var(--theme-primary))] hover:text-black transition-colors"
                      onClick={() => {
                        // Would typically set search input value
                        console.log(`Search for ${term}`);
                      }}
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
} 