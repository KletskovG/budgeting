<script lang="ts">
  import { onMount } from 'svelte';
  import { fetchCategories, loadTransactions } from '@/api';
  import type { IFindFilterOptions } from '@/typings';
  import Loader from '@/lib/Loader/Loader.svelte';
  import { navigateTo } from '@/lib/router';

  let ready = false;
  let loading = false;
  let error = '';

  let transactions: {id: number; date: string; expense: number; category?: string; note?: string}[] = [];
  let categories: string[] = [];

  const filters: Partial<IFindFilterOptions> = {
    date: '',
    expense: undefined,
    category: '',
    note: '',
    income: '',
  };

  async function handleLoadTransactions() {
    loading = true;
    error = '';
    
    try {
      transactions = await loadTransactions(filters);
      console.log(transactions);
    } catch (err) {   
      error = err instanceof Error ? err.message : 'Failed to fetch transactions';
      transactions = [];
    } finally {
      loading = false;
    }
  }

  onMount(async () => {
    ready = true;

    handleLoadTransactions();

    try {
      categories = await fetchCategories();
    } catch (err) {
      console.error('Failed to fetch categories:', err);
    }
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
              onchange={handleLoadTransactions}
              placeholder="dd.mm.yyyy"
            />
          </div>

          <div class="input-group">
            <label for="expense">Expense</label>
            <input
              id="expense"
              type="number"
              bind:value={filters.expense}
              oninput={handleLoadTransactions}
              placeholder="Amount"
              step="0.01"
            />
          </div>
          
          <div class="input-group">
            <label for="income">Income</label>
            <input
              id="income"
              type="number"
              bind:value={filters.income}
              oninput={handleLoadTransactions}
              placeholder="Amount"
              step="0.01"
            />
          </div>

          <div class="input-group">
            <label for="category">Category</label>
            <select
              id="category"
              bind:value={filters.category}
              onchange={handleLoadTransactions}
            >
              <option value="">All</option>
              {#each categories as category}
                <option value={category}>{category}</option>
              {/each}
            </select>
          </div>

          <div class="input-group">
            <label for="note">Note</label>
            <input
              id="note"
              type="text"
              bind:value={filters.note}
              oninput={handleLoadTransactions}
            />
          </div>

          <button type="button" class="reload-btn" onclick={() => location.reload()}>
            Reload
          </button>
        </div>
      </div>

      <div class="results-section">
        {#if loading}
          <Loader message="Loading transactions..." />
        {:else if error}
          <div class="status-message error">
            <p>{error}</p>
          </div>
        {:else if transactions.length > 0}
          <div class="transactions">
            {#each transactions as transaction}
              <div
                class="transaction-card"
                role="link"
                tabindex="0"
                onclick={() => navigateTo(`/update/${transaction.id}`)}
              >
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
