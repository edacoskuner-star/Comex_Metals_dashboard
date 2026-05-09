<script>
	import { themeStore } from '../stores/themeStore.js';
</script>

<button
	on:click={() => themeStore.set($themeStore === 'dark' ? 'light' : 'dark')}
	class="p-2 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-yellow-400 transition-all hover:scale-110"
	title="Tema Değiştir"
>
	{#if $themeStore === 'dark'}
		☀️
	{:else}
		🌙
	{/if}
</button>

<style>
	button {
		font-size: 1.5rem;
		cursor: pointer;
	}
</style>
