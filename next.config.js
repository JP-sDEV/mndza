module.exports = {
  reactStrictMode: false,

  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "**.vercel.app",
        pathname: "/api/**",
      },
      {
        protocol: "https",
        hostname: "**.vercel.app",
        pathname: "?app=portfolio-theme-jqe0jhmif-atlamors.vercel.app",
      },
      {
        protocol: "https",
        hostname: "**.shields.io",
        pathname: "/badge/**",
      },
      {
        protocol: "https",
        hostname: "**.shields.io",
        pathname: "/github/**",
      },
      {
        protocol: "https",
        hostname: "**.githubusercontent.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "**.medium.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "**.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "**.youtube.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "**.strapiapp.com",
        pathname: "/**",
      },
    ],
  },
};
