# Portfolio Website

A modern, interactive portfolio website built with SvelteKit, featuring a retro gaming-inspired desktop interface.

## 🚀 Features

- **Desktop OS Interface**: Interactive window management with draggable, resizable windows
- **Tech Stack Showcase**: Visual skills dashboard with technology logos
- **Project Gallery**: Detailed project cards with GitHub links and live demos
- **Resume Viewer**: Embedded PDF viewer for resume browsing
- **Responsive Design**: Mobile-friendly fallback for smaller screens
- **SEO Optimized**: Meta tags, Open Graph, and Twitter Cards for social sharing
- **Keyboard Navigation**: Tab to cycle windows, Escape to close

## 🛠️ Tech Stack

- **Framework**: SvelteKit (Svelte 5)
- **Styling**: Tailwind CSS v4
- **Markdown**: mdsvex for project content
- **Icons**: Lucide Svelte
- **Interactions**: svelte-drag for window management
- **Deployment**: Vercel (adapter-auto)

## 📦 Installation

```sh
# Install dependencies
npm install

# Start development server
npm run dev

# Open in browser
npm run dev -- --open
```

## 🏗️ Building

To create a production build:

```sh
npm run build
```

Preview the production build:

```sh
npm run preview
```

## 🚢 Deployment

This project is configured for seamless deployment to Vercel:

1. Push your code to GitHub
2. Import the repository in Vercel
3. Deploy automatically with zero configuration

The `@sveltejs/adapter-auto` will automatically detect Vercel and optimize the build.

## 📁 Project Structure

```
src/
├── lib/
│   ├── apps/           # Window applications (Projects, Contact, Resume)
│   ├── components/     # Reusable components (Window, Icon, Taskbar)
│   ├── content/        # Markdown content (About, Experience, Projects)
│   └── stores.ts       # Svelte stores for state management
├── routes/
│   └── +page.svelte    # Main desktop interface
└── app.html            # HTML template with SEO meta tags

static/
├── icons/              # Desktop and UI icons
├── tech-icons/         # Technology/framework logos
├── project-icons/      # Project category icons
└── Resume.pdf          # Resume file
```

## 🎨 Customization

- **Colors**: Update theme colors in Tailwind CSS (`src/app.css`)
- **Projects**: Edit markdown files in `src/lib/content/projects/`
- **Skills**: Modify `src/lib/components/SkillsDashboard.svelte`
- **Resume**: Replace `static/Resume.pdf` with your own

## 📝 License

MIT License - feel free to use this for your own portfolio!

