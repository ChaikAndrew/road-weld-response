"use client";

/**
 * FloatingTikTokButton Component
 * Sticky TikTok profile link — brand glitch colors (cyan / pink / white)
 */

const TIKTOK_PROFILE = "https://www.tiktok.com/@labidallc";

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .55.04.81.11v-3.56a6.27 6.27 0 0 0-.81-.05A6.34 6.34 0 0 0 3.15 15.3a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.73a8.2 8.2 0 0 0 4.76 1.52V6.8a4.85 4.85 0 0 1-1-.11z" />
    </svg>
  );
}

export default function FloatingTikTokButton() {
  return (
    <div className="fixed z-[60] top-5 right-14 lg:top-1/2 lg:right-4 lg:-translate-y-1/2">
      <a
        href={TIKTOK_PROFILE}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 hover:opacity-90 transition-opacity duration-300 ease-in-out"
        aria-label="Labida LLC on TikTok"
      >
        <TikTokIcon className="absolute w-6 h-6 sm:w-7 sm:h-7 text-[#25F4EE] -translate-x-[2px] translate-y-[1px] transition-transform duration-300 ease-in-out group-hover:-translate-x-[3px] group-hover:translate-y-[2px]" />
        <TikTokIcon className="absolute w-6 h-6 sm:w-7 sm:h-7 text-[#FE2C55] translate-x-[2px] -translate-y-[1px] transition-transform duration-300 ease-in-out group-hover:translate-x-[3px] group-hover:-translate-y-[2px]" />
        <TikTokIcon className="relative w-6 h-6 sm:w-7 sm:h-7 text-white" />
      </a>
    </div>
  );
}
