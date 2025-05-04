"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, Search, ShoppingBag, X, ChevronDown, Instagram, ChevronRight, Heart, Percent } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/hooks/use-cart";
import { useWishlist } from "@/hooks/use-wishlist";
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
  const { items: wishlistItems } = useWishlist();
  const wishlistCount = wishlistItems.length;
  
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
    
    if (input.value) {
      // In a real application, redirect to search results page
      // For now, we'll just close the search modal
      setDesktopSearchOpen(false);
      setMobileSearchOpen(false);
    }
  };

  const handleSearch = (term: string) => {
    // In a real application, this would initiate a search
    // For now we'll close the search modal
    setDesktopSearchOpen(false);
    setMobileSearchOpen(false);
  };

  return (
    <header 
      className={`sticky top-0 z-40 bg-black transition-all duration-300 border-4 border-[color:hsl(var(--theme-primary))] w-full ${
        scrolled ? "py-2 sm:py-3" : "py-3 sm:py-5"
      }`}
    >
      {/* Subtle diagonal pattern for brutalist style */}
      <div className="absolute inset-0 w-full h-full opacity-5 pointer-events-none" 
        style={{ 
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 20px, hsla(var(--theme-primary), 0.3) 20px, hsla(var(--theme-primary), 0.3) 22px)',
          backgroundSize: '30px 30px'
        }} 
      />
      
      <div className="w-[95%] mx-auto relative z-10">
        <div className="flex items-center justify-between">
          {/* Left - Logo with Social Icons */}
          <div className="flex items-center gap-4 relative py-3">
            {/* Logo with social icons inside and theme toggle inside on the left */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="text-lg sm:text-xl md:text-2xl font-black tracking-tight text-white relative z-10 border-[3px] border-[color:hsl(var(--theme-primary))] p-2 flex items-center">
                  {/* Theme toggle inside logo on the left */}
                  <div className="flex items-center mr-2 border-r-2 border-[color:hsl(var(--theme-primary))] pr-2">
                    <ThemeToggle className="scale-75" />
                  </div>
                  
                  <Link 
                    href="/" 
                    className="font-mono hover:text-[color:hsl(var(--theme-primary))] transition-colors"
                  >
                    <span className="hidden sm:inline">INDECISIVE WEAR</span>
                    <span className="sm:hidden">I-WEAR</span>
                  </Link>
                  
                  <div className="h-5 mx-2 border-l-2 border-[color:hsl(var(--theme-primary))]"></div>
                  
                  <div className="hidden sm:flex items-center gap-2">
                    <div className="relative group z-20">
                      <a
                        href="https://instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-transparent p-1.5 flex items-center justify-center border-[2px] border-[color:hsl(var(--theme-primary))] text-[color:hsl(var(--theme-primary))] group-hover:bg-[color:hsl(var(--theme-primary))] group-hover:text-black transition-all cursor-pointer"
                        aria-label="Instagram"
                      >
                        <Instagram size={16} strokeWidth={2.5} />
                      </a>
                      {/* White glow border */}
                      <div className="absolute -inset-1 border border-white opacity-0 group-hover:opacity-60 transition-opacity pointer-events-none"></div>
                    </div>
                    
                    <div className="relative group z-20">
                      <a
                        href="https://tiktok.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-transparent p-1.5 flex items-center justify-center border-[2px] border-[color:hsl(var(--theme-primary))] text-[color:hsl(var(--theme-primary))] group-hover:bg-[color:hsl(var(--theme-primary))] group-hover:text-black transition-all cursor-pointer"
                        aria-label="TikTok"
                      >
                        <svg 
                          width="16" 
                          height="16" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          xmlns="http://www.w3.org/2000/svg"
                          className="fill-current"
                        >
                          <path d="M19.321 5.562a5.122 5.122 0 0 1-3.664-1.514 5.12 5.12 0 0 1-1.514-3.664h-3.844v12.926c0 1.614-1.312 2.926-2.926 2.926a2.927 2.927 0 0 1-2.927-2.926 2.927 2.927 0 0 1 2.927-2.927c.323 0 .634.052.926.149V6.488a6.963 6.963 0 0 0-.926-.062C3.736 6.426 0 10.163 0 14.8c0 4.636 3.736 8.373 8.373 8.373 4.638 0 8.374-3.737 8.374-8.373V9.146a9.064 9.064 0 0 0 5.316 1.703v-3.844c-.94 0-1.84-.149-2.742-.443z"/>
                        </svg>
                      </a>
                      {/* White glow border */}
                      <div className="absolute -inset-1 border border-white opacity-0 group-hover:opacity-60 transition-opacity pointer-events-none"></div>
                    </div>
                  </div>
                </div>
                <div className="absolute -inset-1 border border-white opacity-40 pointer-events-none"></div>
              </div>
            </div>
          </div>

          {/* Middle - Desktop Navigation - Fixed to be perfectly centered */}
          <div className="hidden md:flex justify-center absolute left-0 right-0 mx-auto">
            <nav className="flex items-center justify-center gap-6">
              {navItems.map((item) => (
                <div
                  key={item.label}
                  className="relative group"
                  onMouseEnter={() => handleMouseEnter(item.label)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    href={item.href}
                    className="flex items-center text-white font-mono font-bold text-sm tracking-widest py-1 px-3 relative uppercase border-y-2 border-transparent hover:border-[color:hsl(var(--theme-primary))] transition-all duration-200 hover:translate-x-[2px] hover:translate-y-[-2px] hover:shadow-[2px_-2px_0_hsla(var(--theme-primary),0.6)]"
                  >
                    {item.label}
                    {item.children && (
                      <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-300 ${activeDropdown === item.label ? "rotate-180 text-[color:hsl(var(--theme-primary))]" : ""}`} />
                    )}
                    <span className="absolute left-0 -bottom-1 w-full h-[3px] bg-[color:hsl(var(--theme-primary))] scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></span>
                  </Link>
                  
                  <AnimatePresence>
                    {item.children && activeDropdown === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 w-60 bg-black border-4 border-[color:hsl(var(--theme-primary))] overflow-hidden z-50 shadow-[6px_6px_0px_rgba(0,0,0,1)]"
                      >
                        <div className="py-1">
                          {item.children.map((child) => (
                            <Link
                              key={child.label}
                              href={child.href}
                              className="block px-4 py-2.5 text-sm font-bold text-white tracking-tight border-b border-[color:hsl(var(--theme-primary))] last:border-b-0 hover:bg-[color:hsl(var(--theme-primary))] hover:text-black hover:pl-6 duration-150"
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
                className="text-white hover:text-[color:hsl(var(--theme-primary))] transition-colors relative group bg-transparent p-1 border-2 border-transparent hover:border-[color:hsl(var(--theme-primary))] hover:translate-x-[2px] hover:translate-y-[-2px] hover:shadow-[2px_-2px_0_hsla(var(--theme-primary),0.6)]"
                onClick={toggleDesktopSearch}
                aria-label="Search"
              >
                <Search size={20} strokeWidth={2.5} />
                <span className="absolute left-0 -bottom-1 w-full h-[3px] bg-[color:hsl(var(--theme-primary))] scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></span>
              </button>
            </nav>
          </div>
          
          {/* Right - Icons and Buttons */}
          <div className="flex items-center justify-end flex-shrink-0 gap-3 md:gap-4">
            {/* Mobile Search Button - improved visibility */}
            <button
              className="md:hidden theme-accent-bg text-black border-2 border-white p-1.5 flex items-center justify-center hover:bg-white transition-colors"
              aria-label="Search"
              onClick={toggleMobileSearch}
            >
              <Search size={18} strokeWidth={2.5} />
            </button>

            {/* SHOP & CART Button with glowing effect - Combined */}
            <div className="hidden md:flex items-center gap-3">
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

              {/* Shop Button - In the middle */}
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

              {/* Wishlist Button - On the right */}
              <div className="relative group z-20">
                <Link
                  href="/wishlist"
                  className="theme-accent-bg border-4 border-black font-black uppercase text-black tracking-widest text-base p-2 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all"
                >
                  <div className="relative">
                    <Heart className="h-6 w-6" />
                    <span className="absolute -top-1 -right-1 bg-white text-black text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center border-2 border-black group-hover:scale-110 transition-transform">
                      {wishlistCount}
                    </span>
                  </div>
                </Link>
                {/* White glow border */}
                <div className="absolute -inset-1 border-2 border-white pointer-events-none z-10 opacity-60"></div>
              </div>
            </div>
            
            {/* Mobile Cart Button - improved visibility */}
            <div className="md:hidden flex items-center gap-2">
              <Link
                href="/cart"
                className="theme-accent-bg text-black border-2 border-white p-1.5 flex items-center justify-center hover:bg-white transition-colors group"
              >
                <div className="relative">
                  <ShoppingBag className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 bg-white text-black text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center border border-black group-hover:scale-110 transition-transform">
                    {totalItems}
                  </span>
                </div>
              </Link>
              
              {/* Mobile Wishlist Button */}
              <Link
                href="/wishlist"
                className="theme-accent-bg text-black border-2 border-white p-1.5 flex items-center justify-center hover:bg-white transition-colors group"
              >
                <div className="relative">
                  <Heart className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 bg-white text-black text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center border border-black group-hover:scale-110 transition-transform">
                    {wishlistCount}
                  </span>
                </div>
              </Link>
            </div>
            
            {/* Mobile Menu Button - improved visibility */}
            <button
              className="md:hidden theme-accent-bg text-black border-2 border-white p-1.5 flex items-center justify-center hover:bg-white transition-colors"
              onClick={() => {
                setMobileMenuOpen(!mobileMenuOpen);
                if (mobileSearchOpen) {
                  setMobileSearchOpen(false);
                }
              }}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? (
                <X size={20} strokeWidth={2.5} />
              ) : (
                <Menu size={20} strokeWidth={2.5} />
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
                                  className="text-gray-300 font-bold text-lg py-1 hover:text-[color:hsl(var(--theme-primary))] transition-colors flex items-center group border-b border-transparent hover:border-[color:hsl(var(--theme-primary))]"
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
                  
                  {/* Mobile Wishlist Button */}
                  <Link
                    href="/wishlist"
                    className="relative inline-block group"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <div className="relative bg-[color:hsl(var(--theme-primary))] border-4 border-black font-black uppercase text-black tracking-widest px-6 py-3.5 text-center text-xl z-10 flex items-center justify-center gap-2 group-hover:bg-black group-hover:text-white transition-colors duration-200">
                      <Heart className="h-5 w-5" />
                      <span className="relative">
                        WISHLIST
                        <span className="absolute -top-3 -right-3 bg-white text-black text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center border-2 border-black group-hover:scale-110 transition-transform">
                          {wishlistCount}
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
                      className="bg-transparent p-2 flex items-center justify-center border-2 border-[color:hsl(var(--theme-primary))] text-[color:hsl(var(--theme-primary))] group-hover:bg-[color:hsl(var(--theme-primary))] group-hover:text-black transition-all hover:scale-110 cursor-pointer"
                      aria-label="Instagram"
                    >
                      <Instagram size={22} strokeWidth={2.5} />
                    </a>
                    {/* White glow border */}
                    <div className="absolute -inset-1 border-2 border-white pointer-events-none z-10 opacity-60"></div>
                  </div>
                  
                  <div className="flex items-center relative group z-20">
                    <a
                      href="https://tiktok.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-transparent p-2 flex items-center justify-center border-2 border-[color:hsl(var(--theme-primary))] text-[color:hsl(var(--theme-primary))] group-hover:bg-[color:hsl(var(--theme-primary))] group-hover:text-black transition-all hover:scale-110 cursor-pointer"
                      aria-label="TikTok"
                    >
                      <svg 
                        width="22" 
                        height="22" 
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
                  
                  {/* Theme toggle in mobile menu */}
                  <div className="flex items-center relative group z-20">
                    <ThemeToggle className="border-2 border-[color:hsl(var(--theme-primary))]" />
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
                        handleSearch(term);
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