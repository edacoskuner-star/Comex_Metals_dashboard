<script>
	import MetalCard from '../lib/components/MetalCard.svelte';
	import Chart from '../lib/components/Chart.svelte';
	import AlertSystem from '../lib/components/AlertSystem.svelte';
	import { metalStore } from '../lib/stores/metalStore.js';
	import { onMount } from 'svelte';
	import { fetchMetalsData } from '../lib/api/cmeApi.js';

	let metals = [];
	let selectedMetal = 'gold';
	let loading = true;

	onMount(async () => {
		metals = await fetchMetalsData();
		metalStore.set(metals);
		loading = false;
	});

	$: selectedMetalData = metals.find(m => m.symbol === selectedMetal);
</script>

<svelte:head>
	<title>Comex Metals Dashboard</title>
</svelte:head>

<div class="p-6 max-w-7xl mx-auto">
	<h1 class="text-4xl font-bold text-yellow-600 mb-8">Değerli Metaller Dashboard</h1>

	{#if loading}
		<div class="text-center py-12">
			<p class="text-xl text-gray-500">Veriler yükleniyor...</p>
		</div>
	{:else}
		<AlertSystem />

		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
			{#each metals as metal (metal.symbol)}
				<MetalCard 
					{metal} 
					selected={selectedMetal === metal.symbol}
					on:select={() => selectedMetal = metal.symbol}
				/>
			{/each}
		</div>

		{#if selectedMetalData}
			<div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
				<h2 class="text-2xl font-bold mb-4">{selectedMetalData.name} - Tarihsel Veriler</h2>
				<Chart metalSymbol={selectedMetal} />
			</div>
		{/if}
	{/if}
</div>

<style>
	:global(body) {
		@apply bg-gray-50 dark:bg-gray-900;
	}
</style>
