export default function Projects() {
  const projects = [
    {
      title: "Learning the Unspoken",
      description: "A competition-winning auditory intent classifier supporting autism research, utilizing 7000+ samples of nonverbal communications. Implements a sophisticated ML pipeline with transformer models to accurately determine emotions and communication patterns.",
      technologies: ["Machine Learning", "Python", "Transformers", "Data Analysis"],
      link: "https://learningtheunspoken.github.io"
    },
    {
      title: "Kalshi Market Maker",
      description: "A sophisticated market making program for Kalshi prediction markets, featuring real-time data collection, automated trading strategies, and WebSocket integration for live market updates. Use it if you like making money off of the weather :)",
      technologies: ["Python", "WebSockets", "Trading", "Data Analysis"],
      link: "https://github.com/eshan327/kalshi_scraper"
    },
    {
      title: "Javachain",
      description: "A proof-of-work blockchain implementation in Java featuring secure data storage, cryptographic signatures, mining mechanisms, and wallet functionality with public/private key pairs.",
      technologies: ["Java", "Maven", "Cryptography"],
      link: "https://github.com/eshan327/Javachain"
    },
    {
      title: "Poisson Disk Sequences",
      description: "An interactive visualization tool using Poisson-Disk sampling to generate points with variable distance constraints. Built with Rust and WebAssembly for high performance. Inspired by taking statistics in Fall '24.",
      technologies: ["Rust", "WebAssembly", "JavaScript", "Graphics"],
      link: "https://github.com/eshan327/Poisson-Disk-Sequences"
    },
    {
      title: "GroceryZone",
      description: "A full-stack online grocery shopping web application with database support, featuring user-driven functionality and a comprehensive shopping experience.",
      technologies: ["Python", "Web Development", "Database"],
      link: "https://github.com/eshan327/GroceryZone"
    },
    {
      title: "Corporate Manager",
      description: "A full-stack CRUD application built with Spring Boot and React, simulating an employee management system with modern web technologies.",
      technologies: ["Java", "Spring Boot", "React", "JavaScript"],
      link: "https://github.com/eshan327/Corporate-Manager"
    },
    {
      title: "This Website 😎",
      description: "A clean, modern website powered by Next.js/React and Tailwind for the viewing of anyone curious.",
      technologies: ["Next.js", "TypeScript", "Tailwind CSS", "React"],
      link: "#"
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold mb-12">Projects</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <a
                href={project.link}
                className="text-blue-600 dark:text-blue-400 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                View Project →
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <h2 className="text-2xl font-semibold mb-4">Academic Projects</h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Beyond these public projects, I've worked on numerous academic projects that have significantly contributed to my growth as a developer. These include a C compiler built in OCaml, a Rust-powered garbage collector, a command line shell in C, and many more. While these projects aren't publicly shareable, they've provided invaluable experience in systems programming, compiler design, DSA, and object-oriented and functional paradigms.
        </p>
      </div>
    </div>
  );
} 