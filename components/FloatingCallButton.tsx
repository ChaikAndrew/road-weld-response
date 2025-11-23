"use client";

import { Phone } from "lucide-react";

/**
 * FloatingCallButton Component
 * Floating call button with phone number, visible on all pages
 */

export default function FloatingCallButton() {
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 lg:left-4 lg:translate-x-0 z-50">
      <a
        href="tel:+15853157599"
        className="group flex items-center gap-2 sm:gap-3 bg-black/80 backdrop-blur-sm border border-warning-yellow/30 text-white px-3 py-2.5 sm:px-4 sm:py-3 md:px-5 md:py-3 rounded-lg shadow-lg hover:border-warning-yellow hover:bg-black/90 transition-all duration-300 ease-in-out"
        aria-label="Call Now"
      >
        {/* Phone Icon */}
        <div className="flex-shrink-0">
          <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-warning-yellow group-hover:text-warning-yellow transition-colors" strokeWidth={2} />
        </div>
        
        {/* Phone Number - Always visible but compact on mobile */}
        <div className="flex flex-col">
          <div className="text-[9px] sm:text-[10px] md:text-xs font-semibold uppercase tracking-wide leading-tight text-white/70 group-hover:text-white transition-colors">
            Call Now
          </div>
          <div className="text-xs sm:text-sm md:text-base font-semibold leading-tight whitespace-nowrap text-white">
            +1 (585) 315-7599
          </div>
        </div>
      </a>
    </div>
  );
}

