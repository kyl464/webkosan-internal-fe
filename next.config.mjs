/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "flowbite.com",
      "cdn-icons-png.flaticon.com",
      "lh3.googleusercontent.com", // Untuk gambar profil dari Google
    ],
  },
};

export default nextConfig;
