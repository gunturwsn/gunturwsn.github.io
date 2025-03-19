import type { NextConfig } from "next";

const repoName = "gunturwsn.github.io";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,

  // Konfigurasi untuk export statis
  output: "export",

  // Konfigurasi basePath jika repository bukan username.github.io
  // Hapus basePath ini jika repository Anda adalah username.github.io
  //basePath: process.env.NODE_ENV === "production" ? `/${repoName}` : "",

  // Disable image optimization karena memerlukan server
  images: {
    unoptimized: true,
  },

  // Konfigurasi assetPrefix jika diperlukan untuk path assets
  //assetPrefix: process.env.NODE_ENV === "production" ? `/${repoName}` : "",

  // Tambahkan trailingSlash untuk konsistensi URL
  trailingSlash: true,
};

export default nextConfig;
