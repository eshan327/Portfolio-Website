import { windows, activeWindowId } from '$lib/stores';
import { get } from 'svelte/store';
import type { ComponentType } from 'svelte';

/**
 * Helper function to find an existing window by title
 */
function findWindowByTitle(title: string) {
	const currentWindows = get(windows);
	return currentWindows.find((w) => w.title === title);
}

/**
 * Toggle window visibility (minimize/restore/focus)
 */
function toggleWindow(windowId: string) {
	const currentWindows = get(windows);
	const window = currentWindows.find((w) => w.id === windowId);
	
	if (!window) return;
	
	// If window is already focused and not minimized, minimize it
	if (get(activeWindowId) === windowId && !window.isMinimized) {
		windows.update((w) =>
			w.map((win) => (win.id === windowId ? { ...win, isMinimized: true } : win))
		);
		activeWindowId.set(null);
	} else {
		// Otherwise, restore and focus
		windows.update((w) =>
			w.map((win) => (win.id === windowId ? { ...win, isMinimized: false } : win))
		);
		activeWindowId.set(windowId);
	}
}

/**
 * Helper function to open a window or toggle existing one
 */
export function openWindow(
	title: string,
	component: ComponentType,
	icon: string = 'FileText',
	props: Record<string, any> = {}
) {
	// Check if window already exists
	const existingWindow = findWindowByTitle(title);
	
	if (existingWindow) {
		// Toggle existing window
		toggleWindow(existingWindow.id);
		return;
	}
	
	// Create new window if it doesn't exist
	const id = crypto.randomUUID();
	const currentWindows = get(windows);
	const maxZIndex = currentWindows.length > 0 ? Math.max(...currentWindows.map((w) => w.zIndex)) : 0;

	// Calculate centered position with cascading offset
	const offset = currentWindows.length * 40; // 40px offset for each window
	const position = {
		x: 150 + offset,
		y: 100 + offset
	};

	const newWindow = {
		id,
		title,
		component,
		icon,
		props,
		zIndex: maxZIndex + 1,
		isMinimized: false,
		isMaximized: false,
		position
	};

	windows.update((w) => [...w, newWindow]);
	activeWindowId.set(id);
}

/**
 * Open the README.md file
 */
export async function openReadmeApp() {
	const component = await import('$lib/content/README.md');
	openWindow('README', component.default, 'FileText');
}

/**
 * Get preview content for a window type
 */
export function getWindowPreview(type: string): string {
	switch (type) {
		case 'README':
			return 'Welcome to my portfolio! Learn about this project and how to navigate.';
		case 'About':
			return 'Education, skills, and background information about me.';
		case 'Experience':
			return 'Professional work history and accomplishments.';
		case 'Projects':
			return 'Explore my featured projects and technical work.';
		case 'Contact':
			return 'Get in touch - email, LinkedIn, and GitHub links.';
		case 'Resume':
			return 'View and download my resume PDF.';
		default:
			return '';
	}
}

/**
 * Open the About.md file
 */
export async function openAboutApp() {
	const component = await import('$lib/content/About.md');
	openWindow('About', component.default, 'User');
}

/**
 * Open the Experience.md file
 */
export async function openExperienceApp() {
	const component = await import('$lib/content/Experience.md');
	openWindow('Experience', component.default, 'Briefcase');
}

/**
 * Open the Projects folder/app
 */
export async function openProjectsApp() {
	const component = await import('$lib/apps/Projects.svelte');
	openWindow('Projects', component.default, 'Folder');
}

/**
 * Open the Contact app
 */
export async function openContactApp() {
	const component = await import('$lib/apps/Contact.svelte');
	openWindow('Contact', component.default, 'Mail');
}

/**
 * Open the Resume viewer
 */
export async function openResumeApp() {
	const component = await import('$lib/apps/ResumeViewer.svelte');
	openWindow('Resume', component.default, 'FileText');
}
