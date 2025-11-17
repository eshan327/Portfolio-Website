<script lang="ts">
	import { X, Minus, Square } from 'lucide-svelte';
	import { draggable } from 'svelte-drag';
	import { windows, activeWindowId } from '$lib/stores';
	import type { Window } from '$lib/stores';

	let { window: windowData }: { window: Window } = $props();

	let titleBarElement = $state<HTMLElement>();
	let windowElement = $state<HTMLElement>();
	let isResizing = $state(false);
	let windowSize = $state({ width: 900, height: 600 });

	type ResizeDirection = 'n' | 's' | 'e' | 'w' | 'ne' | 'nw' | 'se' | 'sw';

	function startResize(e: MouseEvent, direction: ResizeDirection) {
		if (windowData.isMaximized) return;
		e.preventDefault();
		e.stopPropagation();
		isResizing = true;
		const startX = e.clientX;
		const startY = e.clientY;
		const startWidth = windowSize.width;
		const startHeight = windowSize.height;
		const startLeft = windowData.position?.x ?? 80;
		const startTop = windowData.position?.y ?? 80;

		function onMouseMove(e: MouseEvent) {
			let newWidth = startWidth;
			let newHeight = startHeight;
			let newX = startLeft;
			let newY = startTop;

			const deltaX = e.clientX - startX;
			const deltaY = e.clientY - startY;

			// Handle horizontal resizing
			if (direction.includes('e')) {
				newWidth = Math.max(300, startWidth + deltaX);
			} else if (direction.includes('w')) {
				newWidth = Math.max(300, startWidth - deltaX);
				if (newWidth > 300) newX = startLeft + deltaX;
			}

			// Handle vertical resizing
			if (direction.includes('s')) {
				newHeight = Math.max(200, startHeight + deltaY);
			} else if (direction.includes('n')) {
				newHeight = Math.max(200, startHeight - deltaY);
				if (newHeight > 200) newY = startTop + deltaY;
			}

			windowSize = { width: newWidth, height: newHeight };
			
			// Update position if resizing from top or left
			if (direction.includes('n') || direction.includes('w')) {
				windows.update((w) =>
					w.map((win) =>
						win.id === windowData.id ? { ...win, position: { x: newX, y: newY } } : win
					)
				);
			}
		}

		function onMouseUp() {
			isResizing = false;
			document.removeEventListener('mousemove', onMouseMove);
			document.removeEventListener('mouseup', onMouseUp);
		}

		document.addEventListener('mousemove', onMouseMove);
		document.addEventListener('mouseup', onMouseUp);
	}

	// Check if this window is active
	const isActive = $derived($activeWindowId === windowData.id);

	// Handle close button
	function closeWindow() {
		windows.update((w) => w.filter((win) => win.id !== windowData.id));
		if ($activeWindowId === windowData.id) {
			activeWindowId.set(null);
		}
	}

	// Handle window focus
	function focusWindow() {
		activeWindowId.set(windowData.id);
	}

	// Handle minimize button
	function minimizeWindow() {
		windows.update((w) =>
			w.map((win) => (win.id === windowData.id ? { ...win, isMinimized: true } : win))
		);
	}

	// Handle maximize button
	function toggleMaximize() {
		windows.update((w) =>
			w.map((win) =>
				win.id === windowData.id ? { ...win, isMaximized: !win.isMaximized } : win
			)
		);
	}
</script>

<div
	bind:this={windowElement}
	use:draggable={{ handle: titleBarElement, disabled: windowData.isMaximized }}
	class="absolute flex flex-col bg-gray-900 border border-teal-500 border-opacity-40 rounded-lg overflow-hidden {windowData.isMinimized
		? 'hidden'
		: ''} {windowData.isMaximized ? 'w-full h-full !left-0 !top-0' : ''}"
	style="z-index: {windowData.zIndex}; {windowData.isMaximized
		? ''
		: `left: ${windowData.position?.x ?? 80}px; top: ${windowData.position?.y ?? 80}px; width: ${windowSize.width}px;`} filter: drop-shadow(0 10px 30px rgba(0,0,0,0.8)); box-shadow: 0 0 40px rgba(45, 212, 191, 0.2), inset 0 0 60px rgba(0,0,0,0.3);"
	onmousedown={focusWindow}
	role="dialog"
	aria-label={windowData.title}
	tabindex="-1"
