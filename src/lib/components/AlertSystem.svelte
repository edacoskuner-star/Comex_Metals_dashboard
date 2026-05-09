<script>
	import { alertStore } from '../stores/alertStore.js';
</script>

<div class="mb-6 space-y-3">
	{#each $alertStore as alert (alert.id)}
		<div 
			class="p-4 rounded-lg shadow-md animate-pulse"
			class:bg-red-100={alert.type === 'warning'}
			class:dark:bg-red-900={alert.type === 'warning'}
			class:bg-green-100={alert.type === 'success'}
			class:dark:bg-green-900={alert.type === 'success'}
			class:bg-blue-100={alert.type === 'info'}
			class:dark:bg-blue-900={alert.type === 'info'}
		>
			<div class="flex justify-between items-start">
				<div>
					<p class="font-bold">{alert.title}</p>
					<p class="text-sm mt-1">{alert.message}</p>
				</div>
				<button
					on:click={() => alertStore.removeAlert(alert.id)}
					class="text-lg hover:scale-125 transition-transform"
				>
					✕
				</button>
			</div>
		</div>
	{/each}
</div>

<style>
	@keyframes fadeInOut {
		0%, 100% {
			opacity: 1;
		}
		50% {
			opacity: 0.7;
		}
	}

	:global(.animate-pulse) {
		animation: fadeInOut 2s infinite;
	}
</style>
