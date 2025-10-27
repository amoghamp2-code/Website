import { Link } from "react-router-dom";
import { posts } from "@/blog";
import { Card, CardContent } from "@/components/ui/card.jsx";
import { Badge } from "@/components/ui/badge.jsx";

export default function Blog() {
  if (!posts.length) return null;

  return (
    <section id="blog" className="py-16">
      <div className="flex items-center gap-3 mb-6">
        <h2 className="text-2xl font-bold">Blog</h2>
        {import.meta.env.VITE_STAGE === "preview" && (
          <Badge>Preview (drafts visible)</Badge>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {posts.map(p => (
          <Link key={p.slug} to={`/blog/${p.slug}`} className="block">
            <Card className="hover:shadow-md transition">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg">{p.title}</h3>
                <p className="text-sm text-muted-foreground">{p.date}</p>
                <p className="mt-3 text-sm text-muted-foreground">{p.excerpt}</p>
                {p.draft && (
                  <span className="mt-3 inline-block">
                    <Badge variant="secondary">Draft</Badge>
                  </span>
                )}
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
