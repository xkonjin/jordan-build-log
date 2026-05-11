import Link from "next/link";

export default function NotFound() {
  return (
    <div className="py-20 text-center">
      <p className="font-mono text-xs uppercase tracking-[0.18em] text-(--color-muted) mb-4">
        404
      </p>
      <p className="text-sm text-(--color-muted) mb-6">
        No entry here. Try the{" "}
        <Link href="/" className="underline underline-offset-2">
          latest entry
        </Link>
        .
      </p>
    </div>
  );
}
