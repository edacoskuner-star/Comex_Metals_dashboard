<script>
	import ThemeToggle from './ThemeToggle.svelte';
</script>

<header class="bg-gradient-to-r from-yellow-500 to-yellow-600 dark:from-gray-800 dark:to-gray-900 text-white shadow-lg">
	<div class="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
		<div class="flex items-center gap-3">
			<span class="text-3xl">💎</span>
			<h1 class="text-2xl font-bold">Comex Metals Dashboard</h1>
		</div>
		<ThemeToggle />
	</div>
</header>

<style>
	header {
		background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
	}

	:global(.dark) header {
		background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
	}
</style>
