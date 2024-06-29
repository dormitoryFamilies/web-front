/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "github.com",
      "k.kakaocdn.net",
      "storage.googleapis.com",
      "dormitory-family-images-bucket.s3.ap-northeast-2.amazonaws.com",
      "t1.kakaocdn.net",
    ],
  },
  reactStrictMode: false,
  swcMinify: true,
};

module.exports = nextConfig;
