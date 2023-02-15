/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";
const nextConfig = {
  reactStrictMode: true,
  experimental: { esmExternals: true },
  assetPrefix: isProd ? "https://master.dgnto816nv0gi.amplifyapp.com/" : "",
};

module.exports = nextConfig;
