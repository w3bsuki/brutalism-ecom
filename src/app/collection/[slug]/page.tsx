import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { Metadata } from "next";

// Define a list of valid collection slugs for static generation
const VALID_COLLECTIONS = [
  "snapbacks",
  "dad-hats",
  "fitted-caps",
  "beanies",
  "bucket-hats",
  "limited-edition"
];

// Get collection details (would normally come from database)
function getCollectionDetails(slug: string) {
  const collections = {
    "snapbacks": {
      name: "Snapbacks",
      description: "Adjustable snapback hats with flat brims and structured crowns."
    },
    "dad-hats": {
      name: "Dad Hats",
      description: "Relaxed, low-profile caps with curved brims and unstructured crowns."
    },
    "fitted-caps": {
      name: "Fitted Caps",
      description: "Structured caps with flat brims that come in specific sizes for a perfect fit."
    },
    "beanies": {
      name: "Beanies",
      description: "Warm, knitted caps that fit snugly on the head, perfect for cold weather."
    },
    "bucket-hats": {
      name: "Bucket Hats",
      description: "Round, wide-brimmed hats that slope downward, offering sun protection and a casual look."
    },
    "limited-edition": {
      name: "Limited Edition",
      description: "Exclusive, limited-run designs that are only available for a short time."
    }
  };
  
  return collections[slug as keyof typeof collections];
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const { slug } = params;
  const collection = getCollectionDetails(slug);
  
  if (!collection) {
    return {
      title: "Collection Not Found",
    };
  }

  return {
    title: `${collection.name} | Hat Store`,
    description: collection.description || `Shop our ${collection.name} collection`,
  };
}

export default function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const collection = getCollectionDetails(slug);
  
  if (!collection) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Brutalist page header with zigzag background */}
      <div className="relative bg-black pt-20 pb-12 overflow-hidden">
        <div className="absolute inset-0 opacity-10 zigzag-pattern"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-6xl md:text-8xl font-black uppercase text-white tracking-tighter">
              {collection.name.toUpperCase()}
            </h1>
            <div className="w-20 h-1 bg-yellow-300 my-4"></div>
            <p className="text-xl text-white/80 max-w-2xl font-mono">
              {collection.description}
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
            <Link href="/collections" className="hover:underline">COLLECTIONS</Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span>{collection.name.toUpperCase()}</span>
          </div>
        </div>
      </div>

      {/* Brutalist Content */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-4 border-black p-8 text-center relative bg-white">
            <div className="absolute top-0 left-0 w-full h-full bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(0,0,0,0.05)_10px,rgba(0,0,0,0.05)_20px)] -z-10"></div>
            <h2 className="text-3xl font-black uppercase mb-4">COMING SOON</h2>
            <p className="text-xl max-w-2xl mx-auto mb-8">
              We're working on adding products to this collection. Check back soon for the latest {collection.name.toLowerCase()}.
            </p>
            <div className="inline-block transform rotate-[-1deg]">
              <Link 
                href="/collections"
                className="inline-block bg-black text-white font-black text-xl px-8 py-3 hover:bg-yellow-300 hover:text-black transition-colors border-4 border-black"
              >
                BROWSE OTHER COLLECTIONS
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function generateStaticParams() {
  return VALID_COLLECTIONS.map(slug => ({ slug }));
} 