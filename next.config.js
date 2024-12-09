/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["antd"],
  output: "standalone",
  swcMinify: true,
  ignoreBuildErrors: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "final-asm.s3.ap-southeast-2.amazonaws.com",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
