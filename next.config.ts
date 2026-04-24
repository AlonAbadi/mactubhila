import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/workshop",         destination: "/course-plus", permanent: true },
      { source: "/workshop/success", destination: "/course-plus/success", permanent: true },
      { source: "/strategy",         destination: "/in-person",   permanent: true },
      { source: "/strategy/success", destination: "/in-person/success",   permanent: true },
      { source: "/strategy/book",    destination: "/in-person/book",      permanent: true },
      { source: "/partnership",      destination: "/one-on-one",  permanent: true },
    ];
  },
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [390, 640, 828, 1080, 1200, 1920],
    imageSizes: [64, 128, 256, 384],
  },
};

export default nextConfig;
