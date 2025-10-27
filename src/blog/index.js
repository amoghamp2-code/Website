import matter from "gray-matter";

// Load all markdown files at build time (Vite)
const files = import.meta.glob("./*.md", { as: "raw", eager: true });

const STAGE = import.meta.env.VITE_STAGE || "prod"; // 'preview' or 'prod'
const isPreview = STAGE !== "prod";

function parse(mdRaw) {
  const { data, content } = matter(mdRaw);
  // minimal validation
  const meta = {
    title: data.title || "Untitled",
    date: data.date || "1970-01-01",
    slug: data.slug,
    excerpt: data.excerpt || "",
    draft: !!data.draft,
  };
  return { meta, content };
}

const all = Object.entries(files).map(([path, raw]) => {
  const { meta, content } = parse(raw);
  return { ...meta, content };
});

// filter + sort (newest first)
export const posts = all
  .filter(p => (isPreview ? true : !p.draft))
  .sort((a, b) => new Date(b.date) - new Date(a.date));

export function getPostBySlug(slug) {
  return posts.find(p => p.slug === slug);
}
