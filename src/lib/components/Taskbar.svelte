<script lang="ts">
	import { windows, activeWindowId } from '$lib/stores';
	import { onMount } from 'svelte';
	import { 
		openReadmeApp, 
		openAboutApp, 
		openExperienceApp, 
		openProjectsApp, 
		openContactApp,
		getWindowPreview
	} from '$lib/apps';

	let currentTime = $state('');
	let currentDate = $state('');
	let showStartMenu = $state(false);
	let hoveredPin = $state<string | null>(null);
	let showClock = $state(false);
	let hours = $state(0);
	let minutes = $state(0);
	let seconds = $state(0);
	let startMenuElement: HTMLElement;

	function toggleStartMenu(e: MouseEvent) {
		e.stopPropagation();
		showStartMenu = !showStartMenu;
	}

	function handleClickOutside(e: MouseEvent) {
		if (showStartMenu && startMenuElement && !startMenuElement.contains(e.target as Node)) {
			showStartMenu = false;
		}
	}

	$effect(() => {
		if (showStartMenu) {
			document.addEventListener('mousedown', handleClickOutside);
		} else {
			document.removeEventListener('mousedown', handleClickOutside);
		}
		
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	});

	function openAndClose(openFunc: () => void) {
		showStartMenu = false;
		openFunc();
	}

	function openLinkAndClose(url: string) {
		showStartMenu = false;
		window.open(url, '_blank');
	}

	onMount(() => {
		const updateTime = () => {
			const now = new Date();
			hours = now.getHours() % 12;
			minutes = now.getMinutes();
			seconds = now.getSeconds();
			currentTime = now.toLocaleTimeString('en-US', { 
				hour: 'numeric', 
				minute: '2-digit',
				hour12: true 
			});
			currentDate = now.toLocaleDateString('en-US', {
				weekday: 'short',
				month: 'short',
				day: 'numeric'
			});
		};
		updateTime();
		const interval = setInterval(updateTime, 1000);
		return () => clearInterval(interval);
	});

	function toggleWindow(id: string, isMinimized: boolean | undefined) {
		if ($activeWindowId === id && !isMinimized) {
			// If clicking active window, minimize it
			windows.update((w) =>
				w.map((win) => (win.id === id ? { ...win, isMinimized: true } : win))
			);
			activeWindowId.set(null);
		} else {
			// Otherwise, restore and focus
			windows.update((w) =>
				w.map((win) => (win.id === id ? { ...win, isMinimized: false } : win))
			);
			activeWindowId.set(id);
		}
	}
</script>

<div
	class="fixed bottom-0 left-0 right-0 h-16 bg-gradient-to-b from-gray-900 to-black border-t border-teal-500 border-opacity-30 flex items-center gap-3 px-4"
	style="box-shadow: 0 -4px 30px rgba(0,0,0,0.5), inset 0 1px 0 rgba(45, 212, 191, 0.1); backdrop-filter: blur(10px);"
