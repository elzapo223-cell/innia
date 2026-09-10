/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    // Windows + Node 22: la caché en disco de webpack dispara
    // "EISDIR: readlink" al hacer snapshot de dependencias. La desactivamos.
    config.resolve.symlinks = false;
    config.cache = false;
    return config;
  },
};
export default nextConfig;