>
	<!-- Title Bar -->
	<div
		bind:this={titleBarElement}
		class="flex items-center justify-between px-4 py-3 text-white font-body text-sm font-bold cursor-move {isActive
			? 'bg-gradient-to-r from-teal-600 via-teal-500 to-cyan-500'
			: 'bg-gray-800'}"
		style="{isActive ? 'box-shadow: inset 0 1px 0 rgba(255,255,255,0.1), 0 0 20px rgba(45, 212, 191, 0.3);' : 'box-shadow: inset 0 1px 0 rgba(255,255,255,0.05);'}"
	>
		<span class="truncate">{windowData.title}</span>
		<div class="flex gap-1">
			<!-- Minimize Button -->
			<button
				class="flex h-7 w-7 items-center justify-center bg-gray-700 bg-opacity-50 rounded hover:bg-gray-600 active:bg-gray-800 transition-all"
				style="box-shadow: inset 0 1px 0 rgba(255,255,255,0.1);"
				type="button"
				onclick={minimizeWindow}
			>
				<Minus size={14} class="text-gray-300" />
			</button>
			<!-- Maximize Button -->
			<button
				class="flex h-7 w-7 items-center justify-center bg-gray-700 bg-opacity-50 rounded hover:bg-gray-600 active:bg-gray-800 transition-all"
				style="box-shadow: inset 0 1px 0 rgba(255,255,255,0.1);"
				type="button"
				onclick={toggleMaximize}
			>
				<Square size={11} class="text-gray-300" />
			</button>
			<!-- Close Button -->
			<button
				class="flex h-7 w-7 items-center justify-center bg-gray-700 bg-opacity-50 rounded hover:bg-red-600 hover:bg-opacity-80 active:bg-red-700 transition-all"
				style="box-shadow: inset 0 1px 0 rgba(255,255,255,0.1);"
				type="button"
				onclick={closeWindow}
			>
				<X size={14} class="text-gray-300" />
			</button>
		</div>
	</div>

	<!-- Content Area -->
	<div
		class="overflow-y-auto overflow-x-hidden bg-gray-50 p-6 {windowData.isMaximized
			? 'flex-1'
			: ''}"
		style="{windowData.isMaximized ? '' : `height: ${windowSize.height}px;`}"
	>
		<div class="prose prose-sm font-body max-w-none">
			{#if windowData.component}
				{@render windowData.component(windowData.props)}
			{/if}
		</div>
	</div>

	<!-- Resize Handle -->
	{#if !windowData.isMaximized}
		<!-- Corner handles -->
		<div
			class="absolute bottom-0 right-0 w-4 h-4 cursor-nwse-resize"
			onmousedown={(e) => startResize(e, 'se')}
			style="background: linear-gradient(135deg, transparent 0%, transparent 50%, rgba(45, 212, 191, 0.3) 50%, rgba(45, 212, 191, 0.3) 100%);"
			role="presentation"
			aria-hidden="true"
		></div>
		<div
			class="absolute top-0 right-0 w-4 h-4 cursor-nesw-resize"
			onmousedown={(e) => startResize(e, 'ne')}
			role="presentation"
			aria-hidden="true"
		></div>
		<div
			class="absolute bottom-0 left-0 w-4 h-4 cursor-nesw-resize"
			onmousedown={(e) => startResize(e, 'sw')}
			role="presentation"
			aria-hidden="true"
		></div>
		<div
			class="absolute top-0 left-0 w-4 h-4 cursor-nwse-resize"
			onmousedown={(e) => startResize(e, 'nw')}
			role="presentation"
			aria-hidden="true"
		></div>
		
		<!-- Edge handles -->
		<div
			class="absolute top-0 left-4 right-4 h-1 cursor-ns-resize"
			onmousedown={(e) => startResize(e, 'n')}
			role="presentation"
			aria-hidden="true"
		></div>
		<div
			class="absolute bottom-0 left-4 right-4 h-1 cursor-ns-resize"
			onmousedown={(e) => startResize(e, 's')}
			role="presentation"
			aria-hidden="true"
		></div>
		<div
			class="absolute left-0 top-4 bottom-4 w-1 cursor-ew-resize"
			onmousedown={(e) => startResize(e, 'w')}
			role="presentation"
			aria-hidden="true"
		></div>
		<div
			class="absolute right-0 top-4 bottom-4 w-1 cursor-ew-resize"
			onmousedown={(e) => startResize(e, 'e')}
			role="presentation"
			aria-hidden="true"
		></div>
	{/if}
</div>
