"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useInView } from "@/hooks/useInView";
import { faqItems } from "@/lib/seoContent";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { ref: headerRef, isInView: headerInView } = useInView();
  const { ref: listRef, isInView: listInView } = useInView();

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="w-full bg-dark-gray py-10 lg:py-16">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div
            ref={headerRef}
            className={`text-center mb-6 scroll-reveal ${headerInView ? "visible" : ""}`}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-white/80 font-semibold">
              Common questions about mobile welding and on-site repair in Rochester, NY
            </p>
          </div>

          <div
            ref={listRef}
            className={`space-y-4 scroll-reveal ${listInView ? "visible" : ""}`}
          >
            {faqItems.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={index}
                  className="bg-black/50 border border-white/10 border-l-4 border-l-warning-yellow overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => toggle(index)}
                    className="w-full flex items-center justify-between gap-4 p-6 text-left hover:bg-black/30 transition-colors duration-300"
                    aria-expanded={isOpen}
                  >
                    <h3
                      className={`text-base md:text-lg font-black uppercase tracking-tight leading-snug transition-colors duration-300 ${
                        isOpen ? "text-warning-yellow" : "text-white"
                      }`}
                    >
                      {item.question}
                    </h3>
                    <ChevronDown
                      className={`w-5 h-5 text-warning-yellow flex-shrink-0 transition-transform duration-500 ease-in-out ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  <div
                    className={`grid transition-[grid-template-rows] duration-500 ease-in-out ${
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div
                        className={`px-6 pb-6 transition-opacity duration-500 ease-in-out ${
                          isOpen ? "opacity-100" : "opacity-0"
                        }`}
                      >
                        <p className="text-white/80 leading-relaxed">{item.answer}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
