import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  typescript: {
    tsconfigPath: "./tsconfig.next.json",
  },
};

export default nextConfig;
