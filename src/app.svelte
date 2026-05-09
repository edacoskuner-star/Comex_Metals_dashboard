<script>
	import './app.css';
	import Header from './lib/components/Header.svelte';
	import { themeStore } from './lib/stores/themeStore.js';
	import { onMount } from 'svelte';

	onMount(() => {
		// Sistem temasını kontrol et
		if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
			themeStore.set('dark');
		}
	});

	$: {
		if ($themeStore === 'dark') {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	}
</script>

<Header />

<main class="min-h-screen bg-white dark:bg-gray-900">
	<slot />
</main>

<style>
	:global(html) {
		scroll-behavior: smooth;
	}
</style>
