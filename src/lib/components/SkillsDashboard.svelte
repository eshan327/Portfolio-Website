<script lang="ts">
	import { onMount } from 'svelte';
	
	let isCollapsed = $state(false);
	let scrollContainer: HTMLElement;
	let autoScrollInterval: number;
	let hasUserInteracted = $state(false);
	let scrollPhase: 'down' | 'up' | 'done' = $state('down');
	
	const skills = {
		languages: [
			{ name: 'Python', icon: '/tech-icons/python.svg' },
			{ name: 'Java', icon: '/tech-icons/java.svg' },
			{ name: 'JavaScript', icon: '/tech-icons/javascript.svg' },
			{ name: 'TypeScript', icon: '/tech-icons/typescript.svg' },
			{ name: 'C', icon: '/tech-icons/c.svg' },
			{ name: 'C++', icon: '/tech-icons/cpp.svg' },
			{ name: 'Rust', icon: '/tech-icons/rust.svg' },
			{ name: 'OCaml', icon: '/tech-icons/ocaml.svg' },
			{ name: 'SQL', icon: '/tech-icons/sql.svg' },
			{ name: 'R', icon: '/tech-icons/r.svg' },
			{ name: 'Dart', icon: '/tech-icons/dart.svg' },
			{ name: 'MATLAB', icon: '/tech-icons/matlab.svg' },
			{ name: 'Assembly', icon: '/tech-icons/assembly.svg' }
		],
		frameworks: [
			{ name: 'React', icon: '/tech-icons/react.svg' },
			{ name: 'Spring Boot', icon: '/tech-icons/spring.svg' },
			{ name: 'Svelte', icon: '/tech-icons/svelte.svg' },
			{ name: 'Node.js', icon: '/tech-icons/nodejs.svg' },
			{ name: 'Django', icon: '/tech-icons/django.svg' },
			{ name: 'Flutter', icon: '/tech-icons/flutter.svg' },
			{ name: 'PyTorch', icon: '/tech-icons/pytorch.svg' },
			{ name: 'Scikit-learn', icon: '/tech-icons/scikit-learn.svg' },
			{ name: 'Pandas', icon: '/tech-icons/pandas.svg' },
			{ name: 'Tailwind', icon: '/tech-icons/tailwind.svg' }
		],
		tools: [
			{ name: 'Git', icon: '/tech-icons/git.svg' },
			{ name: 'AWS', icon: '/tech-icons/aws.svg' },
			{ name: 'Docker', icon: '/tech-icons/docker.svg' },
			{ name: 'Kubernetes', icon: '/tech-icons/kubernetes.svg' },
			{ name: 'VS Code', icon: '/tech-icons/vscode.svg' },
			{ name: 'MySQL', icon: '/tech-icons/mysql.svg' },
			{ name: 'PostgreSQL', icon: '/tech-icons/postgresql.svg' },
			{ name: 'Vim', icon: '/tech-icons/vim.svg' },
			{ name: 'Linux', icon: '/tech-icons/linux.svg' },
			{ name: 'Maven', icon: '/tech-icons/maven.svg' },
			{ name: 'Jira', icon: '/tech-icons/jira.svg' },
			{ name: 'HuggingFace', icon: '/tech-icons/huggingface.svg' },
			{ name: 'Figma', icon: '/tech-icons/figma.svg' }
		]
	};
	
	function toggleCollapse() {
		hasUserInteracted = true;
		isCollapsed = !isCollapsed;
		if (!isCollapsed) {
			startAutoScroll();
		} else {
			stopAutoScroll();
		}
	}
	
	function startAutoScroll() {
		if (scrollContainer && !hasUserInteracted) {
			scrollPhase = 'down';
			autoScrollInterval = window.setInterval(() => {
				if (scrollContainer && !hasUserInteracted) {
					const maxScroll = scrollContainer.scrollHeight - scrollContainer.clientHeight;
					const currentScroll = scrollContainer.scrollTop;
					
					if (scrollPhase === 'down') {
						if (currentScroll >= maxScroll) {
							// Reached bottom, start scrolling up
							scrollPhase = 'up';
						} else {
							scrollContainer.scrollTop += 1;
						}
					} else if (scrollPhase === 'up') {
						if (currentScroll <= 0) {
							// Reached top, close the dashboard
							scrollPhase = 'done';
							stopAutoScroll();
							setTimeout(() => {
								isCollapsed = true;
							}, 500);
						} else {
							scrollContainer.scrollTop -= 1;
						}
					}
				}
			}, 30);
		}
	}
	
	function stopAutoScroll() {
		if (autoScrollInterval) {
			window.clearInterval(autoScrollInterval);
		}
	}
	
	function handleMouseEnter() {
		hasUserInteracted = true;
		stopAutoScroll();
	}
	
	function handleMouseLeave() {
		// Don't restart auto-scroll after user interaction
	}
	
	onMount(() => {
		startAutoScroll();
		
		return () => {
			stopAutoScroll();
		};
	});
