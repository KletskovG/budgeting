<script lang="ts">
  import { currentRoute, navigateTo } from '@/lib/router';
  import './Menu.css';
  import { API_INSPECTOR_URL, OPEN_API_SPEC_URL } from '@/const';

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/report', label: 'Report' },
  ];
</script>

<header class="menu">
  <nav>
    {#each navItems as item}
      <button
        class="nav-item"
        class:active={$currentRoute === item.path}
        onclick={() => navigateTo(item.path)}
      >
        {item.label}
      </button>
    {/each}
    <button class="nav-item" onclick={() => window.open(API_INSPECTOR_URL, '_blank')}>Api inspect</button>
    <button class="nav-item" onclick={() => window.open(OPEN_API_SPEC_URL, '_blank')}>OpenAPI spec</button>
  </nav>
</header>
