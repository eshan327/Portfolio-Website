<script lang="ts">
	import { draggable } from 'svelte-drag';

	let { label, imageSrc, ondblclick, onclick, preview, size = 'normal' }: { label: string; imageSrc: string; ondblclick?: () => void; onclick?: () => void; preview?: string; size?: 'normal' | 'large' } = $props();

	let showPreview = $state(false);
	let previewTimeout: number;

	function handleDoubleClick(e: MouseEvent) {
		e.preventDefault();
		e.stopPropagation();
		if (ondblclick) ondblclick();
	}

	function handleClick(e: MouseEvent) {
		e.preventDefault();
		e.stopPropagation();
		if (onclick) onclick();
	}

	function handleMouseEnter() {
		if (preview) {
			previewTimeout = window.setTimeout(() => {
				showPreview = true;
			}, 800);
		}
	}

	function handleMouseLeave() {
		if (previewTimeout) {
			window.clearTimeout(previewTimeout);
		}
		showPreview = false;
	}

	const iconSize = size === 'large' ? 'h-16 w-16' : 'h-10 w-10';
	const containerWidth = size === 'large' ? 'w-28' : 'w-20';
	const textSize = size === 'large' ? 'text-sm' : 'text-xs';
</script>

<div class="relative">
	<div
		use:draggable
		class="flex flex-col items-center gap-2 p-3 hover:bg-teal-500 hover:bg-opacity-30 {containerWidth} cursor-move select-none transition-all hover:scale-105"
		ondblclick={handleDoubleClick}
		onclick={handleClick}
		onkeydown={(e) => (e.key === 'Enter' || e.key === ' ') && (onclick ? onclick() : ondblclick && ondblclick())}
		onmouseenter={handleMouseEnter}
		onmouseleave={handleMouseLeave}
		role="button"
		tabindex="0"
		aria-label={label}
		style="transition: all 0.2s ease;"
	>
		<img src={imageSrc} alt={label} class="{iconSize} pointer-events-none" draggable="false" />
		<span class="{textSize} text-white font-body text-center leading-tight break-words pointer-events-none" style="text-shadow: 1px 1px 3px rgba(0,0,0,0.9);">{label}</span>
	</div>

	{#if showPreview && preview}
		<div 
			class="absolute left-full top-0 ml-2 w-48 bg-gray-900 border border-teal-500 border-opacity-50 rounded-lg p-3 text-xs text-gray-300 font-body z-50 pointer-events-none"
			style="box-shadow: 0 10px 30px rgba(0,0,0,0.8), 0 0 20px rgba(45, 212, 191, 0.2);"
		>
			<div class="font-bold text-teal-400 mb-1">{label}</div>
			<div>{preview}</div>
			<div class="text-xs text-gray-500 mt-2">Click to open</div>
		</div>
	{/if}
</div>
