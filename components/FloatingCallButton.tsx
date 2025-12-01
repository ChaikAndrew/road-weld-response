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
        className="group flex items-center gap-3 sm:gap-4 bg-warning-yellow backdrop-blur-sm border-2 border-black/30 text-black px-5 py-4 sm:px-6 sm:py-4 md:px-5 md:py-3 rounded-lg hover:border-black/50 hover:bg-warning-yellow transition-all duration-300 ease-in-out call-button-animate"
        aria-label="Call Now"
      >
        {/* Phone Icon */}
        <div className="flex-shrink-0">
          <Phone className="w-6 h-6 sm:w-6 sm:h-6 md:w-5 md:h-5 text-black group-hover:text-black transition-colors" strokeWidth={2.5} />
        </div>
        
        {/* Phone Number - Always visible but compact on mobile */}
        <div className="flex flex-col">
          <div className="text-xs sm:text-sm md:text-xs font-semibold uppercase tracking-wide leading-tight text-black/80 group-hover:text-black transition-colors">
            Call Now
          </div>
          <div className="text-base sm:text-lg md:text-base font-bold leading-tight whitespace-nowrap text-black">
            +1 (585) 315-7599
          </div>
        </div>
      </a>
    </div>
  );
}

