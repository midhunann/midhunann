'use client';

import { motion } from 'framer-motion';
import { Trophy, Award, Medal, Briefcase } from 'lucide-react';
import { Achievement } from '@/types';
import { cn } from '@/lib/utils';

interface AchievementCardProps {
  achievement: Achievement;
  index?: number;
}

export function AchievementCard({ achievement, index = 0 }: AchievementCardProps) {
  const typeIcons = {
    hackathon: Trophy,
    award: Award,
    position: Briefcase,
    certification: Medal,
  };

  const Icon = typeIcons[achievement.type];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="glass-card p-6 flex gap-4 group hover:scale-[1.02] transition-all duration-300"
    >
      {/* Icon */}
      <div className={cn(
        'shrink-0 w-12 h-12 rounded-xl flex items-center justify-center',
        achievement.type === 'hackathon' && 'bg-ocean/20 text-ocean',
        achievement.type === 'award' && 'bg-yellow-500/20 text-yellow-400',
        achievement.type === 'position' && 'bg-midnight/50 text-pearl/80',
        achievement.type === 'certification' && 'bg-green-500/20 text-green-400'
      )}>
        <Icon size={24} />
      </div>

      {/* Content */}
      <div className="grow min-w-0">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-pearl group-hover:text-ocean transition-colors">
            {achievement.title}
          </h3>
          <span className="shrink-0 text-sm text-pearl/50">
            {achievement.year}
          </span>
        </div>
        <p className="text-sm text-ocean mt-1">
          {achievement.organization}
        </p>
        <p className="text-sm text-pearl/60 mt-2 line-clamp-2">
          {achievement.description}
        </p>
        {achievement.link && (
          <a
            href={achievement.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-3 text-sm text-ocean hover:underline"
          >
            View details →
          </a>
        )}
      </div>
    </motion.div>
  );
}
