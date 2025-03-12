/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['prueba-tecnica-api-tienda-moviles.onrender.com'],
      remotePatterns: [
        {
          protocol: 'http',
          hostname: 'prueba-tecnica-api-tienda-moviles.onrender.com',
          port: '',
          pathname: '/images/**',
        },
        {
          protocol: 'https',
          hostname: 'prueba-tecnica-api-tienda-moviles.onrender.com',
          port: '',
          pathname: '/images/**',
        },
      ],
    },
  };

export default nextConfig;
