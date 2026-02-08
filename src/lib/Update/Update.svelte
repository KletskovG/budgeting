<script lang="ts">
  import { currentRoute, getRouteParam } from '@/lib/router';

  const id = $derived(getRouteParam('/update/:id', $currentRoute) ?? '');
</script>

<main>
  <div class="container">
    <p>ID: {id}</p>
  </div>
</main>
