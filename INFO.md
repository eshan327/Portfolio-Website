# PROJECT BRIEF: Eshan Khan's "Retro OS" Portfolio

## 1. Project Overview & Core Concept

### The User
The client is **Eshan Khan** , a dual-degree undergraduate student in Computer Science and Mathematics at the University of Maryland (Class of 2027) .

### The Core Concept & Anti-Slop Goal
The primary objective is to build a unique, memorable, and visually appealing developer portfolio. The core concept is a **fully interactive, nostalgic "Retro OS" interface** (e.g., a theme inspired by Windows 98 or classic Mac OS).

**This is a "show, don't tell" project.** The portfolio *itself* is the primary demonstration of frontend skill. It must feel authentic, custom-built, and personal.

**Our main design goal is to actively combat generic "AI slop."** This means:
* **NO** overused purple/black palettes.
* **NO** generic gradients.
* **NO** rounded-corner "card" components.
* **NO** flowery, "optimized" marketing language.
* **NO** meaningless, floaty animations.

Every design choice must be **intentional, functional, and nostalgic.**

---

## 2. Human-First Design Philosophy (CRITICAL)

This section defines the aesthetic and tone. The agent must adhere to these principles to create an authentic, "human" feel.

### A. The Aesthetic: "Functional Nostalgia"

We are building a UI, not just a webpage. The design must be crisp, pixel-perfect, and functional.

* **Color Palette:**
    * **Base:** `gray-200` (`#c0c0c0`)—the classic "Windows 98" gray for all window backgrounds, toolbars, and buttons.
    * **Shadows/Highlights:** `white` and `gray-500`/`gray-800`.
    * **Desktop:** A solid `teal-800` (or similar deep, retro color) for the desktop wallpaper.
    * **Active Window:** A deep `navy-blue` (e.g., `#000080`) for the *active* window's title bar.
    * **Inactive Window:** `gray-500` for *inactive* window title bars.
* **The "Bevel" Effect (The Core Style):**
    * This is the most important visual rule. **We will not use `box-shadow` or `border-radius`.**
    * All "raised" elements (like buttons) must have a 2px border:
        * `border-t-white border-l-white border-r-gray-800 border-b-gray-800`
    * All "inset" elements (like text fields) must have a 2px border:
        * `border-t-gray-800 border-l-gray-800 border-r-white border-b-white`
* **Typography:**
    * **UI Font:** Use a pixel-art or retro-style font. A Google Font like **`"Press Start 2P"`** or **`"Silkscreen"`** is ideal for headings.
    * **Body Font:** For content (like in the Markdown files), use a highly readable, classic system font like **`Tahoma`** or **`Verdana`**.
    * **NO** modern sans-serifs like Roboto, Inter, or Lato.
* **Icons:**
    * **UI Icons:** Use `lucide-svelte` as planned, but *only* for monochrome UI controls (e.s., the `X`, `Square`, `Minus` in window title bars).
    * **Desktop Icons:** These must be custom. They should look like 16-bit or 32-bit pixel art (e.g., a classic "My Computer" icon, a "Text File" icon, a "Folder" icon). The agent will need to find or create these as static assets.

### B. The Tone: "Authentic & Direct"

The content, especially in the `README` and `About.md` files, must sound like a real person.

* **Avoid "Flowery" Language:** No "passionate, results-driven" or "leveraging synergies."
* **Be Direct:** The tone should be first-person (`"I"`, `"my"`).
* **`README.md` Example:** "Welcome to my portfolio. This site is a retro OS I built from scratch with Svelte. Feel free to look around. You can double-click icons to open 'apps' and drag the windows just like a real desktop. The 'Projects' folder has my best work. - Eshan"
* **Content Focus:** The resume content provides the professional *facts*. The site's job is to present them clearly, within this engaging, personal "OS" wrapper.

---

## 3. Current Project State: The Handoff

