"use client";

import Link from "next/link";
import { Wrench, Truck, Settings, Hammer } from "lucide-react";
import { useInView } from "@/hooks/useInView";
import StarField from "@/components/StarField";

/**
 * ServicesSection Component
 * Grid layout displaying service cards with icons, titles, and descriptions
 */

interface Service {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

const services: Service[] = [
  {
    id: "emergency-mobile-welding",
    icon: Wrench,
    title: "Emergency Mobile Welding",
    description:
      "24/7 emergency mobile welding throughout Rochester, NY — mobile welding trucks come to you to get trucks, trailers, and equipment back in service fast.",
  },
  {
    id: "heavy-equipment-repair",
    icon: Truck,
    title: "Heavy Equipment Repair",
    description:
      "Professional repair for excavators, loaders, bulldozers, buckets, attachments, and other heavy machinery with mobile welding and custom fabrication.",
  },
  {
    id: "fleet-maintenance",
    icon: Settings,
    title: "Fleet Maintenance",
    description:
      "Comprehensive fleet maintenance and welding for trucking companies, contractors, municipalities, and commercial fleets across Rochester and surrounding communities.",
  },
  {
    id: "metal-fabrication",
    icon: Hammer,
    title: "Metal Fabrication",
    description:
      "Custom steel and aluminum fabrication — brackets, racks, railings, trailer modifications, structural components, and one-of-a-kind parts built to your needs.",
  },
];

export default function ServicesSection() {
  const { ref: headerRef, isInView: headerInView } = useInView();
  const { ref: gridRef, isInView: gridInView } = useInView();

  return (
    <section id="services" className="relative w-full bg-black py-10 lg:py-16 overflow-hidden">
      <StarField />
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <div
            ref={headerRef}
            className={`text-center mb-8 scroll-reveal ${headerInView ? "visible" : ""}`}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight mb-4">
              Our Services
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto font-semibold">
              Professional mobile welding and heavy equipment service when you need it most
            </p>
          </div>

          {/* Services Grid */}
          <div
            ref={gridRef}
            className={`grid grid-cols-1 md:grid-cols-2 gap-8 ${gridInView ? "visible" : ""}`}
          >
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <Link
                  key={service.id}
                  href={`/services/${service.id}`}
                  className={`bg-dark-gray border border-white/10 p-8 hover:border-warning-yellow/50 transition-all duration-500 ease-in-out hover:scale-[1.02] cursor-pointer group scroll-reveal ${gridInView ? "visible" : ""}`}
                  style={
                    gridInView
                      ? { ["--scroll-delay" as string]: `${(index % 6) * 0.1}s` }
                      : {}
                  }
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="shrink-0 text-white group-hover:text-warning-yellow transition-colors duration-500 ease-in-out pt-0.5">
                      <IconComponent className="w-10 h-10 sm:w-12 sm:h-12" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight leading-tight group-hover:text-warning-yellow transition-colors duration-500 ease-in-out">
                      {service.title}
                    </h3>
                  </div>

                  <p className="text-white/80 leading-relaxed group-hover:text-white/90 transition-colors duration-500 ease-in-out">
                    {service.description}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
