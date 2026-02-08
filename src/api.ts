import { API, ROUTES } from '@/const';
import type { IFindFilterOptions } from '@/typings';

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
	filters?: Partial<IFindFilterOptions>,
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

export async function loadTransactions(
	filters: Partial<IFindFilterOptions>,
): Promise<{id: number; date: string; expense: number; category?: string; note?: string}[]> {
	const filterParams: Partial<IFindFilterOptions> = {};

	if (filters.date) {
		filterParams.date = filters.date;
	}

	if (filters.expense !== undefined && filters.expense !== null && filters.expense.toString() !== '') {
		filterParams.expense = Number(filters.expense);
	}

	if (filters.category) {
		filterParams.category = filters.category;
	}

	if (filters.note) {
		filterParams.note = filters.note;
	}

	const data = await fetchTransactions(filterParams);
	return data || [];
}

export async function fetchReport<T = any>(
	dateFrom: string,
	dateTo: string,
): Promise<T> {
	const params = new URLSearchParams();
	params.append('dateFrom', dateFrom);
	params.append('dateTo', dateTo);

	const url = `${API}${ROUTES.report}?${params.toString()}`;

	const response = await fetch(url);

	if (!response.ok) {
		throw new Error(`API request failed: ${response.statusText}`);
	}

	const result: IApiResponse<T> = await response.json();
	return result.data;
}
