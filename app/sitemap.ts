import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://sidineyr.github.io/Einstein-Fisica';
  return [
    { url: `${base}/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    { url: `${base}/sobre/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  ];
}
