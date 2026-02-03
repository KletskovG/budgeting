import { API, ROUTES } from './const';
import type { IFindFilterOptions } from './typings';

interface IApiResponse<T> {
  data: T;
}

function buildQueryString(filters?: Partial<IFindFilterOptions>): string {
  if (!filters) {
    return '';
  };
  
  const params = new URLSearchParams();
  
  if (filters.date) {
    params.append('date', filters.date);
  };

  if (filters.expense !== undefined) {
    params.append('expense', filters.expense.toString());
  };

  if (filters.category) {
    params.append('category', filters.category);
  };

  if (filters.note) {
    params.append('note', filters.note);
  };
  
  const queryString = params.toString();
  return queryString ? `?${queryString}` : '';
}

export async function fetchTransactions<T = any>(
  filters?: Partial<IFindFilterOptions>
): Promise<T[]> {
  const queryString = buildQueryString(filters);
  const url = `${API}${ROUTES.find}${queryString}`;
  
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`API request failed: ${response.statusText}`);
  }
  
  const result: IApiResponse<T[]> = await response.json();
  return result.data;
}
