import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowLeft,
  Phone,
  Mail,
  MapPin,
  Wrench,
  Truck,
  Settings,
  Hammer,
} from "lucide-react";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StarField from "@/components/StarField";
import PageReveal from "@/components/PageReveal";
import { GOOGLE_MAPS_PLACE_URL, LABIDA_ADDRESS } from "@/lib/location";

interface ServiceDetail {
  id: string;
  title: string;
  icon: LucideIcon;
  paragraphs: string[];
}

const serviceDetails: Record<string, ServiceDetail> = {
  "emergency-mobile-welding": {
    id: "emergency-mobile-welding",
    title: "Emergency Mobile Welding",
    icon: Wrench,
    paragraphs: [
      "Unexpected breakdowns can happen anytime, and when they do, Labida LLC is ready to help with 24/7 emergency mobile welding throughout Rochester, NY and the surrounding areas. Our fully equipped mobile welding trucks travel directly to your location, reducing downtime and getting your truck, trailer, or equipment safely back in service as quickly as possible.",
      "We repair cracked frames, broken crossmembers, damaged trailer components, hitches, brackets, ramps, structural steel, aluminum parts, and other critical failures on semi-trucks, trailers, dump trucks, box trucks, heavy equipment, agricultural machinery, and commercial fleet vehicles. Our experienced welders perform professional MIG, TIG, and stick welding on steel, stainless steel, and aluminum to deliver durable, high-quality repairs where you need them most.",
      "Whether your equipment needs repair at a job site, in a truck yard, or at your business, Labida LLC provides dependable mobile welding services with fast response times to help keep your operation moving.",
    ],
  },
  "heavy-equipment-repair": {
    id: "heavy-equipment-repair",
    title: "Heavy Equipment Repair",
    icon: Truck,
    paragraphs: [
      "Labida LLC provides professional heavy equipment repair for construction, industrial, agricultural, and commercial equipment throughout Rochester, NY. We repair excavators, skid steers, loaders, bulldozers, backhoes, buckets, attachments, trailers, and other heavy machinery using high-quality welding and custom fabrication techniques.",
      "Our services include crack repairs, structural reinforcement, bucket rebuilding, attachment repairs, wear plate replacement, custom modifications, and equipment strengthening to extend the life of your machinery. We also fabricate and install custom tarp systems and trailer tarp supports, helping protect loads, improve safety, and keep equipment operating efficiently.",
      "Whether you need emergency repairs or scheduled maintenance, our mobile welding team comes directly to your location with the equipment needed to complete reliable, long-lasting repairs and minimize downtime.",
    ],
  },
  "fleet-maintenance": {
    id: "fleet-maintenance",
    title: "Fleet Maintenance",
    icon: Settings,
    paragraphs: [
      "Keeping your fleet running requires dependable maintenance and fast repairs. Labida LLC provides comprehensive fleet maintenance and welding services for trucking companies, contractors, municipalities, delivery fleets, utility companies, and commercial businesses throughout Rochester and the surrounding communities.",
      "We inspect, repair, reinforce, and fabricate components for semi-trucks, trailers, dump trucks, box trucks, utility vehicles, and service trucks. Our fleet services include frame repairs, trailer maintenance, welding, structural repairs, aluminum welding, equipment modifications, preventive maintenance, and emergency on-site support.",
      "By identifying and repairing problems before they become major failures, we help reduce downtime, improve safety, extend equipment life, and keep your fleet operating at peak performance.",
    ],
  },
  "metal-fabrication": {
    id: "metal-fabrication",
    title: "Metal Fabrication",
    icon: Hammer,
    paragraphs: [
      "Labida LLC specializes in custom metal fabrication for commercial, industrial, transportation, and construction industries. We design, build, modify, and repair steel and aluminum components that are built to meet your exact needs.",
      "Our fabrication services include custom brackets, equipment supports, trailer modifications, truck accessories, racks, platforms, stairs, railings, gates, structural components, machine guards, repair panels, reinforcement plates, and one-of-a-kind fabricated parts. Whether you need a single custom piece or a complete fabrication project, we combine precision craftsmanship with durable materials to produce reliable, long-lasting results.",
      "From concept to installation, Labida LLC delivers high-quality metal fabrication solutions that improve functionality, increase durability, and keep your equipment and facilities working safely and efficiently.",
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(serviceDetails).map((id) => ({ id }));
}

const blockClass = "bg-dark-gray border border-white/10 p-6";

function InfoBlock({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className={blockClass}>
      <h2 className="text-xl font-black text-white uppercase tracking-tight mb-4">
        {title}
      </h2>
      {children}
    </div>
  );
}

function CompactContact() {
  return (
    <div className={blockClass}>
      <h2 className="text-xl font-black text-white uppercase tracking-tight mb-2">
        Need this service?
      </h2>
      <p className="text-white/70 text-sm mb-5">
        Call or message us — we&apos;ll get you a quote and dispatch ASAP.
      </p>

      <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4 sm:gap-6 mb-5 text-sm">
        <a
          href="tel:+15853157599"
          className="inline-flex items-center gap-2 text-warning-yellow hover:text-warning-yellow/80 transition-colors font-semibold"
        >
          <Phone className="w-4 h-4 shrink-0" strokeWidth={2} />
          +1 (585) 315-7599
        </a>
        <a
          href="mailto:labidallc@gmail.com"
          className="inline-flex items-center gap-2 text-warning-yellow hover:text-warning-yellow/80 transition-colors font-semibold"
        >
          <Mail className="w-4 h-4 shrink-0" strokeWidth={2} />
          labidallc@gmail.com
        </a>
        <a
          href={GOOGLE_MAPS_PLACE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-white/80 hover:text-warning-yellow transition-colors"
        >
          <MapPin className="w-4 h-4 shrink-0 text-warning-yellow" strokeWidth={2} />
          {LABIDA_ADDRESS}
        </a>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <a
          href="tel:+15853157599"
          className="bg-warning-yellow text-black px-6 py-3 text-sm font-black uppercase tracking-wider hover:bg-warning-yellow/80 transition-colors text-center"
        >
          Call Now
        </a>
        <Link
          href="/#contact"
          className="border border-warning-yellow text-warning-yellow px-6 py-3 text-sm font-black uppercase tracking-wider hover:bg-warning-yellow hover:text-black transition-colors text-center"
        >
          Contact Form
        </Link>
      </div>
    </div>
  );
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const service = serviceDetails[id];

  if (!service) {
    notFound();
  }

  const IconComponent = service.icon;

  return (
    <main className="min-h-screen bg-black">
      <Header />
      <section className="relative w-full bg-black pt-6 pb-16 lg:pt-8 lg:pb-20 overflow-hidden">
        <StarField />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <Link
            href="/#services"
            className="inline-flex items-center gap-2 text-white/80 hover:text-warning-yellow transition-colors mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Services</span>
          </Link>

          <div className="max-w-4xl mx-auto space-y-6">
            <PageReveal
              delayMs={0}
              className="flex flex-col sm:flex-row sm:items-center gap-4"
            >
              <div className="text-warning-yellow shrink-0">
                <IconComponent className="w-12 h-12" />
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight">
                {service.title}
              </h1>
            </PageReveal>

            <PageReveal delayMs={100}>
              <InfoBlock title="Overview">
                <div className="space-y-4 text-white/80 leading-relaxed">
                  {service.paragraphs.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </InfoBlock>
            </PageReveal>

            <PageReveal delayMs={200}>
              <CompactContact />
            </PageReveal>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
