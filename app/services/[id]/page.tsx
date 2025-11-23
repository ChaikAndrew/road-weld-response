import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface ServiceDetail {
  id: string;
  title: string;
  icon: string;
  shortDescription: string;
  fullDescription: string;
  features: string[];
  benefits: string[];
  useCases: string[];
}

const serviceDetails: Record<string, ServiceDetail> = {
  "emergency-roadside-welding": {
    id: "emergency-roadside-welding",
    title: "Emergency Roadside Welding",
    icon: "Wrench",
    shortDescription: "24/7 mobile welding services for broken frames, cracked components, and structural repairs on-site.",
    fullDescription: "When equipment breaks down on the road, every minute counts. Our emergency roadside welding service provides immediate, professional mobile welding solutions to get you back on the road fast. Our certified welders arrive fully equipped with mobile welding units capable of handling everything from minor frame cracks to major structural repairs.",
    features: [
      "24/7 emergency response",
      "Mobile welding units fully equipped",
      "Certified AWS welders",
      "On-site structural repairs",
      "Frame and component welding",
      "Multiple welding processes (MIG, TIG, Stick)",
    ],
    benefits: [
      "Minimize downtime and lost revenue",
      "Get back on the road quickly",
      "Professional quality repairs",
      "No need to tow to a shop",
      "Cost-effective emergency solutions",
    ],
    useCases: [
      "Broken truck frames",
      "Cracked trailer components",
      "Failed structural welds",
      "Emergency equipment repairs",
      "On-site fabrication needs",
    ],
  },
  "heavy-equipment-repair": {
    id: "heavy-equipment-repair",
    title: "Heavy Equipment Repair",
    icon: "Truck",
    shortDescription: "Expert repair services for trucks, trailers, construction equipment, and commercial vehicles.",
    fullDescription: "Our heavy equipment repair services cover the full spectrum of commercial and industrial vehicle maintenance. From semi-trucks and trailers to construction equipment and specialized commercial vehicles, our experienced technicians deliver reliable repairs that keep your operations running smoothly.",
    features: [
      "Truck and trailer repair",
      "Construction equipment service",
      "Commercial vehicle maintenance",
      "Hydraulic system repairs",
      "Engine and transmission work",
      "Electrical system diagnostics",
    ],
    benefits: [
      "Expert technicians with years of experience",
      "Comprehensive repair capabilities",
      "Reduced operational downtime",
      "Extended equipment lifespan",
      "Preventive maintenance programs",
    ],
    useCases: [
      "Semi-truck breakdowns",
      "Trailer repair and maintenance",
      "Construction equipment failures",
      "Commercial fleet repairs",
      "Specialized vehicle service",
    ],
  },
  "fast-response-service": {
    id: "fast-response-service",
    title: "Fast Response Service",
    icon: "Zap",
    shortDescription: "Rapid deployment to your location with fully equipped mobile repair units and certified technicians.",
    fullDescription: "Time is money in the transportation and construction industries. Our fast response service ensures rapid deployment of fully equipped mobile repair units to your exact location. Our certified technicians arrive ready to diagnose and repair issues immediately, minimizing your downtime and getting you back to work faster.",
    features: [
      "Rapid response times",
      "GPS-tracked mobile units",
      "Fully equipped service vehicles",
      "Certified technicians",
      "On-site diagnostics",
      "Immediate repair capabilities",
    ],
    benefits: [
      "Minimal wait times",
      "Faster return to operations",
      "Reduced revenue loss",
      "Professional on-site service",
      "No transportation delays",
    ],
    useCases: [
      "Urgent breakdowns",
      "Time-sensitive repairs",
      "Emergency service calls",
      "Critical equipment failures",
      "Fleet maintenance needs",
    ],
  },
  "fleet-maintenance": {
    id: "fleet-maintenance",
    title: "Fleet Maintenance",
    icon: "Settings",
    shortDescription: "Comprehensive maintenance programs to keep your fleet operational and minimize downtime.",
    fullDescription: "Preventive maintenance is the key to fleet reliability. Our comprehensive fleet maintenance programs are designed to keep your vehicles operational, minimize unexpected breakdowns, and extend the lifespan of your equipment. We work with you to create customized maintenance schedules that fit your operational needs.",
    features: [
      "Customized maintenance schedules",
      "Regular inspection programs",
      "Preventive maintenance",
      "Fleet-wide service coordination",
      "Maintenance tracking and reporting",
      "Priority service for fleet customers",
    ],
    benefits: [
      "Reduced unexpected breakdowns",
      "Extended equipment lifespan",
      "Lower overall maintenance costs",
      "Improved fleet reliability",
      "Better resale value",
    ],
    useCases: [
      "Commercial truck fleets",
      "Trailer maintenance programs",
      "Construction equipment fleets",
      "Delivery vehicle maintenance",
      "Long-term service contracts",
    ],
  },
  "structural-fabrication": {
    id: "structural-fabrication",
    title: "Structural Fabrication",
    icon: "Nut",
    shortDescription: "Custom metal fabrication and welding for frames, brackets, and specialized equipment components.",
    fullDescription: "When standard parts won't do, our structural fabrication services create custom solutions tailored to your specific needs. From custom frames and brackets to specialized equipment components, our skilled fabricators use precision welding and metalworking techniques to deliver durable, reliable custom parts.",
    features: [
      "Custom frame fabrication",
      "Specialized bracket design",
      "Precision metal cutting",
      "Custom component manufacturing",
      "CAD design capabilities",
      "Quality welding and finishing",
    ],
    benefits: [
      "Solutions tailored to your needs",
      "High-quality custom fabrication",
      "Durable and reliable parts",
      "Expert design consultation",
      "One-stop fabrication service",
    ],
    useCases: [
      "Custom truck frames",
      "Specialized brackets",
      "Equipment modifications",
      "Unique component needs",
      "Prototype development",
    ],
  },
  "24-7-emergency-support": {
    id: "24-7-emergency-support",
    title: "24/7 Emergency Support",
    icon: "AlertCircle",
    shortDescription: "Round-the-clock availability for critical breakdowns and urgent repair needs.",
    fullDescription: "Equipment failures don't happen on a schedule. That's why we provide 24/7 emergency support for critical breakdowns and urgent repair needs. Our emergency response team is always ready to dispatch to your location, day or night, weekends and holidays included. When you need help most, we're there.",
    features: [
      "24/7 availability",
      "Holiday and weekend service",
      "Emergency dispatch system",
      "Rapid response guarantee",
      "Priority emergency service",
      "Round-the-clock support line",
    ],
    benefits: [
      "Peace of mind",
      "No downtime waiting",
      "Immediate assistance",
      "Reliable emergency support",
      "Minimized operational impact",
    ],
    useCases: [
      "After-hours breakdowns",
      "Weekend emergencies",
      "Holiday service needs",
      "Critical equipment failures",
      "Urgent repair requirements",
    ],
  },
};

