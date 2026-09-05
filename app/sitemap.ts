import type { MetadataRoute } from "next";

const BASE_URL = "https://www.labidallc.com";

const serviceIds = [
  "emergency-mobile-welding",
  "heavy-equipment-repair",
  "fleet-maintenance",
  "metal-fabrication",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: BASE_URL,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    ...serviceIds.map((id) => ({
      url: `${BASE_URL}/services/${id}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
