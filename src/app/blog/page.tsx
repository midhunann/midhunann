import { Metadata } from 'next';
import { BlogCard, Section, BackgroundBeams } from '@/components/ui';
import { blogPosts } from '@/data';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Insights on web development, hackathons, VS Code extensions, and building products that people love.',
};

export default function BlogPage() {
  const featuredPosts = blogPosts.filter((post) => post.featured);

  return (
    <div className="relative">
      {/* Background */}
      <BackgroundBeams className="opacity-30" />

      {/* Featured Posts */}
      <Section
        title="Blog"
        subtitle="Thoughts on building products, winning hackathons, and everything in between"
        centered
        className="pt-8"
      >
        {/* Featured */}
        {featuredPosts.length > 0 && (
          <div className="mb-16">
            <h3 className="text-xl font-semibold text-pearl mb-6 text-center">
              Featured Posts
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {featuredPosts.map((post, index) => (
                <BlogCard key={post.id} post={post} index={index} />
              ))}
            </div>
          </div>
        )}

        {/* All Posts */}
        <div>
          <h3 className="text-xl font-semibold text-pearl mb-6 text-center">
            All Posts
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <BlogCard key={post.id} post={post} index={index} />
            ))}
          </div>
        </div>
      </Section>
    </div>
  );
}
