/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "s3.amazonaws.com",
      "github.com",
      "k.kakaocdn.net",
      "storage.googleapis.com",
      "dormitory-family-images-bucket.s3.ap-northeast-2.amazonaws.com",
      "t1.kakaocdn.net",
      "doomz.s3.ap-northeast-2.amazonaws.com",
    ],
  },

  webpack: (config, { isServer }) => {
    if (!isServer) {
      // 클라이언트 번들에서 undici 제외
      config.resolve.fallback = {
        ...config.resolve.fallback,
        undici: false,
      };
    }
    return config;
  },
  reactStrictMode: false,
  swcMinify: true,
};

module.exports = nextConfig;
