<script>
	import { createEventDispatcher } from 'svelte';

	export let metal;
	export let selected = false;

	const dispatch = createEventDispatcher();

	const icons = {
		gold: '🥇',
		silver: '🥈',
		copper: '🧅',
		platinum: '🤍',
		palladium: '🤍'
	};
</script>

<button
	on:click={() => dispatch('select')}
	class="p-4 rounded-lg shadow-md transition-all hover:shadow-lg hover:scale-105"
	class:selected
	class:bg-yellow-100={selected}
	class:dark:bg-yellow-900={selected}
	class:bg-white={!selected}
	class:dark:bg-gray-800={!selected}
>
	<div class="text-3xl mb-2">{icons[metal.symbol] || '💰'}</div>
	<h3 class="font-bold text-lg">{metal.name}</h3>
	<p class="text-sm text-gray-600 dark:text-gray-300 mb-2">{metal.symbol.toUpperCase()}</p>
	
	<div class="text-right">
		<p class="text-xl font-bold text-yellow-600 dark:text-yellow-400">
			${metal.price.toFixed(2)}
		</p>
		<p class="text-sm" class:text-green-600={metal.change >= 0} class:text-red-600={metal.change < 0}>
			{metal.change >= 0 ? '+' : ''}{metal.change.toFixed(2)}%
		</p>
	</div>
</button>

<style>
	button.selected {
		border: 2px solid #fbbf24;
	}
</style>
