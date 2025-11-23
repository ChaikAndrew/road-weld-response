import Link from "next/link";

/**
 * Footer Component
 * Footer with contact information, location, and copyright
 */

const currentYear = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="w-full bg-black border-t border-white/10 py-12 lg:py-16">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-white font-black uppercase tracking-tight mb-4 text-xl">
              Road Weld Response
            </h3>
            <p className="text-white/70 leading-relaxed">
              Professional mobile roadside welding and heavy equipment assistance. Fast, reliable, certified.
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-black uppercase tracking-tight mb-4 text-xl">
              Contact
            </h3>
            <ul className="space-y-3 text-white/70">
              <li>
                <a
                  href="tel:+1234567890"
                  className="hover:text-warning-yellow transition-colors duration-500 ease-in-out"
                >
                  Phone: +0 (000) 000-0000
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@roadweldresponse.com"
                  className="hover:text-warning-yellow transition-colors duration-500 ease-in-out"
                >
                  Email: info@roadweldresponse.com
                </a>
              </li>
            </ul>
          </div>

          {/* Location */}
          <div>
            <h3 className="text-white font-black uppercase tracking-tight mb-4 text-xl">
              Location
            </h3>
            <p className="text-white/70 leading-relaxed">
              Serving the greater metropolitan area
              <br />
              24/7 Emergency Service Available
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
                  href="/#contact"
                  className="text-white/70 hover:text-warning-yellow transition-colors duration-500 ease-in-out uppercase text-sm font-semibold"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 pt-8 text-center">
          <p className="text-white/50 text-sm">
            © {currentYear} Road Weld Response. All rights reserved. 
           
          </p> 
          <p className="text-white/50 text-sm flex items-center justify-center gap-2 flex-wrap">
            CHAIKA ANDRII. 
            <a
              href="https://www.instagram.com/chaika_andrey/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center hover:opacity-80 transition-opacity duration-300"
              aria-label="Instagram"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="instagram-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#833AB4" />
                    <stop offset="50%" stopColor="#FD1D1D" />
                    <stop offset="100%" stopColor="#FCB045" />
                  </linearGradient>
                </defs>
                <path
                  d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162 0 3.403 2.759 6.162 6.162 6.162 3.403 0 6.162-2.759 6.162-6.162 0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4 2.209 0 4 1.791 4 4 0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44 0 .795.645 1.44 1.441 1.44.795 0 1.44-.645 1.44-1.44 0-.795-.645-1.44-1.44-1.44z"
                  fill="url(#instagram-gradient)"
                />
              </svg>
            </a>
            <span className="text-white/60 text-xs">(dev onlyе 🛡️ - remove in production)</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
