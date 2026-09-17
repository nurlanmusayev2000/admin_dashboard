import type { PaginationMeta } from './Common';

/** Shape returned by json-server v1 when `_page` & `_per_page` are used. */
export interface PaginatedResponse<T> extends PaginationMeta {
  data: T[];
}

export interface ApiErrorBody {
  message: string;
}