</script>

<div class="fixed top-4 right-4 z-30 flex items-start gap-2 transition-all duration-300" style="{isCollapsed ? 'transform: translateX(calc(100% - 3rem));' : ''}">
	<!-- Collapsed Tab -->
	{#if isCollapsed}
		<button
			class="bg-gradient-to-br from-teal-600 to-teal-700 border-2 border-teal-400 border-opacity-60 rounded-l-lg p-3 backdrop-blur-sm hover:from-teal-500 hover:to-teal-600 transition-all animate-pulse"
			style="box-shadow: 0 10px 40px rgba(0,0,0,0.8), 0 0 40px rgba(45, 212, 191, 0.5), inset 0 1px 0 rgba(255,255,255,0.2);"
			onclick={toggleCollapse}
			title="Expand Skills"
		>
			<span class="text-3xl transform rotate-0 inline-block drop-shadow-lg">🛠️</span>
		</button>
	{/if}
	
	<!-- Main Dashboard -->
	<div 
		class="w-72 bg-gray-900 bg-opacity-95 border border-teal-500 border-opacity-40 rounded-lg overflow-hidden backdrop-blur-sm transition-all duration-300" 
		style="box-shadow: 0 10px 40px rgba(0,0,0,0.8), 0 0 30px rgba(45, 212, 191, 0.2), inset 0 0 60px rgba(0,0,0,0.3); {isCollapsed ? 'opacity: 0; pointer-events: none; transform: scale(0.95);' : 'opacity: 1;'}"
	>
		<!-- Header -->
		<div class="bg-gradient-to-r from-teal-600 via-teal-500 to-cyan-500 px-4 py-3 flex items-center justify-between">
			<div class="flex items-center gap-2">
				<span class="text-2xl">🛠️</span>
				<div>
					<div class="text-white font-pixel text-xs">Tech Stack</div>
					<div class="text-teal-100 text-xs font-body opacity-90">Skills & Tools</div>
				</div>
			</div>
			<button
				class="text-white hover:text-teal-200 transition-colors p-1"
				onclick={toggleCollapse}
				title="Collapse"
			>
				<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7M5 5l7 7-7 7"></path>
				</svg>
			</button>
		</div>

		<!-- Content -->
		<div 
			bind:this={scrollContainer}
			class="p-4 space-y-4 max-h-[70vh] overflow-y-auto" 
			style="scrollbar-width: thin; scrollbar-color: rgba(45, 212, 191, 0.5) rgba(0,0,0,0.3);"
			onmouseenter={handleMouseEnter}
			onmouseleave={handleMouseLeave}
			role="region"
			aria-label="Skills list"
		>
			<!-- Languages -->
			<div>
				<div class="text-xs font-bold text-teal-400 mb-2 font-pixel">Languages</div>
				<div class="grid grid-cols-2 gap-2">
					{#each skills.languages as skill}
						<div class="flex items-center gap-2 bg-gray-800 bg-opacity-50 px-3 py-2 rounded text-xs text-gray-300 font-body border border-gray-700 border-opacity-50 hover:border-teal-500 hover:border-opacity-50 transition-all">
							<img src={skill.icon} alt={skill.name} class="w-4 h-4" />
							<span>{skill.name}</span>
						</div>
					{/each}
				</div>
			</div>

			<!-- Frameworks -->
			<div>
				<div class="text-xs font-bold text-teal-400 mb-2 font-pixel">Libraries/Frameworks</div>
				<div class="grid grid-cols-2 gap-2">
					{#each skills.frameworks as skill}
						<div class="flex items-center gap-2 bg-gray-800 bg-opacity-50 px-3 py-2 rounded text-xs text-gray-300 font-body border border-gray-700 border-opacity-50 hover:border-teal-500 hover:border-opacity-50 transition-all">
							<img src={skill.icon} alt={skill.name} class="w-4 h-4" />
							<span>{skill.name}</span>
						</div>
					{/each}
				</div>
			</div>

			<!-- Tools -->
			<div>
				<div class="text-xs font-bold text-teal-400 mb-2 font-pixel">Tools</div>
				<div class="grid grid-cols-2 gap-2">
					{#each skills.tools as skill}
						<div class="flex items-center gap-2 bg-gray-800 bg-opacity-50 px-3 py-2 rounded text-xs text-gray-300 font-body border border-gray-700 border-opacity-50 hover:border-teal-500 hover:border-opacity-50 transition-all">
							<img src={skill.icon} alt={skill.name} class="w-4 h-4" />
							<span>{skill.name}</span>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
</div>
