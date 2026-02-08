<script lang="ts">
  import './Report.css';
  import { fetchReport } from '@/api';
  import Loader from '@/lib/Loader/Loader.svelte';

  let dateFrom = '';
  let dateTo = '';
  let error = '';
  let reportUrl = '';
  let loading = false;

  async function handleDateChange() {    
    if (dateFrom && dateTo) {
      error = '';
      reportUrl = '';
      loading = true;
      try {
        const response = await fetchReport<{ csvPath: string }>(dateFrom, dateTo);
        reportUrl = response.csvPath;
      } catch (err) {
        error = err instanceof Error ? err.message : 'Failed to fetch report';
      } finally {
        loading = false;
      }
    }
  }

  $: maxDateFrom = dateTo || undefined;
  $: minDateTo = dateFrom || undefined;
</script>

<main>
  <div class="container">
    <div class="filters-card">
      <div class="date-range-grid">
        <div class="input-group">
          <label for="date-from">Date From</label>
          <input
            id="date-from"
            type="date"
            bind:value={dateFrom}
            max={maxDateFrom}
            onchange={handleDateChange}
          />
        </div>

        <div class="input-group">
          <label for="date-to">Date To</label>
          <input
            id="date-to"
            type="date"
            bind:value={dateTo}
            min={minDateTo}
            onchange={handleDateChange}
          />
        </div>
      </div>
    </div>

    {#if loading}
      <Loader message="Loading report..." />
    {:else if error}
      <div class="status-message error">
        <p>{error}</p>
      </div>
    {:else if reportUrl}
      <div class="report-link">
        <a href={reportUrl} target="_blank" rel="noopener noreferrer">{reportUrl}</a>
      </div>
    {/if}
  </div>
</main>
