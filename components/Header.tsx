"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Cog } from "lucide-react";

/**
 * Header Component
 * Sticky top navigation with logo, dropdown menu, and mobile responsive design
 */
export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [rotation, setRotation] = useState(0);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleServices = () => {
    setIsServicesOpen(!isServicesOpen);
  };

  // Auto-rotate cog every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prev) => prev + 360);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full bg-black border-b border-dark-gray">
      <nav className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-3 group">
              <Cog 
                className="w-8 h-8 text-warning-yellow cog-hover-spin transition-transform duration-500" 
                strokeWidth={1.5}
                style={{ 
                  transform: `rotate(${rotation}deg)`,
                  ['--cog-rotation' as string]: `${rotation}deg`
                }}
              />
              <div className="text-white">
                <span className="text-2xl font-black tracking-tight">RWR</span>
                <span className="block text-xs font-semibold text-warning-yellow uppercase tracking-wider">
                  Road Weld Response
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link
              href="/#home"
              className="text-white font-semibold uppercase tracking-wide hover:text-warning-yellow transition-colors duration-500 ease-in-out"
            >
              Home
            </Link>
            <Link
              href="/#services"
              className="text-white font-semibold uppercase tracking-wide hover:text-warning-yellow transition-colors duration-500 ease-in-out"
            >
              Services
            </Link>
            <Link
              href="/#why-us"
              className="text-white font-semibold uppercase tracking-wide hover:text-warning-yellow transition-colors duration-500 ease-in-out"
            >
              Why Us
            </Link>
            <Link
              href="/#contact"
              className="text-white font-semibold uppercase tracking-wide hover:text-warning-yellow transition-colors duration-500 ease-in-out"
            >
              Contact
            </Link>
          </div>

          {/* Call Now Button - Desktop */}
          <div className="hidden lg:block">
            <a
              href="tel:+1234567890"
              className="bg-warning-yellow text-black px-6 py-3 font-bold uppercase tracking-wide hover:bg-yellow-400 transition-colors duration-500 ease-in-out"
            >
              Call Now
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden text-white p-2"
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-dark-gray">
            <div className="flex flex-col space-y-4">
              <Link
                href="/#home"
                className="text-white font-semibold uppercase tracking-wide hover:text-warning-yellow transition-colors duration-500 ease-in-out"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/#services"
                className="text-white font-semibold uppercase tracking-wide hover:text-warning-yellow transition-colors duration-500 ease-in-out"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Services
              </Link>
              <Link
                href="/#why-us"
                className="text-white font-semibold uppercase tracking-wide hover:text-warning-yellow transition-colors duration-500 ease-in-out"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Why Us
              </Link>
              <Link
                href="/#contact"
                className="text-white font-semibold uppercase tracking-wide hover:text-warning-yellow transition-colors duration-500 ease-in-out"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <a
                href="tel:+1234567890"
                className="bg-warning-yellow text-black px-6 py-3 font-bold uppercase tracking-wide text-center hover:bg-yellow-400 transition-colors duration-500 ease-in-out"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Call Now
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
