"use client";

import Link from "next/link";
import { 
  Wrench, 
  Truck, 
  Zap, 
  Settings, 
  Nut, 
  AlertCircle 
} from "lucide-react";
import { useInView } from "@/hooks/useInView";

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
    id: "emergency-roadside-welding",
    icon: Wrench,
    title: "Emergency Roadside Welding",
    description: "24/7 mobile welding services for broken frames, cracked components, and structural repairs on-site.",
  },
  {
    id: "heavy-equipment-repair",
    icon: Truck,
    title: "Heavy Equipment Repair",
    description: "Expert repair services for trucks, trailers, construction equipment, and commercial vehicles.",
  },
  {
    id: "fast-response-service",
    icon: Zap,
    title: "Fast Response Service",
    description: "Rapid deployment to your location with fully equipped mobile repair units and certified technicians.",
  },
  {
    id: "fleet-maintenance",
    icon: Settings,
    title: "Fleet Maintenance",
    description: "Comprehensive maintenance programs to keep your fleet operational and minimize downtime.",
  },
  {
    id: "structural-fabrication",
    icon: Nut,
    title: "Structural Fabrication",
    description: "Custom metal fabrication and welding for frames, brackets, and specialized equipment components.",
  },
  {
    id: "24-7-emergency-support",
    icon: AlertCircle,
    title: "24/7 Emergency Support",
    description: "Round-the-clock availability for critical breakdowns and urgent repair needs.",
  },
];

export default function ServicesSection() {
  const { ref: headerRef, isInView: headerInView } = useInView();
  const { ref: gridRef, isInView: gridInView } = useInView();

  return (
    <section id="services" className="w-full bg-black py-20 lg:py-32">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div 
          ref={headerRef}
          className={`text-center mb-16 scroll-reveal ${headerInView ? 'visible' : ''}`}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight mb-4">
            Our Services
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto font-semibold">
            Professional mobile welding and heavy equipment assistance when you need it most
          </p>
        </div>

        {/* Services Grid */}
        <div 
          ref={gridRef}
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ${gridInView ? 'visible' : ''}`}
        >
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Link
                key={service.id}
                href={`/services/${service.id}`}
                className={`bg-dark-gray border border-white/10 p-8 hover:border-warning-yellow/50 transition-all duration-500 ease-in-out hover:scale-[1.02] cursor-pointer group scroll-reveal ${gridInView ? 'visible' : ''}`}
                style={gridInView ? { ['--scroll-delay' as string]: `${(index % 6) * 0.1}s` } : {}}
              >
                {/* Icon */}
                <div className="mb-6 text-white group-hover:text-warning-yellow transition-colors duration-500 ease-in-out">
                  <IconComponent className="w-12 h-12" />
                </div>

                {/* Title */}
                <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-4 group-hover:text-warning-yellow transition-colors duration-500 ease-in-out">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-white/80 leading-relaxed group-hover:text-white/90 transition-colors duration-500 ease-in-out">
                  {service.description}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
