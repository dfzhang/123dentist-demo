import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Disable compression — the tunnel proxy (Fly.io) adds content-encoding: gzip
  // but doesn't actually compress the body, causing ERR_CONTENT_DECODING_FAILED.
  // Let the reverse proxy handle compression instead.
  compress: false,
};

export default nextConfig;