The project has been initialized, and the technology stack is **fully installed and configured.** The AI agent is *not* starting from an empty folder.

**The following steps have been completed:**
1.  Initialized a new SvelteKit project (`npm create svelte@latest`) using the **"SvelteKit minimal"** template.
2.  Selected `eslint`, `prettier`, `tailwindcss`, and `mdsvex` during setup.
3.  Configured `tailwindcss` to include the **`@tailwindcss/typography`** plugin.
4.  Manually installed `svelte-drag`, `lucide-svelte`, `clsx`, and `tailwind-merge`.

**The `npm run dev` command works and shows a blank page.** The project is ready for development.

---

## 4. The Technology Stack & Its Role

This is the complete, final technology stack. The role of each tool is non-negotiable.

| Tool | Role & Purpose |
| :--- | :--- |
| **SvelteKit** | **The Foundation.** The meta-framework for the entire application. It will handle file-based routing and API logic. |
| **Tailwind CSS** | **The Styling Engine.** All styling will be done with Tailwind's utility classes to build the custom retro UI from scratch, especially the "bevel" effects. |
| **`svelte-drag`** | **The Core Interaction.** This is the Svelte 5-compatible library for UI behavior. We will use its `use:draggable` and `use:resizable` actions to build our `<Window>` components. |
| **`mdsvex`** | **The Content Engine.** This allows us to write portfolio content (About Me, Project Details) in Markdown files and render them *as Svelte components*. |
| **`@tailwindcss/typography`** | **Markdown Styling.** This Tailwind plugin will be used to automatically style the HTML output from `mdsvex`. We will apply the `prose` class, but it will need to be configured to use our chosen retro fonts. |
| **`lucide-svelte`** | **The Icon Library.** We will use this library *only* for simple, monochrome UI icons (e.g., window controls, file/folder icons in a list). |
| **`clsx` & `tailwind-merge`** | **Styling Utilities.** This pair is essential for managing our Tailwind classes. `clsx` will conditionally apply classes (e.g., `active` state), and `tailwind-merge` will resolve class conflicts. |

---

## 5. Desired Architecture & Design Philosophy

The application's architecture must be built around a central, global state.

### A. The Global State (The "Kernel")

Create `src/lib/stores.ts`.

1.  **`windows` Store:** A `writable` store holding an **array of `Window` objects**.
    * **Window Interface:**
        ```typescript
        import type { ComponentType } from 'svelte';
        
        interface Window {
          id: string; // A unique ID (e.g., crypto.randomUUID())
          title: string; // The title for the window bar
          zIndex: number; // For managing stacking
          component: ComponentType; // The Svelte component to render in the window
          props?: Record<string, any>; // Props to pass to the component
          isMinimized?: boolean;
          isMaximized?: boolean;
          icon: string; // A key from lucide-svelte, e.g., "FileText"
        }
        ```
2.  **`activeWindowId` Store:** A `writable` store holding the `id` (a string) of the currently focused window.

### B. Core Component Architecture

* **`+page.svelte` (The Desktop):**
    * The main desktop area. **Styling:** `h-screen w-screen bg-teal-800`.
    * Renders the `<Icon>` components.
    * `{#each}` through the `windows` store and renders a `<Window>` component for each.
    * Has a click handler to set `activeWindowId` to `null`.
* **`+layout.svelte` (The Global UI):**
    * Renders the `<Taskbar>` component.
    * Contains the `slot` for the page.
* **`Taskbar.svelte`:**
    * A `div` fixed to the bottom. **Styling:** Must have the "raised" `2px` bevel border.
    * Subscribes to `windows` store. Renders a "tab" for each open window.
    * **Tab Styling:** Must also be a "beveled" button. An "active" tab (for the `activeWindowId`) should look "pressed" (inset border).
* **`Icon.svelte`:**
    * **Props:** `label`, `imageSrc` (path to a 16-bit style pixel art icon).
    * A `div` with `flex-col` for the image and label.
    * `on:dblclick` handler will open the corresponding "app."
