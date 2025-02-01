export interface PaginationResponse<T> {
  total: number;
  page: number;
  limit: number;
  rows: T[];
}
