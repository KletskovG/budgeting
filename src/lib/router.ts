import { writable } from 'svelte/store';

export const currentRoute = writable(getRouteFromHash());

function getRouteFromHash(): string {
	const hash = window.location.hash.slice(1);
	return hash || '/';
}

export function navigateTo(path: string): void {
	window.location.hash = path;
}

export function initRouter(): void {
	window.addEventListener('hashchange', () => {
		currentRoute.set(getRouteFromHash());
	});
}
