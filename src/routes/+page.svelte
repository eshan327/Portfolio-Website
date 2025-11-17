<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';
	import Window from '$lib/components/Window.svelte';
	import MobileFallback from '$lib/components/MobileFallback.svelte';
	import WelcomeScreen from '$lib/components/WelcomeScreen.svelte';
	import SkillsDashboard from '$lib/components/SkillsDashboard.svelte';
	import Taskbar from '$lib/components/Taskbar.svelte';
	import { windows } from '$lib/stores';
	import {
		openReadmeApp,
		openAboutApp,
		openExperienceApp,
		openProjectsApp,
		openContactApp,
		openResumeApp,
		getWindowPreview
	} from '$lib/apps';

	let isMobile = $state(false);
	let showWelcome = $state(true);
	let showLauncher = $state(false);
	let externalLinkDialog = $state<{ show: boolean; url: string; label: string }>({ show: false, url: '', label: '' });

	function handleWelcomeComplete() {
		showWelcome = false;
		showLauncher = true;
		// Mark that user has seen the welcome screen this session
		if (typeof sessionStorage !== 'undefined') {
			sessionStorage.setItem('welcomeSeen', 'true');
		}
	}

	function handleLauncherDismiss() {
		showLauncher = false;
	}

	$effect(() => {
		// Check if welcome screen was already seen this session
		if (typeof sessionStorage !== 'undefined' && sessionStorage.getItem('welcomeSeen')) {
			showWelcome = false;
		}
		
		// Check if screen is mobile-sized
		const checkMobile = () => {
			isMobile = window.innerWidth < 768;
		};
		
		checkMobile();
		window.addEventListener('resize', checkMobile);

		// Keyboard navigation
		const handleKeyDown = (e: KeyboardEvent) => {
			// ESC key to dismiss launcher
			if (e.key === 'Escape' && showLauncher) {
				handleLauncherDismiss();
				return;
			}

			// ESC to close active window
			if (e.key === 'Escape' && !showLauncher && $windows.length > 0) {
				const activeWindow = $windows.find(w => !w.isMinimized);
				if (activeWindow) {
					windows.update(w => w.filter(win => win.id !== activeWindow.id));
				}
				return;
			}

			// Tab to cycle through windows (when not in input fields)
			if (e.key === 'Tab' && !showLauncher && $windows.length > 0) {
				const target = e.target as HTMLElement;
				if (target.tagName !== 'INPUT' && target.tagName !== 'TEXTAREA') {
					e.preventDefault();
					const visibleWindows = $windows.filter(w => !w.isMinimized);
					if (visibleWindows.length > 0) {
						const currentIndex = visibleWindows.findIndex(w => !w.isMinimized);
						const nextIndex = e.shiftKey 
							? (currentIndex - 1 + visibleWindows.length) % visibleWindows.length
							: (currentIndex + 1) % visibleWindows.length;
						
						// Bring next window to front
						const nextWindow = visibleWindows[nextIndex];
						windows.update(w => w.map(win => 
							win.id === nextWindow.id 
								? { ...win, zIndex: Math.max(...w.map(w => w.zIndex)) + 1 }
								: win
						));
					}
				}
			}
		};
		
		window.addEventListener('keydown', handleKeyDown);
		
		return () => {
			window.removeEventListener('resize', checkMobile);
			window.removeEventListener('keydown', handleKeyDown);
		};
	});



	function openLinkedIn() {
		externalLinkDialog = { show: true, url: 'https://linkedin.com/in/eshankhan05', label: 'LinkedIn Profile' };
	}

	function openGitHub() {
		externalLinkDialog = { show: true, url: 'https://github.com/eshan327', label: 'GitHub Profile' };
	}

	function confirmExternalLink() {
		window.open(externalLinkDialog.url, '_blank');
		externalLinkDialog = { show: false, url: '', label: '' };
	}

	function cancelExternalLink() {
		externalLinkDialog = { show: false, url: '', label: '' };
	}
</script>

