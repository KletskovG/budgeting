import { writable } from 'svelte/store';

export const currentRoute = writable(getRouteFromHash());

function getRouteFromHash(): string {
	const hash = window.location.hash.slice(1);
	return hash || '/';
}

export function navigateTo(path: string): void {
	window.location.hash = path;
}

export function getRouteParam(pattern: string, route: string): string | null {
	const patternParts = pattern.split('/');
	const routeParts = route.split('/');

	if (patternParts.length !== routeParts.length) {
		return null;
	}

	for (let i = 0; i < patternParts.length; i++) {
		if (patternParts[i].startsWith(':')) {
			continue;
		}
		if (patternParts[i] !== routeParts[i]) {
			return null;
		}
	}

	const paramIndex = patternParts.findIndex(p => p.startsWith(':'));
	return paramIndex !== -1 ? routeParts[paramIndex] : null;
}

export function initRouter(): void {
	window.addEventListener('hashchange', () => {
		currentRoute.set(getRouteFromHash());
	});
}