* **`Window.svelte` (The Most Complex Component):**
    * **Props:** The `Window` object.
    * **Interaction:** Uses `use:draggable` (with the title bar as handle) and `use:resizable`.
    * **Styling:**
        * Container: Must have the "raised" `2px` bevel border.
        * Title Bar: `flex` layout. Uses `clsx` to switch `bg-color` from `navy-blue` (active) to `gray-500` (inactive).
        * Window Buttons: Three small buttons (Minimize, Maximize, Close) using `lucide-svelte` icons, styled with the "beveled" button effect.
    * **Content Rendering:** The content area will use `<svelte:component this={...} />`.

---

## 6. The Step-by-Step Development Plan

This is a granular roadmap. **Adherence to the Design Philosophy (Section 2) at every step is critical.**

### Milestone 1: The Core "OS" Foundation

*Goal: Get the desktop, taskbar, and an empty (but movable) window on screen.*

1.  **Set Up Stores:** Create `src/lib/stores.ts` with the `windows` store and `activeWindowId` store as defined in Section 5.
2.  **Set Up Fonts:** Import the chosen retro fonts (`Press Start 2P`, `Tahoma`) in `app.html` or `+layout.svelte`. Configure `tailwind.config.js` to use these as `font-pixel` and `font-body`.
3.  **Create Desktop & Taskbar:**
    * Create `src/routes/+layout.svelte` and add the `<Taskbar />` component (empty for now).
    * Create `src/routes/+page.svelte` and add the main desktop `div` with the `bg-teal-800` class.
4.  **Create `<Taskbar />` Component:**
    * Create `src/lib/components/Taskbar.svelte`.
    * Style it as a `fixed bottom-0` bar. **Apply the "raised" 2px bevel border.**
    * (Logic for tabs will come in Milestone 2).
5.  **Create `<Window />` Component (Static Visuals):**
    * Create `src/lib/components/Window.svelte`.
    * **Do not add logic yet.** Focus 100% on the styling.
    * Build the window with `bg-gray-200`.
    * Create the `title-bar` (e.g., `bg-navy-blue`, `text-white`, `font-pixel`).
    * Create the 3 window control buttons (Min, Max, Close) using `lucide-svelte` icons. **Each button *must* have the "raised" 2px bevel border.**
    * Create the `content-area` with an "inset" 2px border.
6.  **Add Interactivity to `<Window />`:**
    * Import and use `use:draggable` and `use:resizable` from `svelte-drag`.
    * Make the `title-bar` the `handle` for dragging.

### Milestone 2: Spawning & Managing Windows

*Goal: Connect the components so that double-clicking an icon opens a window and manages its state.*

1.  **Create Static Assets:** Add `static/icons/readme.png`, `static/icons/folder.png`, `static/icons/contact.png` (pixel-art style).
2.  **Create `<Icon />` Component:**
    * Create `src/lib/components/Icon.svelte`.
    * **Props:** `label`, `imageSrc`.
    * Renders `<img />` and `<span />` in a `flex-col` layout.
3.  **Create "App" Helpers:**
    * Create `src/lib/apps.ts`. This file will contain functions for opening windows (e.g., `openReadmeApp()`, `openProjectsApp()`).
    * These functions will:
        1.  Import the correct app component (e.g., `() => import('$lib/content/README.md')`).
        2.  Create a `newWindow` object (with ID, title, `component`, etc.).
        3.  `push` it to the `windows` store.
        4.  Set `activeWindowId` to the new ID.
4.  **Implement Spawning:**
    * In `+page.svelte`, add an `<Icon label="README.md" imageSrc="/icons/readme.png" />`.
    * Add an `on:dblclick` handler that calls the `openReadmeApp` function.
    * `{#each}` the `$windows` store and render a `<Window />` component for each, passing the window object as a prop.
