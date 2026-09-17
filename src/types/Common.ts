export type SortOrder = 'asc' | 'desc';

export interface SortConfig<TField extends string = string> {
  field: TField;
  order: SortOrder;
}

export interface PaginationParams {
  page: number;
  perPage: number;
}

export interface PaginationMeta {
  first: number;
  prev: number | null;
  next: number | null;
  last: number;
  pages: number;
  items: number;
}
