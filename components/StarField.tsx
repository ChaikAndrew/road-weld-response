"use client";

import { useEffect, useState } from "react";

/**
 * StarField Component
 * Animated starry sky background with twinkling stars
 */

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  delay: number;
  duration: number;
}

export default function StarField() {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    // Generate 150 random stars
    const generateStars = (): Star[] => {
      const starsArray: Star[] = [];
      for (let i = 0; i < 150; i++) {
        starsArray.push({
          id: i,
          x: Math.random() * 100, // Random X position (0-100%)
          y: Math.random() * 100, // Random Y position (0-100%)
          size: Math.random() * 2 + 0.5, // Random size (0.5-2.5px)
          opacity: Math.random() * 0.8 + 0.2, // Random initial opacity (0.2-1)
          delay: Math.random() * 3, // Random animation delay (0-3s)
          duration: Math.random() * 2 + 1.5, // Random animation duration (1.5-3.5s)
        });
      }
      return starsArray;
    };

    setStars(generateStars());
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white pointer-events-auto cursor-pointer"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity * 0.6, // Make stars more subtle
            animation: `twinkle ${star.duration}s ease-in-out infinite`,
            animationDelay: `${star.delay}s`,
            boxShadow: `0 0 ${star.size * 2}px rgba(255, 255, 255, 0.6)`,
            transition: "transform 0.3s ease, opacity 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(2)";
            e.currentTarget.style.opacity = "1";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.opacity = `${star.opacity * 0.6}`;
          }}
        />
      ))}
    </div>
  );
}