5.  **Implement State Management:**
    * **Active State:** Add an `on:mousedown` to `<Window />` that sets `activeWindowId` to its ID. Use `clsx` to toggle the title bar color.
    * **Close Button:** Wire up the "Close" button in `<Window />` to remove itself from the `windows` store.
    * **Taskbar Tabs:** In `<Taskbar />`, `{#each}` the `$windows` store and render a tab for each. Each tab, on click, should set `activeWindowId` and toggle `isMinimized`.

### Milestone 3: Loading Content ("Apps")

*Goal: Load Eshan's actual resume content into the windows.*

1.  **Create Content Files (Markdown):**
    * `src/lib/content/README.md`: Write the personal welcome message (see Section 2.B).
    * `srcG/lib/content/About.md`: Populate with Eshan's Education and Skills . Use simple Markdown.
    * `src/lib/content/Experience.md`: Populate with details from Apex Fund and Technuf .
2.  **Add Content Rendering to `<Window />`:**
    * In the `content-area` of `<Window />`, use `<svelte:component this={...} />`.
    * Wrap this in an `{#await}` block (for dynamic imports).
    * Wrap the resolved component in `<div class="prose prose-sm font-body">...</div>`.
3.  **Create Desktop Icons:**
    * In `+page.svelte`, add icons for "About.md", "Experience.md", and "Projects".
    * Wire their `on:dblclick` to call their respective "open" functions from `apps.ts`.

### Milestone 4: Building the "Projects" App

*Goal: Create a "file explorer" for Eshan's projects, which open their own detail windows.*

1.  **Create Project Content Files (Markdown):**
    * `src/lib/content/projects/AuditoryClassifier.md`: Populate with info from .
    * `src/lib/content/projects/Palette.md`: Populate with info from .
    * `src/lib/content/projects/PoissonDisk.md`: Populate with info from .
    * `src/lib/content/projects/GroceryZone.md`: Populate with info from .
2.  **Create the "Projects" App Component:**
    * Create `src/lib/apps/Projects.svelte`.
    * **Style:** This must look like a "File Explorer" list view, *not* modern cards.
    * **Structure:** A list of items, each with a small `lucide-svelte` icon (`FileText`) and the project title.
    * **Function:** Each item is a button. On click, it calls the `openWindow` helper to open the corresponding project's `.md` file in a *new* window.
3.  **Add "Projects" Icon to Desktop:**
    * In `+page.svelte`, add an icon for "Projects" (use a `Folder` icon image).
    * Wire its `dblclick` to open the `Projects.svelte` component.

### Milestone 5: Polish & Final "Apps"

*Goal: Implement remaining functionality and add final contact/link apps.*

1.  **Implement Minimize/Maximize:**
    * **Minimize:** Button sets `isMinimized = true`. `<Window />` adds `hidden` if true. Taskbar tab toggles `isMinimized`.
    * **Maximize:** Button toggles `isMaximized`. `<Window />` uses `clsx` to add `w-full h-full top-0 left-0` (or similar) to override its position/size.
2.  **Create "Contact" App:**
    * Create `src/lib/apps/Contact.svelte`.
    * This should be styled like a simple "Notepad" form.
    * Add Eshan's contact info as plain text.
    * Add an icon for this to the desktop.
3.  **Add "Links" Icons:**
    * Place `Resume.pdf` in the `static/` folder.
    * Create an icon on the desktop for "Resume.pdf". `on:dblclick`, it should open `/Resume.pdf` in a new browser tab.
    * Create icons for "LinkedIn" and "GitHub" that open his profiles in new tabs.
4.  **Responsive Fallback (Critical):**
    * This OS theme is for desktop. On mobile, it will be unusable.
    * Use a media query check. If the screen is `< 768px`, **do not render the desktop**.
    * Instead, render a `<MobileFallback />` component: a simple, single-column HTML page that lists all the content (About, Experience, Projects) in a clean, readable, non-interactive format. This is crucial for usability.