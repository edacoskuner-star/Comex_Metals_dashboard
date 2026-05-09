import { writable } from 'svelte/store';

function createAlertStore() {
	const { subscribe, set, update } = writable([]);

	return {
		subscribe,
		addAlert: (title, message, type = 'info', duration = 5000) => {
			const id = Date.now();
			const alert = { id, title, message, type };
			
			update(alerts => [...alerts, alert]);
			
			setTimeout(() => {
				update(alerts => alerts.filter(a => a.id !== id));
			}, duration);
			
			return id;
		},
		removeAlert: (id) => update(alerts => alerts.filter(a => a.id !== id)),
		clear: () => set([])
	};
}

export const alertStore = createAlertStore();
