/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'cdn.pixabay.com',
      'lh3.googleusercontent.com' // Add this line for Google user content
    ]
  }
};

export default nextConfig;