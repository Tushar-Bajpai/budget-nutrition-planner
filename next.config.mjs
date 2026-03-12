/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  allowedDevOrigins: ["http://192.168.43.222:3000", "http://169.254.75.189:3000"],
}

export default nextConfig
