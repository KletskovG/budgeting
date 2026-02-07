<script lang="ts">
  import { currentRoute, navigateTo } from '../router';
  import './Menu.css';

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
  </nav>
</header>
