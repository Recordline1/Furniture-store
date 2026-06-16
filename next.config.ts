import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'vvvflnycgavthrpaugyg.supabase.co', // один раз для всех фото
      },
    ],
  },
};

export default nextConfig;
