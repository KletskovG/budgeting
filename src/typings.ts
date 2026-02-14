export interface IFindFilterOptions {
    date: string;
    expense: number;
    category?: string | null;
    note?: string | null;
}

export interface ICategoriesResponse {
    status: string;
    data: string[];
}
