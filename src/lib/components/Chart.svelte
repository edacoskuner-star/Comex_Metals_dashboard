<script>
	import { onMount } from 'svelte';
	import Chart from 'chart.js/auto';
	import { fetchChartData } from '../api/cmeApi.js';

	export let metalSymbol;

	let canvas;
	let chart;
	let loading = true;

	onMount(async () => {
		const data = await fetchChartData(metalSymbol);
		
		const ctx = canvas.getContext('2d');
		chart = new Chart(ctx, {
			type: 'line',
			data: {
				labels: data.labels,
				datasets: [
					{
						label: `${metalSymbol.toUpperCase()} Fiyatı`,
						data: data.prices,
						borderColor: '#fbbf24',
						backgroundColor: 'rgba(251, 191, 36, 0.1)',
						tension: 0.4,
						fill: true,
						pointRadius: 4,
						pointBackgroundColor: '#fbbf24',
						pointBorderColor: '#fff',
						pointBorderWidth: 2
					}
				]
			},
			options: {
				responsive: true,
				maintainAspectRatio: true,
				plugins: {
					legend: {
						display: true,
						labels: {
							color: window.matchMedia('(prefers-color-scheme: dark)').matches ? '#fff' : '#000'
						}
					}
				},
				scales: {
					y: {
						ticks: {
							color: window.matchMedia('(prefers-color-scheme: dark)').matches ? '#fff' : '#000'
						},
						grid: {
							color: window.matchMedia('(prefers-color-scheme: dark)').matches ? '#444' : '#eee'
						}
					},
					x: {
						ticks: {
							color: window.matchMedia('(prefers-color-scheme: dark)').matches ? '#fff' : '#000'
						},
						grid: {
							color: window.matchMedia('(prefers-color-scheme: dark)').matches ? '#444' : '#eee'
						}
					}
				}
			}
		});
		
		loading = false;
	});
</script>

<div class="w-full">
	{#if loading}
		<p class="text-center py-8 text-gray-500">Grafik yükleniyor...</p>
	{/if}
	<canvas bind:this={canvas}></canvas>
</div>

<style>
	div {
		position: relative;
		height: 400px;
	}
</style>
