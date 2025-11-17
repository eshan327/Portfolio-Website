<script lang="ts">
	import { FileText, ExternalLink, Github } from 'lucide-svelte';
	import { openWindow } from '$lib/apps';

	const projects = [
		{
			name: 'Auditory Classifier',
			filename: 'AuditoryClassifier.md',
			displayName: 'Auditory Classifier',
			description: 'Deep learning audio classification with 94.2% accuracy',
			tags: ['Python', 'PyTorch', 'Machine Learning'],
			github: 'https://github.com/eshan327/auditory-classifier',
			demo: null,
			icon: '/project-icons/ml.svg'
		},
		{
			name: 'Palette',
			filename: 'Palette.md',
			displayName: 'Palette',
			description: 'Color palette generator with accessibility checking',
			tags: ['React', 'TypeScript', 'Node.js'],
			github: 'https://github.com/eshan327/palette',
			demo: 'https://palette-demo.vercel.app',
			icon: '/project-icons/design.svg'
		},
		{
			name: 'Poisson Disk Sampling',
			filename: 'PoissonDisk.md',
			displayName: 'Poisson Disk Sampling',
			description: 'Interactive procedural generation visualizer',
			tags: ['JavaScript', 'WebGL', 'Algorithms'],
			github: 'https://github.com/eshan327/poisson-disk-sampling',
			demo: 'https://poisson-visualizer.netlify.app',
			icon: '/project-icons/algorithm.svg'
		},
		{
			name: 'GroceryZone',
			filename: 'GroceryZone.md',
			displayName: 'GroceryZone',
			description: 'Full-stack e-commerce platform for groceries',
			tags: ['React', 'Express', 'PostgreSQL'],
			github: 'https://github.com/eshan327/groceryzone',
			demo: 'https://groceryzone-demo.herokuapp.com',
			icon: '/project-icons/ecommerce.svg'
		}
	];

	async function openProject(filename: string, projectName: string) {
		let component;
		
		switch (filename) {
			case 'AuditoryClassifier.md':
				component = await import('$lib/content/projects/AuditoryClassifier.md');
				break;
			case 'Palette.md':
				component = await import('$lib/content/projects/Palette.md');
				break;
			case 'PoissonDisk.md':
				component = await import('$lib/content/projects/PoissonDisk.md');
				break;
			case 'GroceryZone.md':
				component = await import('$lib/content/projects/GroceryZone.md');
				break;
		}
		
		if (component) {
			openWindow(projectName, component.default, 'FileText');
		}
	}
</script>

<div class="bg-gray-50 font-body">
	<!-- Header -->
	<div class="bg-gradient-to-r from-teal-600 to-teal-700 px-4 py-3 border-b-2 border-teal-800">
		<h2 class="text-white font-bold text-base">Featured Projects</h2>
		<p class="text-teal-100 text-xs mt-1">Click on a project to view details</p>
	</div>

	<!-- Project Grid -->
	<div class="p-4 space-y-3">
		{#each projects as project}
			<div class="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all hover:border-teal-300">
				<!-- Project Header -->
				<button
					class="w-full p-4 text-left hover:bg-gray-50 transition-colors"
					onclick={() => openProject(project.filename, project.name)}
					type="button"
				>
					<div class="flex items-start gap-3">
						<img src={project.icon} alt={project.displayName} class="w-10 h-10 rounded" />
						<div class="flex-1">
							<h3 class="font-bold text-base text-gray-900 mb-1">{project.displayName}</h3>
							<p class="text-sm text-gray-600 mb-2">{project.description}</p>
							<div class="flex flex-wrap gap-1.5">
								{#each project.tags as tag}
									<span class="text-xs px-2 py-1 bg-teal-100 text-teal-700 rounded-full font-medium">
										{tag}
									</span>
								{/each}
							</div>
						</div>
						<FileText size={20} class="text-gray-400 flex-shrink-0" />
					</div>
				</button>
				
				<!-- Quick Links -->
				<div class="px-4 py-3 bg-gray-50 border-t border-gray-200 flex gap-2">
					<a
						href={project.github}
						target="_blank"
						rel="noopener noreferrer"
						class="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gray-800 hover:bg-gray-700 text-white text-xs rounded transition-colors"
						onclick={(e) => e.stopPropagation()}
					>
						<Github size={14} />
						<span>View Code</span>
					</a>
					{#if project.demo}
						<a
							href={project.demo}
							target="_blank"
							rel="noopener noreferrer"
							class="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-teal-600 hover:bg-teal-500 text-white text-xs rounded transition-colors"
							onclick={(e) => e.stopPropagation()}
						>
							<ExternalLink size={14} />
							<span>Live Demo</span>
						</a>
					{/if}
				</div>
			</div>
		{/each}
	</div>
</div>
