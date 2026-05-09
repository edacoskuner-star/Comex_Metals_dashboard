import { writable } from 'svelte/store';

function createMetalStore() {
	const { subscribe, set, update } = writable([]);

	return {
		subscribe,
		set,
		update,
		addMetal: (metal) => update(metals => [...metals, metal]),
		removeMetal: (symbol) => update(metals => metals.filter(m => m.symbol !== symbol)),
		updateMetal: (symbol, updates) => update(metals => 
			metals.map(m => m.symbol === symbol ? { ...m, ...updates } : m)
		)
	};
}

export const metalStore = createMetalStore();
