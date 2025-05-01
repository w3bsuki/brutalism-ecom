"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Instagram, X, Heart, MessageCircle } from 'lucide-react';
import { BrutalistTextMarqueeProps } from './types';

export function BrutalistTextMarquee({
  text = "ХУЛИГАНКА",
  bgColor = "bg-black",
  textColor = "text-white",
  borderColor = "theme-accent-border",
  borderSize = "border-y-2",
  removeTopBorder = false,
  instagramUrl = "https://instagram.com/xuliranka",
  speed = 80,
  direction = 'left'
}: BrutalistTextMarqueeProps) {
  const [showModal, setShowModal] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  
  // Calculate animation duration - much slower now
  const duration = 60; // Fixed at 60 seconds for a slow, smooth scroll
  
  // Create 15 items for the marquee (fewer items for better spacing)
  const items = Array(15).fill(null);

  // Simulated Instagram posts
  const instagramPosts = [
    {
      id: 1,
      image: "/images/hats/placeholder.jpg",
      caption: "Limited edition bucket hats dropping this Friday! #ХУЛИГАНКА #streetwear",
      likes: 246,
      comments: 18,
      date: "2 days ago"
    },
    {
      id: 2,
      image: "/images/hats/placeholder1.jpg",
      caption: "Festival season is here. Are you ready? #HatGang #ХУЛИГАНКА",
      likes: 312,
      comments: 24,
      date: "1 week ago"
    },
    {
      id: 3,
      image: "/images/hats/placeholder.jpg",
      caption: "Street style is our lifestyle. #ХУЛИГАНКА #urbanfashion",
      likes: 189,
      comments: 11,
      date: "2 weeks ago"
    }
  ];

  // Determine animation class based on direction
  const primaryAnimationClass = direction === 'right' ? 'animate-marquee-right' : 'animate-marquee';
  const secondaryAnimationClass = direction === 'right' ? 'animate-marquee2-right' : 'animate-marquee2';

  return (
    <div 
      className={`${bgColor} ${textColor} overflow-hidden relative flex items-center justify-center`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Top border - matching SignupCarousel */}
      {!removeTopBorder && <div className={`absolute top-0 left-0 w-full h-2 ${borderColor}`}></div>}
      {/* Bottom border - matching SignupCarousel */}
      <div className={`absolute bottom-0 left-0 w-full h-2 ${borderColor}`}></div>
      
      {/* Diagonal pattern for brutalist style */}
      <div className="absolute inset-0 w-full h-full opacity-10 pointer-events-none z-0" 
        style={{ 
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, currentColor 10px, currentColor 11px)',
          backgroundSize: '30px 30px'
        }} 
      />
      
      <div className="relative w-full overflow-hidden" style={{ height: '70px' }}>
        <div 
          className={`absolute flex whitespace-nowrap ${primaryAnimationClass} ${isPaused ? 'animate-paused' : ''} items-center justify-center h-full`}
          style={{ animationDuration: `${duration}s` }}
        >
          {items.map((_, index) => (
            <div key={index} className="flex items-center h-full">
              <button 
                className="outline-none focus:outline-none mx-10 relative group"
                onClick={() => setShowModal(true)}
              >
                <span className={`text-3xl font-black tracking-tighter cursor-pointer group-hover:text-white transition-colors duration-300 relative z-10 ${textColor}`}>
                  {text}
                </span>
                {/* Hover effect underline */}
                <span className="absolute -bottom-1 left-0 w-0 h-1 bg-white group-hover:w-full transition-all duration-300 ease-in-out"></span>
              </button>
              
              {/* Elegant vertical line separator - replacing diamond/square */}
              <div className="h-8 w-0.5 mx-4 theme-accent-bg"></div>
            </div>
          ))}
        </div>
        
        {/* Duplicate for seamless loop */}
        <div 
          className={`absolute flex whitespace-nowrap ${secondaryAnimationClass} ${isPaused ? 'animate-paused' : ''} items-center justify-center h-full`}
          style={{ animationDuration: `${duration}s` }}
        >
          {items.map((_, index) => (
            <div key={index} className="flex items-center h-full">
              <button 
                className="outline-none focus:outline-none mx-10"
                onClick={() => setShowModal(true)}
              >
                <span className={`text-3xl font-black tracking-tighter cursor-pointer hover:text-white transition-colors duration-300 ${textColor}`}>
                  {text}
                </span>
              </button>
              
              {/* Elegant vertical line separator - matching primary marquee */}
              <div className="h-8 w-0.5 mx-4 theme-accent-bg"></div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Edge fade effects */}
      <div className="absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none"></div>
      <div className="absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none"></div>

      {/* Instagram Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-[1000] p-4 overflow-y-auto" onClick={() => setShowModal(false)}>
          <div 
            className="bg-white max-w-xl w-full rounded-none border-2 border-black max-h-[90vh] overflow-hidden shadow-[12px_12px_0_0_rgba(var(--accent-rgb),0.7)]" 
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 border-b-2 border-black theme-accent-bg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-black theme-accent-text flex items-center justify-center transform rotate-2">
                  <Instagram className="w-7 h-7" />
                </div>
                <h2 className="text-2xl font-black uppercase tracking-tight">ХУЛИГАНКА</h2>
              </div>
              <button 
                onClick={() => setShowModal(false)} 
                className="w-10 h-10 flex items-center justify-center bg-black text-white theme-hover-accent border-2 border-black shadow-[2px_2px_0_0_rgba(255,255,255,0.5)]"
                aria-label="Close Instagram modal"
              >
                <X size={24} />
              </button>
            </div>
            
            {/* Instagram Feed */}
            <div className="overflow-y-auto max-h-[calc(90vh-72px)]">
              <div className="grid gap-0">
                {instagramPosts.map(post => (
                  <div key={post.id} className="border-b-2 border-black">
                    {/* Post image */}
                    <div className="relative h-80 w-full bg-gray-100 border-b-2 border-black">
                      <img 
                        src={post.image} 
                        alt={`Instagram post ${post.id}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    {/* Post info */}
                    <div className="p-5">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <Heart className="w-5 h-5" />
                            <span className="font-bold">{post.likes}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MessageCircle className="w-5 h-5" />
                            <span className="font-bold">{post.comments}</span>
                          </div>
                        </div>
                        <span className="text-sm font-mono">{post.date}</span>
                      </div>
                      <p className="text-sm font-medium">{post.caption}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Follow button */}
              <div className="p-6 bg-gray-50 border-t-2 border-black">
                <Link 
                  href={instagramUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="relative inline-block group w-full"
                >
                  <div className="relative bg-black theme-accent-text p-4 font-black text-lg tracking-tight uppercase flex items-center justify-center gap-3 group-hover:translate-x-[-4px] group-hover:translate-y-[-4px] transition-transform duration-200 border-2 border-black z-10">
                    <Instagram size={24} />
                    <span>FOLLOW @ХУЛИГАНКА</span>
                    {/* Hidden fill animation */}
                    <span className="absolute inset-0 theme-accent-bg transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out -z-10"></span>
                  </div>
                  <div className="absolute inset-0 theme-accent-bg translate-x-3 translate-y-3 -z-10"></div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        
        @keyframes marquee2 {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(0%);
          }
        }
        
        @keyframes marquee-right {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(0%);
          }
        }
        
        @keyframes marquee2-right {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        
        .animate-marquee {
          animation: marquee linear infinite;
          animation-duration: ${duration}s;
        }
        
        .animate-marquee2 {
          animation: marquee2 linear infinite;
          animation-duration: ${duration}s;
        }
        
        .animate-marquee-right {
          animation: marquee-right linear infinite;
          animation-duration: ${duration}s;
        }
        
        .animate-marquee2-right {
          animation: marquee2-right linear infinite;
          animation-duration: ${duration}s;
        }
        
        .animate-paused {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
} 