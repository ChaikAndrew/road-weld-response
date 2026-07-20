"use client";

import { useInView } from "@/hooks/useInView";
import {
  aboutSeoText,
  serviceAreaCities,
  serviceAreaCounties,
} from "@/lib/seoContent";

export default function AboutSeoSection() {
  const { ref: headerRef, isInView: headerInView } = useInView();
  const { ref: contentRef, isInView: contentInView } = useInView();

  return (
    <section id="about" className="w-full bg-dark-gray py-20 lg:py-32">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div
            ref={headerRef}
            className={`text-center mb-12 scroll-reveal ${headerInView ? "visible" : ""}`}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight mb-4">
              Mobile Welding in Rochester, NY
            </h2>
            <p className="text-xl text-white/80 font-semibold">
              24/7 roadside welding and heavy equipment service across Western NY
            </p>
          </div>

          <div
            ref={contentRef}
            className={`bg-black/50 border border-white/10 p-8 lg:p-12 scroll-reveal ${contentInView ? "visible" : ""}`}
          >
            <p className="text-white/85 leading-relaxed text-justify text-base md:text-lg">
              {aboutSeoText}
            </p>

            <div className="mt-8 pt-8 border-t border-white/10 space-y-6">
              <div>
                <h3 className="text-lg font-black text-white uppercase tracking-tight mb-3">
                  Counties We Serve
                </h3>
                <p className="text-white/70 leading-relaxed">
                  {serviceAreaCounties.join(" · ")}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-black text-white uppercase tracking-tight mb-3">
                  Cities & Communities
                </h3>
                <p className="text-white/70 leading-relaxed">
                  {serviceAreaCities.join(" · ")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
