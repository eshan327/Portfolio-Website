import { writable } from 'svelte/store';
import type { ComponentType } from 'svelte';

export interface Window {
	id: string; // A unique ID (e.g., crypto.randomUUID())
	title: string; // The title for the window bar
	zIndex: number; // For managing stacking
	component: ComponentType; // The Svelte component to render in the window
	props?: Record<string, any>; // Props to pass to the component
	isMinimized?: boolean;
	isMaximized?: boolean;
	icon: string; // A key from lucide-svelte, e.g., "FileText"
	position?: { x: number; y: number }; // Initial position
}

// Interface for serializable window state (for localStorage)
interface SerializableWindowState {
	id: string;
	title: string;
	isMinimized?: boolean;
	isMaximized?: boolean;
	position?: { x: number; y: number };
}

// Load window state from localStorage
function loadWindowState(): SerializableWindowState[] {
	if (typeof localStorage === 'undefined') return [];
	try {
		const saved = localStorage.getItem('windowState');
		return saved ? JSON.parse(saved) : [];
	} catch {
		return [];
	}
}

// Save window state to localStorage
function saveWindowState(windows: Window[]) {
	if (typeof localStorage === 'undefined') return;
	try {
		const state: SerializableWindowState[] = windows.map(w => ({
			id: w.id,
			title: w.title,
			isMinimized: w.isMinimized,
			isMaximized: w.isMaximized,
			position: w.position
		}));
		localStorage.setItem('windowState', JSON.stringify(state));
	} catch (err) {
		console.warn('Failed to save window state:', err);
	}
}

// Create windows store with persistence
function createWindowsStore() {
	const { subscribe, set, update } = writable<Window[]>([]);

	return {
		subscribe,
		set: (value: Window[]) => {
			set(value);
			saveWindowState(value);
		},
		update: (fn: (windows: Window[]) => Window[]) => {
			update((windows) => {
				const newWindows = fn(windows);
				saveWindowState(newWindows);
				return newWindows;
			});
		},
		loadState: loadWindowState
	};
}

// Global store for all open windows
export const windows = createWindowsStore();

// Global store for the currently active (focused) window ID
export const activeWindowId = writable<string | null>(null);
