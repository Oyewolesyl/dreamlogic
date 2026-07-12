/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    "@dream-logic/astrology-domain",
    "@dream-logic/brand",
    "@dream-logic/design-tokens",
    "@dream-logic/glyphs",
    "@dream-logic/subscriptions"
  ]
};

export default nextConfig;
