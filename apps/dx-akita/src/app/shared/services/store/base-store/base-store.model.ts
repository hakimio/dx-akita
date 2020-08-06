export interface HttpGetResponse<T = any> {
    data: T[];
    count: number;
    total: number;
    page: number;
    pageCount: number;
}

export interface PaginatedLoadResult<T> {
    data: T[];
    totalCount: number;
}

export type LoadResult<T> = T[] | PaginatedLoadResult<T>;
