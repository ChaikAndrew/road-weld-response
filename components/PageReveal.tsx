"use client";

import { useEffect, useState, type ReactNode } from "react";

interface PageRevealProps {
  children: ReactNode;
  delayMs?: number;
  className?: string;
}

export default function PageReveal({
  children,
  delayMs = 0,
  className = "",
}: PageRevealProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let inner = 0;
    const outer = requestAnimationFrame(() => {
      inner = requestAnimationFrame(() => setVisible(true));
    });
    return () => {
      cancelAnimationFrame(outer);
      cancelAnimationFrame(inner);
    };
  }, []);

  return (
    <div
      className={`page-reveal ${visible ? "visible" : ""} ${className}`.trim()}
      style={{ ["--reveal-delay" as string]: `${delayMs}ms` }}
    >
      {children}
    </div>
  );
}
