<script lang="ts">
  import { onMount } from 'svelte';
  import { fetchTransactions } from './api';
  import type { IFindFilterOptions } from './typings';

  let ready = false;
  let loading = false;
  let error = '';

  let transactions: {date: string; expense: number; category?: string; note?: string}[] = [];

  let filters: Partial<IFindFilterOptions> = {
    date: '',
    expense: undefined,
    category: '',
    note: ''
  };

  async function loadTransactions() {
    loading = true;
    error = '';
    
    try {
      const filterParams: Partial<IFindFilterOptions> = {};
      
      if (filters.date) filterParams.date = filters.date;
      if (filters.expense !== undefined && filters.expense !== null && filters.expense.toString() !== '') {
        filterParams.expense = Number(filters.expense);
      }
      if (filters.category) filterParams.category = filters.category;
      if (filters.note) filterParams.note = filters.note;

      const hasFilters = Object.keys(filterParams).length > 0;
      const data = hasFilters ? await fetchTransactions(filterParams) : await fetchTransactions();
      
      transactions = data || [];
    } catch (err) {
      error = err instanceof Error ? err.message : 'Failed to fetch transactions';
      transactions = [];
    } finally {
      loading = false;
    }
  }

  onMount(() => {
    // Initialize Telegram WebApp if available
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.ready();
      window.Telegram.WebApp.expand();
    }
    ready = true;

    loadTransactions();
  });
</script>

<main>
  {#if ready}
    <div class="container">
      <div class="filters-card">
        <div class="filters-grid">
          <div class="input-group">
            <label for="date">Date</label>
            <input
              id="date"
              type="date"
              bind:value={filters.date}
              on:change={loadTransactions}
              placeholder="dd.mm.yyyy"
            />
          </div>

          <div class="input-group">
            <label for="expense">Expense</label>
            <input
              id="expense"
              type="number"
              bind:value={filters.expense}
              on:input={loadTransactions}
              placeholder="Amount"
              step="0.01"
            />
          </div>

          <div class="input-group">
            <label for="category">Category</label>
            <input
              id="category"
              type="text"
              bind:value={filters.category}
              on:input={loadTransactions}
            />
          </div>

          <div class="input-group">
            <label for="note">Note</label>
            <input
              id="note"
              type="text"
              bind:value={filters.note}
              on:input={loadTransactions}
            />
          </div>
        </div>
      </div>

      <div class="results-section">
        {#if loading}
          <div class="status-message">
            <div class="spinner"></div>
            <p>Loading transactions...</p>
          </div>
        {:else if error}
          <div class="status-message error">
            <p>{error}</p>
          </div>
        {:else if transactions.length > 0}
          <div class="transactions">
            {#each transactions as transaction}
              <div class="transaction-card">
                <div class="transaction-header">
                  <span class="transaction-date">{transaction.date}</span>
                  <span class="transaction-amount">{transaction.expense}</span>
                </div>
                {#if transaction.category}
                  <span class="transaction-category">{transaction.category}</span>
                {/if}
                {#if transaction.note}
                  <p class="transaction-note">{transaction.note}</p>
                {/if}
              </div>
            {/each}
          </div>
        {:else}
          <div class="status-message">
            <p>Can't find transactions, try to change filters</p>
          </div>
        {/if}
      </div>
    </div>
  {/if}
</main>
