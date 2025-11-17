<script lang="ts">
	import { onMount } from 'svelte';

	let { onComplete }: { onComplete: () => void } = $props();
	let bootStage = $state(0);
	let loadingDots = $state('');
	let timeouts: number[] = [];
	let dotsInterval: number;

	function skipIntro() {
		timeouts.forEach(clearTimeout);
		clearInterval(dotsInterval);
		onComplete();
	}

	onMount(() => {
		const stages = [
			{ delay: 500, stage: 1 },
			{ delay: 1000, stage: 2 },
			{ delay: 1500, stage: 3 },
			{ delay: 2000, stage: 4 }
		];

		stages.forEach(({ delay, stage }) => {
			timeouts.push(window.setTimeout(() => (bootStage = stage), delay));
		});

		dotsInterval = window.setInterval(() => {
			loadingDots = loadingDots.length >= 3 ? '' : loadingDots + '.';
		}, 300);

		timeouts.push(window.setTimeout(() => {
			clearInterval(dotsInterval);
			onComplete();
		}, 2500));

		return () => {
			timeouts.forEach(clearTimeout);
			clearInterval(dotsInterval);
		};
	});
</script>

<div class="fixed inset-0 bg-black flex items-center justify-center z-50">
	<div class="text-center font-body text-white space-y-6 max-w-2xl px-8">
		<!-- Logo/Title -->
		<div class="font-pixel text-2xl mb-8 animate-pulse">
			<span class="text-teal-400">ESHAN</span><span class="text-white">OS</span>
		</div>

		<!-- Boot Messages -->
		<div class="text-left text-sm space-y-2 font-mono">
			{#if bootStage >= 1}
				<div class="opacity-80">Loading portfolio system...</div>
			{/if}
			{#if bootStage >= 2}
				<div class="opacity-80">Initializing retro interface...</div>
			{/if}
			{#if bootStage >= 3}
				<div class="opacity-80">Loading projects and experience...</div>
			{/if}
			{#if bootStage >= 4}
				<div class="text-teal-400">System ready{loadingDots}</div>
			{/if}
		</div>

		<!-- Progress Bar -->
		<div class="w-full bg-gray-800 h-2 border border-gray-600 mt-8">
			<div 
				class="bg-teal-400 h-full transition-all duration-500"
				style="width: {bootStage * 25}%"
			></div>
		</div>

		<div class="text-xs text-gray-500 mt-4">Portfolio v1.0 • Built with SvelteKit</div>
		
		<!-- Skip Button -->
		<button
			class="mt-6 px-6 py-2 bg-teal-600 hover:bg-teal-500 text-white font-body text-sm rounded transition-all"
			style="box-shadow: 0 0 20px rgba(45, 212, 191, 0.3);"
			onclick={skipIntro}
		>
			Skip Intro →
		</button>
	</div>
</div>
