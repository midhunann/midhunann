'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { BlogPost } from '@/types';
import { formatDate } from '@/lib/utils';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

interface BlogCardProps {
  post: BlogPost;
  index?: number;
}

export function BlogCard({ post, index = 0 }: BlogCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <Link href={`/blog/${post.slug}`}>
        <div className="glass-card p-6 h-full flex flex-col transition-all duration-300 hover:scale-[1.02]">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 text-xs font-mono bg-ocean/10 text-ocean rounded"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h3 className="text-xl font-semibold text-pearl group-hover:text-ocean transition-colors mb-2">
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="text-pearl/60 text-sm line-clamp-3 mb-4 grow">
            {post.excerpt}
          </p>

          {/* Meta */}
          <div className="flex items-center gap-4 text-sm text-pearl/50 pt-4 border-t border-ocean/10">
            <span className="flex items-center gap-1">
              <Calendar size={14} />
              {formatDate(post.publishedAt)}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={14} />
              {post.readTime}
            </span>
          </div>

          {/* Read More */}
          <div className="mt-4 text-ocean text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
            Read article
            <ArrowRight size={14} />
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
