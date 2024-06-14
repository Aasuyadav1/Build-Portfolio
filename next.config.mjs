/** @type {import('next').NextConfig} */
// next.config.mjs
const nextConfig = {
    images: {
      domains: ['images.unsplash.com', 'res.cloudinary.com'],
    },
    eslint: {
      ignoreDuringBuilds: true,
    }
  };
  
  export default nextConfig;
  
