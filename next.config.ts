import type { NextConfig } from 'next';

const isProduction = process.env.NODE_ENV === 'production';
const nextConfig: NextConfig = {
  output: 'export',
  basePath: isProduction ? '/Einstein-Fisica' : '',
  assetPrefix: isProduction ? '/Einstein-Fisica/' : undefined,
  images: { unoptimized: true },
};

export default nextConfig;
