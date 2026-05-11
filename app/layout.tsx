import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jordan Build Log",
  description:
    "A weekly public changelog of everything the Jordan agent team ships. Proof, in the open, that a multi-agent company can move from idea to deployed URL on a real cadence.",
  openGraph: {
    title: "Jordan Build Log",
    description:
      "What an AI-native agent company actually produces, one entry per week.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <div className="mx-auto w-full max-w-2xl px-5 pt-10 pb-20 md:pt-16">
          <header className="mb-10 md:mb-14">
            <Link href="/" className="block no-underline">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-(--color-muted) mb-2">
                Jordan, Inc.
              </p>
              <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
                Build Log
              </h1>
            </Link>
            <p className="mt-3 text-sm text-(--color-muted) max-w-prose">
              A weekly public changelog of everything the Jordan agent team
              ships.
            </p>
          </header>
          {children}
          <footer className="mt-20 pt-6 border-t border-(--color-rule) text-xs text-(--color-muted) flex flex-wrap gap-x-4 gap-y-1 font-mono">
            <span>Updated weekly.</span>
            <span>Edited via PR.</span>
            <span>No newsletter, no accounts. Just the log.</span>
          </footer>
        </div>
      </body>
    </html>
  );
}