{#if isMobile}
	<MobileFallback />
{:else}
	{#if showWelcome}
		<WelcomeScreen onComplete={handleWelcomeComplete} />
	{/if}
	
	<div class="h-screen w-screen p-4 overflow-hidden fixed inset-0 bg-black" style="background-image: radial-gradient(circle at 30% 30%, rgba(45, 212, 191, 0.12) 0%, transparent 50%), radial-gradient(circle at 70% 70%, rgba(20, 184, 166, 0.08) 0%, transparent 50%), repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(45, 212, 191, 0.03) 2px, rgba(45, 212, 191, 0.03) 4px);">
		<!-- Desktop Icons - Grid Layout -->
		<div class="flex items-center justify-center h-full">
			<div class="grid grid-cols-4 gap-x-8 gap-y-8 auto-rows-min">
				<Icon label="README" imageSrc="/icons/readme.svg" onclick={openReadmeApp} preview={getWindowPreview('README')} size="large" />
				<Icon label="About" imageSrc="/icons/user.svg" onclick={openAboutApp} preview={getWindowPreview('About')} size="large" />
				<Icon label="Experience" imageSrc="/icons/briefcase.svg" onclick={openExperienceApp} preview={getWindowPreview('Experience')} size="large" />
				<Icon label="Projects" imageSrc="/icons/folder.svg" onclick={openProjectsApp} preview={getWindowPreview('Projects')} size="large" />
				<Icon label="Contact" imageSrc="/icons/contact.svg" onclick={openContactApp} preview={getWindowPreview('Contact')} size="large" />
				<Icon label="Resume" imageSrc="/icons/resume.svg" onclick={openResumeApp} preview={getWindowPreview('Resume')} size="large" />
				<Icon label="LinkedIn" imageSrc="/icons/linkedin.svg" onclick={openLinkedIn} preview="View my LinkedIn profile" size="large" />
				<Icon label="GitHub" imageSrc="/icons/github.svg" onclick={openGitHub} preview="Check out my GitHub repositories" size="large" />
			</div>
		</div>
		
		<!-- Skills Dashboard -->
		<SkillsDashboard />
		
		<!-- Windows -->
		{#each $windows as window (window.id)}
			<Window {window} />
		{/each}
		
		<!-- Taskbar -->
		<Taskbar />
	</div>

	<!-- Launcher Screen -->
	{#if showLauncher}
		<div class="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-40" onclick={handleLauncherDismiss} onkeydown={(e) => e.key === 'Escape' && handleLauncherDismiss()} role="button" tabindex="0" aria-label="Close launcher">
			<div class="bg-black p-8 border-4 border-teal-400 max-w-3xl w-full mx-4" style="filter: drop-shadow(0 20px 40px rgba(0,0,0,0.8)); box-shadow: inset 0 0 60px rgba(45, 212, 191, 0.15), 0 0 80px rgba(45, 212, 191, 0.2);" onclick={(e) => e.stopPropagation()} onkeydown={(e) => e.stopPropagation()} role="dialog" aria-modal="true" tabindex="-1">
				<!-- Header -->
				<div class="text-center mb-8">
					<h1 class="text-5xl font-pixel text-white mb-2">
						<span class="text-teal-400">ESHAN</span><span class="text-white">OS</span>
					</h1>
					<p class="text-teal-400 font-body text-lg">Welcome! Where would you like to start?</p>
				</div>

				<!-- Quick Access Grid -->
				<div class="grid grid-cols-2 gap-4 mb-6">
					<button
						class="bg-[#c0c0c0] border-2 border-t-white border-l-white border-r-gray-800 border-b-gray-800 p-6 hover:bg-gray-300 active:border-t-gray-800 active:border-l-gray-800 active:border-r-white active:border-b-white transition-all group"
						onclick={() => { openAboutApp(); handleLauncherDismiss(); }}
					>
						<div class="text-4xl mb-2">👤</div>
						<div class="font-body font-bold text-lg mb-1">About Me</div>
						<div class="font-body text-sm text-gray-600">Education & Skills</div>
					</button>

					<button
						class="bg-[#c0c0c0] border-2 border-t-white border-l-white border-r-gray-800 border-b-gray-800 p-6 hover:bg-gray-300 active:border-t-gray-800 active:border-l-gray-800 active:border-r-white active:border-b-white transition-all group"
						onclick={() => { openProjectsApp(); handleLauncherDismiss(); }}
					>
						<div class="text-4xl mb-2">📁</div>
						<div class="font-body font-bold text-lg mb-1">Projects</div>
						<div class="font-body text-sm text-gray-600">View My Work</div>
					</button>

					<button
						class="bg-[#c0c0c0] border-2 border-t-white border-l-white border-r-gray-800 border-b-gray-800 p-6 hover:bg-gray-300 active:border-t-gray-800 active:border-l-gray-800 active:border-r-white active:border-b-white transition-all group"
						onclick={() => { openExperienceApp(); handleLauncherDismiss(); }}
					>
						<div class="text-4xl mb-2">💼</div>
						<div class="font-body font-bold text-lg mb-1">Experience</div>
						<div class="font-body text-sm text-gray-600">Work History</div>
					</button>

					<button
						class="bg-[#c0c0c0] border-2 border-t-white border-l-white border-r-gray-800 border-b-gray-800 p-6 hover:bg-gray-300 active:border-t-gray-800 active:border-l-gray-800 active:border-r-white active:border-b-white transition-all group"
						onclick={() => { openContactApp(); handleLauncherDismiss(); }}
					>
						<div class="text-4xl mb-2">✉️</div>
						<div class="font-body font-bold text-lg mb-1">Contact</div>
						<div class="font-body text-sm text-gray-600">Get In Touch</div>
					</button>
				</div>

				<!-- Quick Links -->
				<div class="flex gap-4 justify-center mb-4">
					<button
						class="bg-[#c0c0c0] border-2 border-t-white border-l-white border-r-gray-800 border-b-gray-800 px-6 py-3 hover:bg-gray-300 active:border-t-gray-800 active:border-l-gray-800 active:border-r-white active:border-b-white font-body text-sm flex items-center gap-2"
						onclick={() => openGitHub()}
					>
						<span>🖥️</span> GitHub
					</button>
					<button
						class="bg-[#c0c0c0] border-2 border-t-white border-l-white border-r-gray-800 border-b-gray-800 px-6 py-3 hover:bg-gray-300 active:border-t-gray-800 active:border-l-gray-800 active:border-r-white active:border-b-white font-body text-sm flex items-center gap-2"
						onclick={() => openLinkedIn()}
					>
						<span>🔗</span> LinkedIn
					</button>
					<button
						class="bg-[#c0c0c0] border-2 border-t-white border-l-white border-r-gray-800 border-b-gray-800 px-6 py-3 hover:bg-gray-300 active:border-t-gray-800 active:border-l-gray-800 active:border-r-white active:border-b-white font-body text-sm flex items-center gap-2"
						onclick={() => { openResumeApp(); handleLauncherDismiss(); }}
					>
						<span>📄</span> Resume
					</button>
				</div>

				<!-- Dismiss hint -->
				<div class="text-center text-teal-400 text-sm font-body mt-6">
					Click outside or press ESC to explore the full desktop
				</div>
			</div>
		</div>
	{/if}

	<!-- External Link Confirmation Dialog -->
	{#if externalLinkDialog.show}
		<div class="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50" onclick={cancelExternalLink} onkeydown={(e) => e.key === 'Escape' && cancelExternalLink()} role="button" tabindex="0" aria-label="Close dialog">
			<div class="bg-gray-900 border-2 border-teal-500 rounded-lg p-6 max-w-md w-full mx-4 shadow-2xl" style="box-shadow: 0 20px 60px rgba(0,0,0,0.9), 0 0 40px rgba(45, 212, 191, 0.3);" onclick={(e) => e.stopPropagation()} onkeydown={(e) => e.stopPropagation()} role="dialog" aria-modal="true" tabindex="-1">
				<!-- Header -->
				<div class="flex items-center gap-3 mb-4">
					<div class="text-3xl">⚠️</div>
					<h2 class="text-xl font-bold text-white font-body">External Link</h2>
				</div>
				
				<!-- Message -->
				<p class="text-gray-300 font-body mb-6">
					You're about to visit <strong class="text-teal-400">{externalLinkDialog.label}</strong>. This will open in a new tab.
				</p>
				
				<!-- Buttons -->
				<div class="flex gap-3 justify-end">
					<button
						class="px-5 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded font-body text-sm transition-colors border border-gray-600"
						onclick={cancelExternalLink}
					>
						Cancel
					</button>
					<button
						class="px-5 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded font-body text-sm transition-colors"
						onclick={confirmExternalLink}
					>
						Continue
					</button>
				</div>
			</div>
		</div>
	{/if}
{/if}