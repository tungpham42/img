import { MetadataRoute } from "next";
import { getHostUrl } from "@/utils/getHostUrl";
import supportedFormats from "@/supportedFormats";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Start with the static homepage URL.
  const BASE_URL = await getHostUrl(); // Change this to your actual domain
  const sitemap: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
  ];

  // Generate all dynamic conversion routes.
  for (const fromFormat of supportedFormats) {
    for (const toFormat of supportedFormats) {
      // Exclude converting a format to itself.
      if (fromFormat !== toFormat) {
        sitemap.push({
          url: `${BASE_URL}/${fromFormat}/${toFormat}`,
          lastModified: new Date(),
          changeFrequency: "weekly", // Conversion pages are dynamic and may be updated more often.
          priority: 0.8,
        });
      }
    }
  }

  return sitemap;
}
