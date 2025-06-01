'use client';

import { motion } from 'framer-motion';
import ProjectCard from '../components/ProjectCard';
import PageTransition from '../components/PageTransition';

const projects = [
  {
    title: "Learning the Unspoken",
    description: "A competition-winning auditory intent classifier supporting autism research, utilizing 7000+ samples of nonverbal communications. Implements a sophisticated ML pipeline with transformer models to accurately determine emotions and communication patterns.",
    technologies: ["Python", "Polars", "Tensorflow", "Scikit-learn", "Keras", "Librosa", "Numpy"],
    link: "https://learningtheunspoken.github.io",
    isWebsite: true
  },
  {
    title: "Kalshi Market Maker",
    description: "A sophisticated market making program for Kalshi prediction markets, featuring real-time data collection, automated trading strategies, and WebSocket integration for live market updates. Use it if you like making money off of the weather :)",
    technologies: ["Python", "Selenium", "Matplotlib"],
    link: "https://github.com/eshan327/kalshi_scraper"
  },
  {
    title: "Javachain",
    description: "A proof-of-work blockchain implementation in Java featuring secure data storage, cryptographic signatures, mining mechanisms, and wallet functionality with public/private key pairs.",
    technologies: ["Java", "Maven", "JUnit"],
    link: "https://github.com/eshan327/Javachain"
  },
  {
    title: "Poisson Disk Sequences",
    description: "An interactive visualization tool using Poisson-Disk sampling to generate points with variable distance constraints. Built with Rust and WebAssembly for high performance. Inspired by taking statistics in Fall '24.",
    technologies: ["Rust", "WebAssembly"],
    link: "https://github.com/eshan327/Poisson-Disk-Sequences"
  },
  {
    title: "GroceryZone",
    description: "A full-stack online grocery shopping web application with database support, featuring user-driven functionality and a comprehensive shopping experience.",
    technologies: ["Python", "Javascript", "HTML", "CSS", "Django", "PostgreSQL"],
    link: "https://github.com/eshan327/GroceryZone"
  },
  {
    title: "Corporate Manager",
    description: "A full-stack CRUD application built with Spring Boot and React, simulating an employee management system with modern web technologies.",
    technologies: ["Java", "Javascript", "HTML", "CSS", "Spring Boot", "React", "MySQL"],
    link: "https://github.com/eshan327/Corporate-Manager"
  },
  {
    title: "This Website 🕶️",
    description: "A clean, modern website powered by Next.js/React and Tailwind for the viewing of anyone curious.",
    technologies: ["Typescript", "Next.js", "Tailwind CSS", "React"],
    link: "#",
    isWebsite: true
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5
    }
  }
};

export default function Projects() {
  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4 gradient-text">My Projects</h1>
          <p className="text-gray-600 dark:text-gray-300">
            A collection of my work and personal projects
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              variants={itemVariants}
              className="h-full"
            >
              <ProjectCard {...project} />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <h2 className="text-2xl font-semibold mb-4">Academic Projects</h2>
          <p className="text-gray-400 dark:text-gray-200 max-w-3xl mx-auto mb-8">
            Beyond these public projects, I&apos;ve worked on numerous academic projects that have significantly contributed to my growth as a developer. These include a C compiler built in OCaml, a Rust-powered garbage collector, a command line shell in C, and many more. While these projects aren&apos;t publicly shareable here, they&apos;ve provided invaluable experience in systems programming, compiler design, DSA, and object-oriented and functional paradigms.
          </p>
          <a
            href="https://github.com/eshan327"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
          >
            Visit my GitHub
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
          </a>
        </motion.div>
      </div>
    </PageTransition>
  );
} 