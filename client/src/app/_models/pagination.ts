export interface Pagination{
    currentPage: number;
    itmersPerPage: number;
    totalItems:number;
    totalPages: number;
}

export class PaginatedResult<T> {
    result: T;
    pagination: Pagination;
}