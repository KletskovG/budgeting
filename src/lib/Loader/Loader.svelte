<script lang="ts">
  import './Loader.css';

  interface Props {
    message?: string;
  }

  const { message = 'Loading...' }: Props = $props();
</script>

<div class="status-message">
  <div class="spinner"></div>
  <p>{message}</p>
</div>
