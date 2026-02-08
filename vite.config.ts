import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { viteSingleFile } from 'vite-plugin-singlefile';
import path from 'path';

export default defineConfig({
	plugins: [svelte(), viteSingleFile()],
	base: '/',
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src'),
		},
	},
});
