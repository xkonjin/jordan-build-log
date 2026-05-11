import type { NextConfig } from "next";

// Sentry server packages use dynamic expressions in OpenTelemetry that
// conflict with Next.js App Router's static bundling (Html-outside-_document).
// Mark them external so they're required at runtime rather than bundled.
// withSentryConfig is intentionally omitted — it overrides serverExternalPackages.
// Source-map upload is handled via SENTRY_AUTH_TOKEN in Vercel env vars.
const nextConfig: NextConfig = {
  reactStrictMode: true,
  typedRoutes: true,
  serverExternalPackages: [
    "@sentry/nextjs",
    "@sentry/node",
    "@opentelemetry/instrumentation",
  ],
};

export default nextConfig;
