import Link from "next/link";
import { GOOGLE_MAPS_PLACE_URL, LABIDA_ADDRESS } from "@/lib/location";

/**
 * Footer Component
 * Footer with contact information, location, and copyright
 */

const currentYear = new Date().getFullYear();
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

export default function Footer() {
  return (
    <footer className="w-full bg-black border-t border-white/10 py-12 lg:py-16 pb-24 md:pb-24 lg:pb-16">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-white font-black uppercase tracking-tight mb-4 text-xl">
              Labida LLC
            </h3>
            <p className="text-white/70 leading-relaxed text-justify">
              Mobile welding and heavy-equipment service in Rochester, NY providing on-site repairs, fabrication, and emergency support for trucks, trailers, and other equipment. Delivering dependable metal fabrication and emergency fixes when and where you need them throughout Rochester, NY and surrounding areas.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-black uppercase tracking-tight mb-4 text-xl">
              Contact
            </h3>
            <ul className="space-y-3 text-white/70">
              <li>
                <a
                  href="tel:+15853157599"
                  className="hover:text-warning-yellow transition-colors duration-500 ease-in-out"
                >
                  Phone: +1 (585) 315-7599
                </a>
              </li>
              <li>
                <a
                  href="mailto:labidallc@gmail.com"
                  className="hover:text-warning-yellow transition-colors duration-500 ease-in-out"
                >
                  Email: labidallc@gmail.com
                </a>
              </li>
              <li>
                <a
                  href={TIKTOK_PROFILE}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-warning-yellow transition-colors duration-500 ease-in-out"
                  aria-label="Labida LLC on TikTok"
                >
                  <TikTokIcon className="h-5 w-5" />
                  <span className="text-sm font-semibold uppercase tracking-wide">
                    @labidallc
                  </span>
                </a>
              </li>
            </ul>
          </div>

          {/* Location */}
          <div>
            <h3 className="text-white font-black uppercase tracking-tight mb-4 text-xl">
              Location
            </h3>
            <a
              href={GOOGLE_MAPS_PLACE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-warning-yellow transition-colors duration-500 ease-in-out leading-relaxed"
            >
              {LABIDA_ADDRESS}
            </a>
            <p className="text-white/60 text-sm mt-2">
              Mobile service, by appointment only
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-black uppercase tracking-tight mb-4 text-xl">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/#home"
                  className="text-white/70 hover:text-warning-yellow transition-colors duration-500 ease-in-out uppercase text-sm font-semibold"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/#services"
                  className="text-white/70 hover:text-warning-yellow transition-colors duration-500 ease-in-out uppercase text-sm font-semibold"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/#why-us"
                  className="text-white/70 hover:text-warning-yellow transition-colors duration-500 ease-in-out uppercase text-sm font-semibold"
                >
                  Why Us
                </Link>
              </li>
              <li>
                <Link
                  href="/#about"
                  className="text-white/70 hover:text-warning-yellow transition-colors duration-500 ease-in-out uppercase text-sm font-semibold"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/#work"
                  className="text-white/70 hover:text-warning-yellow transition-colors duration-500 ease-in-out uppercase text-sm font-semibold"
                >
                  Work
                </Link>
              </li>
              <li>
                <Link
                  href="/#faq"
                  className="text-white/70 hover:text-warning-yellow transition-colors duration-500 ease-in-out uppercase text-sm font-semibold"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/#contact"
                  className="text-white/70 hover:text-warning-yellow transition-colors duration-500 ease-in-out uppercase text-sm font-semibold"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-white/70 hover:text-warning-yellow transition-colors duration-500 ease-in-out uppercase text-sm font-semibold"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 pt-8 text-center">
          <p className="text-white/50 text-sm">
            © {currentYear} Labida LLC. All rights reserved. 
           
          </p> 
         
        </div>
      </div>
    </footer>
  );
}
