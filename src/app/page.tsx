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

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <section className="text-center py-20">
        <h1 className="text-4xl sm:text-5xl font-bold mb-6">
          Hi, I&apos;m <span className="text-blue-600 dark:text-blue-400">Eshan</span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
          I&apos;m a software engineer passionate about building innovative solutions and creating impactful user experiences.
        </p>
        <div className="flex justify-center space-x-4">
          <a
            href="/projects"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            View My Work
          </a>
          <a
            href="/contact"
            className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
          >
            Contact Me
          </a>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20">
        <h2 className="text-3xl font-bold mb-8">About Me</h2>
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              I&apos;m a junior undergraduate student at the University of Maryland, pursuing a double major in Computer Science and Mathematics. My journey in technology began in 9th grade when I took my first Python course, sparking a passion for programming that has continued to grow ever since.
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              The combination of Computer Science and Mathematics has given me a unique perspective on problem-solving, allowing me to approach challenges with both analytical rigor and computational thinking. I aim to be a team player who communicates effectively, never stops learning, and has the technical skills to tackle any challenge.
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              I&apos;m always looking for new challenges and opportunities to grow as a developer.
            </p>
          </div>
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Languages</h3>
              <div className="flex flex-wrap gap-2">
                {languages.map((skill) => (
                  <span
                    key={skill}
                    className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Tools & Frameworks</h3>
              <div className="flex flex-wrap gap-2">
                {tools.map((tool) => (
                  <span
                    key={tool}
                    className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