>
	<!-- Start Button -->
	<div class="relative" bind:this={startMenuElement}>
		<button
			class="px-5 py-2 font-pixel text-xs bg-gradient-to-b from-teal-600 to-teal-700 border border-teal-400 border-opacity-50 hover:from-teal-500 hover:to-teal-600 flex items-center gap-2 transition-all rounded shadow-lg"
			style="box-shadow: 0 0 20px rgba(45, 212, 191, {showStartMenu ? '0.5' : '0.3'}), inset 0 1px 0 rgba(255,255,255,0.1);"
			onclick={toggleStartMenu}
		>
			<span class="text-base leading-none">⊞</span>
			<span class="text-white">Start</span>
		</button>

		{#if showStartMenu}
			<div class="absolute bottom-full left-0 mb-2 w-72 bg-gray-900 border border-teal-500 border-opacity-40 rounded-lg overflow-hidden" style="filter: drop-shadow(0 10px 30px rgba(0,0,0,0.8)); box-shadow: 0 0 40px rgba(45, 212, 191, 0.2), inset 0 0 60px rgba(0,0,0,0.5);">
				<div class="bg-gradient-to-r from-teal-600 via-teal-500 to-cyan-500 text-white font-bold px-5 py-4 flex items-center gap-3">
					<span class="text-3xl">⊞</span>
					<div>
						<div class="text-lg font-pixel text-xs">Eshan Khan</div>
						<div class="text-xs opacity-90 font-body">Portfolio System</div>
					</div>
				</div>
				<div class="p-3">
					<div class="text-xs font-bold text-teal-400 px-3 py-2 font-pixel">Quick Access</div>
					<button 
						class="w-full text-left px-4 py-3 hover:bg-teal-600 hover:bg-opacity-20 text-gray-300 hover:text-white font-body text-sm flex items-center gap-3 rounded transition-all"
						onclick={() => openAndClose(openReadmeApp)}
					>
						<span class="text-xl">📄</span> Welcome / README
					</button>
					<button 
						class="w-full text-left px-4 py-3 hover:bg-teal-600 hover:bg-opacity-20 text-gray-300 hover:text-white font-body text-sm flex items-center gap-3 rounded transition-all"
						onclick={() => openAndClose(openAboutApp)}
					>
						<span class="text-xl">👤</span> About Me
					</button>
					<button 
						class="w-full text-left px-4 py-3 hover:bg-teal-600 hover:bg-opacity-20 text-gray-300 hover:text-white font-body text-sm flex items-center gap-3 rounded transition-all"
						onclick={() => openAndClose(openProjectsApp)}
					>
						<span class="text-xl">📁</span> Projects
					</button>
					<button 
						class="w-full text-left px-4 py-3 hover:bg-teal-600 hover:bg-opacity-20 text-gray-300 hover:text-white font-body text-sm flex items-center gap-3 rounded transition-all"
						onclick={() => openAndClose(openContactApp)}
					>
						<span class="text-xl">✉️</span> Contact
					</button>
					
					<div class="h-px bg-teal-500 bg-opacity-20 my-3 mx-3"></div>
					
					<div class="text-xs font-bold text-teal-400 px-3 py-2 font-pixel">External Links</div>
					<button 
						class="w-full text-left px-4 py-3 hover:bg-teal-600 hover:bg-opacity-20 text-gray-300 hover:text-white font-body text-sm flex items-center gap-3 rounded transition-all"
						onclick={() => openLinkAndClose('https://github.com/eshan327')}
					>
						<span class="text-xl">🖥️</span> GitHub Profile
					</button>
					<button 
						class="w-full text-left px-4 py-3 hover:bg-teal-600 hover:bg-opacity-20 text-gray-300 hover:text-white font-body text-sm flex items-center gap-3 rounded transition-all"
						onclick={() => openLinkAndClose('https://linkedin.com/in/eshan-khan')}
					>
						<span class="text-xl">🔗</span> LinkedIn Profile
					</button>
				</div>
			</div>
		{/if}
	</div>

	<!-- Pinned Apps -->
	<div class="flex items-center gap-2">
		<div class="relative">
			<button
				class="p-2 hover:bg-teal-500 hover:bg-opacity-20 rounded transition-all group"
				onclick={openAboutApp}
				onmouseenter={() => hoveredPin = 'About'}
				onmouseleave={() => hoveredPin = null}
				title="About Me"
			>
				<span class="text-2xl group-hover:scale-110 transition-transform inline-block">👤</span>
			</button>
			{#if hoveredPin === 'About'}
				<div 
					class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-gray-900 border border-teal-500 border-opacity-50 rounded-lg p-3 text-xs text-gray-300 font-body z-50 pointer-events-none"
					style="box-shadow: 0 10px 30px rgba(0,0,0,0.8), 0 0 20px rgba(45, 212, 191, 0.2);"
				>
					<div class="font-bold text-teal-400 mb-1">About Me</div>
					<div>{getWindowPreview('About')}</div>
				</div>
			{/if}
		</div>
		<div class="relative">
			<button
				class="p-2 hover:bg-teal-500 hover:bg-opacity-20 rounded transition-all group"
				onclick={openProjectsApp}
				onmouseenter={() => hoveredPin = 'Projects'}
				onmouseleave={() => hoveredPin = null}
				title="Projects"
			>
				<span class="text-2xl group-hover:scale-110 transition-transform inline-block">📁</span>
			</button>
			{#if hoveredPin === 'Projects'}
				<div 
					class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-gray-900 border border-teal-500 border-opacity-50 rounded-lg p-3 text-xs text-gray-300 font-body z-50 pointer-events-none"
					style="box-shadow: 0 10px 30px rgba(0,0,0,0.8), 0 0 20px rgba(45, 212, 191, 0.2);"
				>
					<div class="font-bold text-teal-400 mb-1">Projects</div>
					<div>{getWindowPreview('Projects')}</div>
				</div>
			{/if}
		</div>
		<div class="relative">
			<button
				class="p-2 hover:bg-teal-500 hover:bg-opacity-20 rounded transition-all group"
				onclick={openContactApp}
				onmouseenter={() => hoveredPin = 'Contact'}
				onmouseleave={() => hoveredPin = null}
				title="Contact"
			>
				<span class="text-2xl group-hover:scale-110 transition-transform inline-block">✉️</span>
			</button>
			{#if hoveredPin === 'Contact'}
				<div 
					class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-gray-900 border border-teal-500 border-opacity-50 rounded-lg p-3 text-xs text-gray-300 font-body z-50 pointer-events-none"
					style="box-shadow: 0 10px 30px rgba(0,0,0,0.8), 0 0 20px rgba(45, 212, 191, 0.2);"
				>
					<div class="font-bold text-teal-400 mb-1">Contact</div>
					<div>{getWindowPreview('Contact')}</div>
				</div>
			{/if}
		</div>
	</div>

	<div class="h-8 w-px bg-teal-500 bg-opacity-20 mx-1"></div>

	<!-- Window Tabs -->
	<div class="flex-1 flex items-center gap-2 overflow-x-auto">
		{#each $windows as window (window.id)}
			<button
				class="px-4 py-2 text-sm font-body truncate max-w-[200px] min-w-[120px] rounded transition-all {$activeWindowId ===
				window.id && !window.isMinimized
					? 'bg-teal-600 bg-opacity-30 text-white border border-teal-400 border-opacity-50'
					: 'bg-gray-800 bg-opacity-50 text-gray-400 border border-gray-700 hover:bg-opacity-70 hover:text-gray-300'}"
				style="box-shadow: {$activeWindowId === window.id && !window.isMinimized ? '0 0 15px rgba(45, 212, 191, 0.3)' : 'none'};"
				onclick={() => toggleWindow(window.id, window.isMinimized)}
			>
				{window.title}
			</button>
		{/each}
	</div>

	<!-- Clock -->
	<div class="h-8 w-px bg-teal-500 bg-opacity-20 mx-1"></div>
	<div class="relative">
		<div
			class="px-4 py-2 rounded bg-gray-800 bg-opacity-50 border border-teal-500 border-opacity-30 min-w-[140px] cursor-pointer"
			style="box-shadow: inset 0 0 20px rgba(0,0,0,0.3);"
			role="button"
			aria-label="System time"
			tabindex="0"
			onmouseenter={() => showClock = true}
			onmouseleave={() => showClock = false}
		>
			<div class="text-sm font-body text-teal-300 text-center font-semibold">
				{currentTime}
			</div>
			<div class="text-xs font-body text-gray-500 text-center">
				{currentDate}
			</div>
		</div>
		
		<!-- Analog Clock Popup -->
		{#if showClock}
			<div 
				class="absolute bottom-full right-0 mb-2 bg-gray-900 border border-teal-500 border-opacity-50 rounded-lg p-4 pointer-events-none"
				style="box-shadow: 0 10px 30px rgba(0,0,0,0.8), 0 0 30px rgba(45, 212, 191, 0.3);"
			>
				<svg width="120" height="120" viewBox="0 0 120 120" class="filter drop-shadow-lg">
					<!-- Clock face -->
					<circle cx="60" cy="60" r="55" fill="rgba(17, 24, 39, 0.9)" stroke="rgb(45, 212, 191)" stroke-width="2"/>
					
					<!-- Hour markers -->
					{#each Array(12) as _, i}
						<line
							x1="60"
							y1="10"
							x2="60"
							y2="15"
							stroke="rgb(45, 212, 191)"
							stroke-width="{i % 3 === 0 ? 2 : 1}"
							transform="rotate({i * 30} 60 60)"
						/>
					{/each}
					
					<!-- Hour hand -->
					<line
						x1="60"
						y1="60"
						x2="60"
						y2="35"
						stroke="rgb(45, 212, 191)"
						stroke-width="3"
						stroke-linecap="round"
						transform="rotate({(hours + minutes / 60) * 30} 60 60)"
					/>
					
					<!-- Minute hand -->
					<line
						x1="60"
						y1="60"
						x2="60"
						y2="20"
						stroke="rgb(94, 234, 212)"
						stroke-width="2"
						stroke-linecap="round"
						transform="rotate({minutes * 6} 60 60)"
					/>
					
					<!-- Second hand -->
					<line
						x1="60"
						y1="60"
						x2="60"
						y2="18"
						stroke="rgb(6, 182, 212)"
						stroke-width="1"
						stroke-linecap="round"
						transform="rotate({seconds * 6} 60 60)"
					/>
					
					<!-- Center dot -->
					<circle cx="60" cy="60" r="3" fill="rgb(45, 212, 191)"/>
				</svg>
			</div>
		{/if}
	</div>
</div>