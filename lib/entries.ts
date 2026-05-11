import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";

const ENTRIES_DIR = path.join(process.cwd(), "content", "entries");

export type EntryFrontmatter = {
  title: string;
  date: string;
  summary?: string;
};

export type EntryListItem = {
  slug: string;
  frontmatter: EntryFrontmatter;
};

export type Entry = EntryListItem & {
  html: string;
};

function slugFromFilename(filename: string) {
  return filename.replace(/\.mdx?$/, "");
}

function readEntryFile(filename: string): EntryListItem & { raw: string } {
  const filePath = path.join(ENTRIES_DIR, filename);
  const file = fs.readFileSync(filePath, "utf8");
  const parsed = matter(file);
  const fm = parsed.data as Partial<EntryFrontmatter>;
  if (!fm.title || !fm.date) {
    throw new Error(`Entry ${filename} is missing required frontmatter (title, date).`);
  }
  return {
    slug: slugFromFilename(filename),
    frontmatter: {
      title: fm.title,
      date: fm.date,
      summary: fm.summary,
    },
    raw: parsed.content,
  };
}

export function listEntries(): EntryListItem[] {
  if (!fs.existsSync(ENTRIES_DIR)) return [];
  return fs
    .readdirSync(ENTRIES_DIR)
    .filter((f) => /\.mdx?$/.test(f))
    .map((f) => readEntryFile(f))
    .map(({ slug, frontmatter }) => ({ slug, frontmatter }))
    .sort((a, b) =>
      b.frontmatter.date.localeCompare(a.frontmatter.date),
    );
}

export async function getEntry(slug: string): Promise<Entry | null> {
  const md = `${slug}.md`;
  const mdx = `${slug}.mdx`;
  const filename = fs.existsSync(path.join(ENTRIES_DIR, mdx))
    ? mdx
    : fs.existsSync(path.join(ENTRIES_DIR, md))
      ? md
      : null;
  if (!filename) return null;
  const { slug: s, frontmatter, raw } = readEntryFile(filename);
  const file = await remark().use(remarkGfm).use(remarkHtml).process(raw);
  return {
    slug: s,
    frontmatter,
    html: file.toString(),
  };
}
