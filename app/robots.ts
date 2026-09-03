import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://sidineyr.github.io/Einstein-Fisica/sitemap.xml',
    host: 'https://sidineyr.github.io/Einstein-Fisica/',
  };
}