export default function ServiceDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const service = serviceDetails[params.id];

  if (!service) {
    return (
      <main className="min-h-screen bg-black">
        <Header />
        <div className="container mx-auto px-4 lg:px-8 py-32 text-center">
          <h1 className="text-4xl font-black text-white uppercase mb-4">
            Service Not Found
          </h1>
          <Link
            href="/#services"
            className="text-warning-yellow hover:text-red-500 transition-colors"
          >
            Return to Services
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black">
      <Header />
      <section className="w-full bg-black py-20 lg:py-32">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Back Button */}
          <Link
            href="/#services"
            className="inline-flex items-center gap-2 text-white/80 hover:text-warning-yellow transition-colors mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Services</span>
          </Link>

          <div className="max-w-4xl mx-auto">
            {/* Service Header */}
            <div className="mb-12">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight mb-6">
                {service.title}
              </h1>
              <p className="text-xl text-white/80 leading-relaxed">
                {service.fullDescription}
              </p>
            </div>

            {/* Features Section */}
            <div className="mb-12">
              <h2 className="text-3xl font-black text-white uppercase tracking-tight mb-6">
                Key Features
              </h2>
              <ul className="space-y-3">
                {service.features.map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-white/90"
                  >
                    <span className="text-warning-yellow mt-1">•</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Benefits Section */}
            <div className="mb-12">
              <h2 className="text-3xl font-black text-white uppercase tracking-tight mb-6">
                Benefits
              </h2>
              <ul className="space-y-3">
                {service.benefits.map((benefit, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-white/90"
                  >
                    <span className="text-warning-yellow mt-1">•</span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Use Cases Section */}
            <div className="mb-12">
              <h2 className="text-3xl font-black text-white uppercase tracking-tight mb-6">
                Common Use Cases
              </h2>
              <ul className="space-y-3">
                {service.useCases.map((useCase, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-white/90"
                  >
                    <span className="text-warning-yellow mt-1">•</span>
                    <span>{useCase}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA Section */}
            <div className="bg-dark-gray border border-white/10 p-8 mt-12">
              <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-white/80 mb-6">
                Contact us today to discuss your needs and get a quote for our services.
              </p>
              <Link
                href="/#contact"
                className="inline-block bg-warning-yellow text-black px-8 py-4 text-lg font-black uppercase tracking-wider hover:bg-red-500 transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}

