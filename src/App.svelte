<script lang="ts">
  import { onMount } from 'svelte';
  import { currentRoute, initRouter } from '@/lib/router';
  import Menu from '@/lib/Menu/Menu.svelte';
  import Home from '@/lib/Home/Home.svelte';
  import Report from '@/lib/Report/Report.svelte';
  import Update from '@/lib/Update/Update.svelte';

  onMount(() => {
    initRouter();
  });
</script>

<Menu />

{#if $currentRoute === '/report'}
  <Report />
{:else if $currentRoute.startsWith('/update/')}
  <Update />
{:else}
  <Home />
{/if}
