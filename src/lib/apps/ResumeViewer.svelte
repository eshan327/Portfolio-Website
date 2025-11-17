<script lang="ts">
	import { ExternalLink, Download } from 'lucide-svelte';
</script>

<div class="bg-gray-50 font-body h-full flex flex-col overflow-hidden">
	<!-- Header with actions -->
	<div class="bg-gradient-to-r from-teal-600 to-teal-700 px-4 py-3 border-b-2 border-teal-800 flex items-center justify-between flex-shrink-0">
		<div>
			<h2 class="text-white font-bold text-base">Resume</h2>
			<p class="text-teal-100 text-xs mt-1">Eshan Khan - CS & Math @ UMD</p>
		</div>
		<div class="flex gap-2">
			<a
				href="/Resume.pdf"
				download
				class="flex items-center gap-2 px-3 py-2 bg-white hover:bg-gray-100 text-teal-700 text-xs rounded transition-colors font-medium"
			>
				<Download size={14} />
				<span>Download</span>
			</a>
			<a
				href="/Resume.pdf"
				target="_blank"
				rel="noopener noreferrer"
				class="flex items-center gap-2 px-3 py-2 bg-teal-800 hover:bg-teal-900 text-white text-xs rounded transition-colors"
			>
				<ExternalLink size={14} />
				<span>Open in Tab</span>
			</a>
		</div>
	</div>

	<!-- PDF Viewer -->
	<div class="flex-1 bg-gray-200 min-h-0">
		<iframe
			src="/Resume.pdf#view=FitH"
			title="Resume PDF"
			class="w-full h-full border-0"
		></iframe>
	</div>
</div>
