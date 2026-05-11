import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(): Promise<Response> {
  const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN;
  if (!dsn) {
    return NextResponse.json(
      {
        ok: false,
        reason:
          "NEXT_PUBLIC_SENTRY_DSN is not set. Configure it on Vercel to enable error capture.",
      },
      { status: 503 },
    );
  }

  const Sentry = await import("@sentry/nextjs");
  const eventId = Sentry.captureMessage(
    `jordan-build-log synthetic test (${new Date().toISOString()})`,
    "info",
  );
  await Sentry.flush(2000);
  return NextResponse.json({ ok: true, eventId });
}
