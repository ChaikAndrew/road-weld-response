"use client";

import { useInView } from "@/hooks/useInView";

/**
 * WhyUsSection Component
 * Displays key benefits and advantages in a bullet list format
 */

interface Benefit {
  title: string;
  description: string;
}

const benefits: Benefit[] = [
  {
    title: "Fast Response Time",
    description: "Average response time under 60 minutes. We understand downtime costs money.",
  },
  {
    title: "Heavy Equipment Expertise",
    description: "Specialized knowledge in commercial trucks, construction equipment, and industrial machinery.",
  },
  {
    title: "Qualified Welders",
    description: "All technicians are qualified welders with extensive experience in structural and mobile welding.",
  },
  {
    title: "Fully Equipped Mobile Units",
    description: "Our mobile repair trucks carry all necessary tools, equipment, and materials for on-site repairs.",
  },
  {
    title: "24/7 Emergency Service",
    description: "Available around the clock, including weekends and holidays, for critical breakdown situations.",
  },
  {
    title: "B2B Focused",
    description: "We deliver reliable, industry-grade services for commercial and industrial partners",
  },
];

export default function WhyUsSection() {
  const { ref: headerRef, isInView: headerInView } = useInView();
  const { ref: gridRef, isInView: gridInView } = useInView();

  return (
    <section id="why-us" className="w-full bg-dark-gray py-20 lg:py-32">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <div 
            ref={headerRef}
            className={`text-center mb-16 scroll-reveal ${headerInView ? 'visible' : ''}`}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight mb-4">
              Why Choose Us
            </h2>
            <p className="text-xl text-white/80 font-semibold">
              Professional, reliable, and ready when you need us
            </p>
          </div>

          {/* Benefits List */}
          <div 
            ref={gridRef}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className={`flex items-start space-x-4 bg-black/50 p-6 border-l-4 border-warning-yellow scroll-reveal ${gridInView ? 'visible' : ''}`}
                style={gridInView ? { ['--scroll-delay' as string]: `${(index % 6) * 0.1}s` } : {}}
              >
                {/* Bullet Point */}
                <div className="flex-shrink-0 w-8 h-8 bg-warning-yellow flex items-center justify-center">
                  <span className="text-black font-black text-lg">{index + 1}</span>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-xl font-black text-white uppercase tracking-tight mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-white/80 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
