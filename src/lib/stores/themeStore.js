import { writable } from 'svelte/store';

function createThemeStore() {
	const { subscribe, set } = writable('light');

	return {
		subscribe,
		set,
		toggle: () => set(current => current === 'dark' ? 'light' : 'dark')
	};
}

export const themeStore = createThemeStore();
