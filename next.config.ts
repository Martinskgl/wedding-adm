import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      // Adicione aqui os domínios de imagem que o seu projeto usa
      // Exemplo:
      // { protocol: "https", hostname: "exemplo.com" },
    ],
  },
};

export default nextConfig;
