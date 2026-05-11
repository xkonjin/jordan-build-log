import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getEntry, listEntries } from "@/lib/entries";

export function generateStaticParams() {
  return listEntries().map((e) => ({ slug: e.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
): Promise<Metadata> {
  const { slug } = await params;
  const entry = await getEntry(slug);
  if (!entry) return { title: "Entry not found" };
  return {
    title: `${entry.frontmatter.title} - Jordan Build Log`,
    description: entry.frontmatter.summary,
  };
}

function formatDate(iso: string): string {
  const d = new Date(iso + "T00:00:00Z");
  return d.toLocaleDateString("en-US", {
    timeZone: "UTC",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function EntryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = await getEntry(slug);
  if (!entry) notFound();

  return (
    <main>
      <p className="font-mono text-xs uppercase tracking-[0.18em] text-(--color-muted) mb-2">
        <time dateTime={entry.frontmatter.date}>
          {formatDate(entry.frontmatter.date)}
        </time>
      </p>
      <h2 className="text-xl md:text-2xl font-semibold tracking-tight mb-5">
        {entry.frontmatter.title}
      </h2>
      <div
        className="prose-entry"
        dangerouslySetInnerHTML={{ __html: entry.html }}
      />
      <p className="mt-12 text-sm">
        <Link href="/" className="no-underline hover:underline">
          ← Back to log
        </Link>
      </p>
    </main>
  );
}
