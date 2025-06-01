'use client';

import { motion } from 'framer-motion';
import { ArrowRightIcon, CodeIcon, GearIcon } from '@radix-ui/react-icons';
import TypeWriter from './components/TypeWriter';
import PageTransition from './components/PageTransition';

export default function Home() {
  const languages = [
    "Python", "Java", "C", "JavaScript", "TypeScript", 
    "OCaml", "Rust", "Assembly", "MATLAB", "R", "SQL",
    "HTML", "CSS"
  ];

  const tools = [
    "React", "Next.js", "Tailwind CSS", "Django", "Spring Boot", 
    "Node.js", "Git", "Docker", "Linux", "VS Code", "Jupyter"
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

  return (
    <PageTransition>
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      >
        {/* Hero Section */}
        <motion.section 
          variants={itemVariants}
          className="text-center py-20 relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl -z-10 blur-3xl" />
          <motion.h1 
            className="text-5xl sm:text-6xl font-bold mb-6"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            Hi, I&apos;m <span className="gradient-text">Eshan</span>
          </motion.h1>
          <motion.div 
            className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            <TypeWriter 
              text="CS/Math student passionate about building impactful technology and aspiring to be an interdisciplinary programmer."
              className="block"
            />
          </motion.div>
          <motion.div 
            className="flex justify-center space-x-4"
            variants={itemVariants}
          >
            <motion.a
              href="/projects"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all hover-lift flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View My Work
              <ArrowRightIcon className="w-4 h-4" />
            </motion.a>
            <motion.a
              href="/contact"
              className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all hover-lift"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Me
            </motion.a>
          </motion.div>
        </motion.section>

        {/* About Section */}
        <motion.section 
          variants={itemVariants}
          className="py-20"
        >
          <motion.h2 
            className="text-3xl font-bold mb-8 gradient-text"
            variants={itemVariants}
          >
            About Me
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div variants={itemVariants}>
              <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                I&apos;m a junior undergraduate student at the University of Maryland, pursuing a double major in Computer Science and Mathematics. My journey in technology began in 9th grade when I took my first Python course, sparking a passion for programming that has continued to grow ever since.
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                The combination of Computer Science and Mathematics has given me a unique perspective on problem-solving, allowing me to approach challenges with both analytical rigor and computational thinking. I aim to be a team player who communicates effectively, never stops learning, and has the technical skills to tackle any challenge.
              </p>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                I&apos;m always looking for new challenges and opportunities to grow as a developer.
              </p>
            </motion.div>
            <motion.div className="space-y-8" variants={itemVariants}>
              <div>
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <CodeIcon className="w-5 h-5" />
                  Languages
                </h3>
                <div className="flex flex-wrap gap-2">
                  {languages.map((skill) => (
                    <motion.span
                      key={skill}
                      className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-sm hover-lift"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <GearIcon className="w-5 h-5" />
                  Tools & Frameworks
                </h3>
                <div className="flex flex-wrap gap-2">
                  {tools.map((tool) => (
                    <motion.span
                      key={tool}
                      className="bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm hover-lift"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {tool}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>
      </motion.div>
    </PageTransition>
  );
}
