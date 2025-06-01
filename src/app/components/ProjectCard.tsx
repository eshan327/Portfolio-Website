'use client';

import { motion } from 'framer-motion';

interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  link: string;
  isWebsite?: boolean;
}

export default function ProjectCard({
  title,
  description,
  technologies,
  link,
  isWebsite = false,
}: ProjectCardProps) {
  return (
    <motion.div
      className="card p-6 h-full"
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h3 className="text-xl font-semibold mb-2 gradient-text">
        {title}
      </h3>
      
      <p className="text-gray-300 mb-4">
        {description}
      </p>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {technologies.map((tech) => (
          <span
            key={tech}
            className="tag"
          >
            {tech}
          </span>
        ))}
      </div>
      
      <motion.a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors"
        whileHover={{ x: 5 }}
        whileTap={{ scale: 0.95 }}
      >
        {isWebsite ? 'View Website' : 'View Code'}
        <svg
          className="w-4 h-4 ml-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M14 5l7 7m0 0l-7 7m7-7H3"
          />
        </svg>
      </motion.a>
    </motion.div>
  );
} 