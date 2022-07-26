/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['cdn.discordapp.com'],
  },
  webpack: function (config) {
    config.module.rules.push({
      test: /\.md$/i,
      type: 'asset/source',
    });
    return config;
  },
};

module.exports = nextConfig;
