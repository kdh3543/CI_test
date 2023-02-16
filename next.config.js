/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: { esmExternals: true },
  // async rewrites() {
  //   return [
  //     {
  //       resource: "/:path*",
  //       destination: "http://openapi.molit.go.kr/:path*",
  //     },
  //   ];
  // },
};

module.exports = nextConfig;
