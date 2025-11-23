"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

/**
 * HeroSection Component
 * Full-width hero section with industrial background, bold headline, CTA buttons, and image slider
 */

const images = [
  "/pictures/pic1.jpg",
  "/pictures/pic2.jpg",
  "/pictures/pic3.jpg",
];

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="home"
      className="relative w-full min-h-[500px] md:min-h-[600px] lg:min-h-screen bg-dark-gray flex items-center justify-center overflow-hidden"
    >
      {/* Image Slider Background */}
      <div className="absolute inset-0 z-0">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={image}
              alt={`Hero image ${index + 1}`}
              fill
              className="object-cover object-[center_30%] md:object-center"
              priority={index === 0}
              quality={90}
              sizes="100vw"
              unoptimized
            />
            {/* Dark overlay for consistent styling */}
            <div className="absolute inset-0 bg-black/70" />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 lg:px-8 py-12 md:py-20 lg:py-32 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white uppercase tracking-tight mb-4 md:mb-6 leading-tight">
            24/7 Mobile Roadside Welding, Heavy Equipment Service, and Metal Fabrication
          </h1>

          {/* Subtext */}
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 mb-6 md:mb-10 max-w-3xl mx-auto font-semibold leading-relaxed">
            Fast response, certified welders, 24/7 emergency service. When heavy equipment breaks down, we bring the solution to you.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="tel:+15853157599"
              className="bg-warning-yellow text-black px-8 py-4 text-lg font-black uppercase tracking-wider hover:bg-red-500 transition-colors duration-500 ease-in-out w-full sm:w-auto"
            >
              Call Now
            </a>
            <a
              href="/#contact"
              className="bg-transparent border-2 border-warning-yellow text-warning-yellow px-8 py-4 text-lg font-black uppercase tracking-wider hover:bg-warning-yellow hover:text-black transition-colors duration-500 ease-in-out w-full sm:w-auto"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
