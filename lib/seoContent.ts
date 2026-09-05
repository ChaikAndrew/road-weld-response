export const aboutSeoText = `Labida LLC is a professional mobile welding and metal fabrication company serving Rochester, NY and surrounding areas, including Henrietta, Greece, Webster, Victor, Waterloo, Finger Lakes, Batavia, Brockport, Irondequoit. We provide 24/7 emergency mobile welding, heavy equipment repair, fleet maintenance, trailer repair, truck welding, structural steel fabrication, dock repair, excavator bucket repair, and custom metal fabrication. Our fully equipped mobile welding units perform MIG, TIG, and stick welding on steel, aluminum, and stainless steel, handling frame cracks, chassis damage, trailer components, structural repairs, brackets, racks, railings and general repairs and modifications. Whether your truck, trailer, or heavy equipment needs repair at a job site, yard, or your business, our experienced welders deliver fast, reliable on-site service to minimize downtime and keep your business moving.`;

export interface FAQItem {
  question: string;
  answer: string;
}

export const faqItems: FAQItem[] = [
  {
    question: "Do you offer 24/7 emergency mobile welding in Rochester, NY?",
    answer:
      "Yes. Labida LLC provides round-the-clock emergency mobile welding for trucks, trailers, and heavy equipment across Rochester, the Finger Lakes region, and surrounding Western NY counties. We are available nights, weekends, and holidays when breakdowns cannot wait for shop hours.",
  },
  {
    question: "What types of welding services do you provide on-site?",
    answer:
      "Labida provides professional mobile MIG, TIG, and stick welding for steel, aluminum, and stainless steel throughout Rochester, NY and surrounding areas. We repair trailers, trucks, heavy equipment, structural steel, frame cracks, chassis damage, loading docks, and provide custom metal fabrication—all at your location to minimize downtime.",
  },
  {
    question: "What types of trailers do you repair?",
    answer:
      "We repair utility trailers, enclosed trailers, dump trailers, flatbeds, car haulers, equipment trailers, and semi-trailers, food trucks, RVs. Services include frame repair, aluminum welding, floor repairs, ramps, doors, custom modifications, and structural reinforcement.",
  },
  {
    question: "How fast can you reach a breakdown in the Rochester area?",
    answer:
      "Labida targets an average response time under 90 minutes for emergency calls in the Rochester area. Actual arrival time depends on your exact location, traffic, and road conditions.",
  },
  {
    question: "What areas around Rochester do you cover?",
    answer:
      "We serve Rochester, NY and the Finger Lakes region across Seneca, Cayuga, Genesee, Livingston, Monroe, Ontario, Orleans, Wayne, and Yates Counties. Key cities and communities include Rochester, Greece, Irondequoit, Webster, Brockport, Waterloo, and surrounding areas. We also respond to job sites, yards, and businesses throughout the region.",
  },
  {
    question: "Can you repair a truck or trailer frame on-site?",
    answer:
      "In many cases, yes. We can perform on-site structural welding for cracked frames, crossmembers, and trailer damage when conditions and safety allow. For severe frame damage, we will advise whether an on-site repair or shop-level work is the safer option.",
  },
  {
    question: "What custom metal fabrication services do you offer?",
    answer:
      "We design and fabricate custom racks, railings, brackets, trailer modifications, equipment mounts, structural steel components, and other custom metal solutions built to your specifications.",
  },
  {
    question: "How much does mobile welding cost in Rochester?",
    answer:
      "Every mobile welding job is priced individually based on the type of repair, materials required, and time on site. We do not use fixed rates — after you describe the damage and share your location, we provide a clear quote before any work begins.",
  },
  {
    question: "Do I need to tow my truck to a shop for welding?",
    answer:
      "Not always. Mobile welding eliminates towing costs and downtime for many frame, trailer, and equipment repairs. If the damage is too extensive for a safe on-site fix, we will tell you upfront and help you plan the next step.",
  },
  {
    question: "Can you repair heavy equipment on-site?",
    answer:
      "Absolutely. We perform on-site repairs for excavators, skid steers, loaders, bulldozers, buckets, attachments, and other construction and agricultural equipment. Mobile service helps reduce downtime by repairing equipment at your location.",
  },
];

/** Key cities / communities shown in About + schema */
export const serviceAreaCities = [
  "Rochester",
  "Greece",
  "Irondequoit",
  "Webster",
  "Brockport",
  "Waterloo",
  "Henrietta",
  "Victor",
  "Batavia",
  "Finger Lakes",
];

/** Counties covered across Western NY / Finger Lakes */
export const serviceAreaCounties = [
  "Monroe County",
  "Seneca County",
  "Cayuga County",
  "Genesee County",
  "Livingston County",
  "Ontario County",
  "Orleans County",
  "Wayne County",
  "Yates County",
];

/** Flat list for display/schema convenience */
export const serviceAreas = [...serviceAreaCities, ...serviceAreaCounties];

export const offeredServices = [
  {
    name: "Emergency Mobile Welding",
    description:
      "24/7 emergency mobile welding throughout Rochester, NY — mobile welding trucks come to you to get trucks, trailers, and equipment back in service fast.",
  },
  {
    name: "Heavy Equipment Repair",
    description:
      "Professional repair for excavators, loaders, bulldozers, buckets, attachments, and other heavy machinery with mobile welding and custom fabrication.",
  },
  {
    name: "Fleet Maintenance",
    description:
      "Comprehensive fleet maintenance and welding for trucking companies, contractors, municipalities, and commercial fleets across Rochester and surrounding communities.",
  },
  {
    name: "Metal Fabrication",
    description:
      "Custom steel and aluminum fabrication — brackets, racks, railings, trailer modifications, structural components, and one-of-a-kind parts built to your needs.",
  },
];

export function buildFaqPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
