import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  outputFileTracingRoot: "C:\\Users\\ardii\\AppData\\Local\\Temp\\opencode\\ardmst-hub",
  images: { dangerouslyAllowSVG: true, contentDispositionType: "attachment", contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;" },
};
export default nextConfig;
