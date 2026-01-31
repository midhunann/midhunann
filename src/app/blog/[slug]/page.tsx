import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import { getAllPostSlugs, getPostBySlug } from '@/data';
import { formatDate } from '@/lib/utils';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return { title: 'Post Not Found' };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      images: post.coverImage ? [post.coverImage] : [],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="relative">
      {/* Background */}
      <div className="absolute inset-0 bg-grid pointer-events-none" />

      <article className="pt-8 pb-16">
        <div className="container-custom max-w-3xl">
          {/* Back Button */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-pearl/60 hover:text-pearl transition-colors mb-8"
          >
            <ArrowLeft size={18} />
            Back to Blog
          </Link>

          {/* Header */}
          <header className="mb-12">
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-sm font-mono bg-ocean/10 text-ocean rounded"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-pearl mb-6">
              {post.title}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-6 text-pearl/50">
              <span className="flex items-center gap-2">
                <Calendar size={16} />
                {formatDate(post.publishedAt)}
              </span>
              <span className="flex items-center gap-2">
                <Clock size={16} />
                {post.readTime}
              </span>
            </div>
          </header>

          {/* Content */}
          <div className="glass-card p-8 md:p-12">
            <div className="prose prose-invert prose-lg max-w-none">
              {/* Coming Soon Notice */}
              <div className="text-center py-12 border-2 border-dashed border-ocean/30 rounded-xl">
                <p className="text-2xl mb-4">📝</p>
                <h2 className="text-2xl font-bold text-pearl mb-2">
                  Coming Soon
                </h2>
                <p className="text-pearl/60">
                  This blog post is currently being written. Check back soon!
                </p>
              </div>

              {/* Excerpt Preview */}
              <div className="mt-8 p-6 bg-midnight/30 rounded-xl">
                <h3 className="text-lg font-semibold text-pearl mb-2">
                  What to expect:
                </h3>
                <p className="text-pearl/70">{post.excerpt}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="mt-12 text-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-ocean hover:underline"
            >
              <ArrowLeft size={16} />
              View all blog posts
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
