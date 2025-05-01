"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, Filter } from 'lucide-react';

interface BrutalistShopPageProps {}

export function BrutalistShopPage({}: BrutalistShopPageProps) {
  // Mock data for collections
  const collections = [
    {
      id: '1',
      title: 'BUCKET HATS',
      slug: 'bucket-hats',
      description: 'Bold designs for urban explorers',
      imageUrl: '/images/hats/placeholder.jpg',
    },
    {
      id: '2',
      title: 'SNAPBACKS',
      slug: 'snapbacks',
      description: 'Classic style with attitude',
      imageUrl: '/images/hats/placeholder1.jpg',
    },
    {
      id: '3',
      title: 'DAD HATS',
      slug: 'dad-hats',
      description: 'Casual comfort for everyday',
      imageUrl: '/images/hats/placeholder.jpg',
    },
    {
      id: '4',
      title: 'BEANIES',
      slug: 'beanies',
      description: 'Keep it cozy year-round',
      imageUrl: '/images/hats/placeholder1.jpg',
    },
    {
      id: '5',
      title: 'TRUCKER HATS',
      slug: 'trucker-hats',
      description: 'Mesh back for maximum airflow',
      imageUrl: '/images/hats/placeholder.jpg',
    },
    {
      id: '6',
      title: 'LIMITED EDITION',
      slug: 'limited-edition',
      description: "Once they're gone, they're gone",
      imageUrl: '/images/hats/placeholder1.jpg',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Brutalist page header with zigzag background */}
      <div className="relative bg-black pt-20 pb-12 overflow-hidden">
        <div className="absolute inset-0 opacity-10 zigzag-pattern"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-6xl md:text-8xl font-black uppercase text-white tracking-tighter">
              COLLECTIONS
            </h1>
            <div className="w-20 h-1 bg-yellow-300 my-4"></div>
            <p className="text-xl text-white/80 max-w-2xl font-mono">
              Browse our exclusive hat collections. Limited drops for unlimited style.
            </p>
          </div>
        </div>
      </div>

      {/* Brutalist breadcrumb */}
      <div className="bg-yellow-300 border-y-4 border-black py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center font-bold text-black">
            <Link href="/" className="hover:underline">HOME</Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span>COLLECTIONS</span>
          </div>
        </div>
      </div>

      {/* Brutalist filter bar */}
      <div className="bg-white border-b-4 border-black py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="font-bold text-black text-lg">
              SHOWING ALL COLLECTIONS
            </div>
            <button className="flex items-center bg-black text-white px-4 py-2 font-bold">
              <Filter className="mr-2 h-4 w-4" />
              FILTER
            </button>
          </div>
        </div>
      </div>

      {/* Brutalist collections grid */}
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {collections.map((collection) => (
              <Link 
                href={`/collection/${collection.slug}`} 
                key={collection.id}
                className="brutalist-hover group"
              >
                <div className="bg-white border-4 border-black overflow-hidden transition-all duration-300">
                  {/* Image container with fixed height */}
                  <div className="relative h-80 bg-black overflow-hidden">
                    <div className="absolute inset-0 bg-black">
                      <div className="absolute inset-0 noise-pattern"></div>
                    </div>
                    <div className="relative h-full overflow-hidden">
                      <Image
                        src={collection.imageUrl}
                        alt={collection.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    </div>
                    
                    {/* Brutalist label in top left */}
                    <div className="absolute left-0 top-0 bg-yellow-300 text-black p-2 px-4 font-bold z-10 rotate-[2deg] transform origin-bottom-left">
                      {`0${collection.id}`}
                    </div>
                  </div>
                  
                  {/* Content area */}
                  <div className="p-4 bg-white border-t-4 border-black">
                    <h3 className="text-2xl font-black uppercase tracking-tight mb-2">
                      {collection.title}
                    </h3>
                    <p className="text-gray-700 mb-4">
                      {collection.description}
                    </p>
                    <div className="flex justify-between items-center mt-auto">
                      <span className="text-sm font-bold uppercase">VIEW COLLECTION</span>
                      <div className="w-8 h-8 flex items-center justify-center bg-black text-white group-hover:bg-yellow-300 group-hover:text-black transition-colors">
                        <ChevronRight className="h-5 w-5" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Brutalist marketing banner */}
      <div className="bg-black py-16 border-t-4 border-b-4 border-yellow-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-8 md:mb-0 md:mr-8 text-center md:text-left">
              <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight leading-none mb-4">
                JOIN THE <span className="text-yellow-300">HAT GANG</span>
              </h2>
              <p className="text-white/80 text-lg max-w-md">
                Get exclusive access to limited drops, early releases and member-only perks.
              </p>
            </div>
            <Link 
              href="/signup" 
              className="group bg-white border-4 border-white text-black font-black text-xl px-8 py-4 hover:bg-yellow-300 hover:border-black transition-all transform hover:-rotate-1 hover:translate-y-[-2px] flex items-center"
            >
              SIGN UP NOW
              <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BrutalistShopPage; 