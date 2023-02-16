/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: { esmExternals: true },
  // async rewrites() {
  //   return [
  //     {
  //       resource: "/:path*",
  //       destination:
  //         "http://openapi.molit.go.kr/OpenAPI_ToolInstallPackage/service/rest/RTMSOBJSvc/getRTMSDataSvcNrgTrade/:path*",
  //     },
  //   ];
  // },
};

module.exports = nextConfig;
