import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getPostBySlug } from "@/blog";
import { Button } from "@/components/ui/button.jsx";

export default function BlogPost() {
  const { slug } = useParams();
  const post = getPostBySlug(slug);

  if (!post) {
    return (
      <div className="py-16">
        <p className="mb-6">Post not found.</p>
        <Button asChild><Link to="/">Back home</Link></Button>
      </div>
    );
  }

  return (
    <article className="prose dark:prose-invert max-w-3xl mx-auto py-16">
      <h1 className="mb-1">{post.title}</h1>
      <p className="text-sm text-muted-foreground">{post.date}</p>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
      <div className="mt-8">
        <Button asChild variant="secondary"><Link to="/">← Back</Link></Button>
      </div>
    </article>
  );
}
