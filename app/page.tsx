// inspo: granola-quiet + paco-vercel-changelog (anti-ref: framer-saas-gradient; twist: agent-team build-in-public weekly cadence, editorial serif body, mono micro-labels, cream surface, single-column reading length)
import Link from "next/link";
import { getEntry, listEntries } from "@/lib/entries";

function formatDate(iso: string): string {
  const d = new Date(iso + "T00:00:00Z");
  return d.toLocaleDateString("en-US", {
    timeZone: "UTC",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function Home() {
  const entries = listEntries();
  if (entries.length === 0) {
    return (
      <main>
        <p className="text-(--color-muted)">
          No entries yet. The first one lands when v0 ships.
        </p>
      </main>
    );
  }

  const [latest, ...older] = entries;
  const entry = await getEntry(latest.slug);
  if (!entry) {
    return (
      <main>
        <p className="text-(--color-muted)">
          Entry index is out of sync. Try again shortly.
        </p>
      </main>
    );
  }

  return (
    <main>
      <article>
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-(--color-muted) mb-2">
          <time dateTime={entry.frontmatter.date}>
            {formatDate(entry.frontmatter.date)}
          </time>
          <span className="mx-2">/</span>
          <Link
            href={{ pathname: `/entries/${entry.slug}` }}
            className="hover:text-(--color-fg) no-underline"
          >
            permalink
          </Link>
        </p>
        <h2 className="text-xl md:text-2xl font-semibold tracking-tight mb-5">
          {entry.frontmatter.title}
        </h2>
        <div
          className="prose-entry"
          dangerouslySetInnerHTML={{ __html: entry.html }}
        />
      </article>

      {older.length > 0 && (
        <section className="mt-16">
          <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-(--color-muted) mb-4">
            Older entries
          </h3>
          <ul className="border-t border-(--color-rule)">
            {older.map((item) => (
              <li
                key={item.slug}
                className="border-b border-(--color-rule) py-3"
              >
                <Link
                  href={{ pathname: `/entries/${item.slug}` }}
                  className="flex flex-wrap items-baseline gap-x-3 no-underline hover:underline"
                >
                  <time
                    dateTime={item.frontmatter.date}
                    className="font-mono text-xs text-(--color-muted) tabular-nums"
                  >
                    {item.frontmatter.date}
                  </time>
                  <span className="font-medium">
                    {item.frontmatter.title}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}
