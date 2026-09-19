/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/dn6bzdlno/image/upload/**",
      },
    ],
  },
  async redirects() {
    return [
      { source: "/portfolio", destination: "/", permanent: true },
      { source: "/contact", destination: "/#contact", permanent: true },
    ];
  },
};
