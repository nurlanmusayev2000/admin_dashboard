import type { Customer, PaginatedResponse } from '@/types';

import { baseApi } from './baseApi';

export interface GetCustomersParams {
  page: number;
  perPage: number;
  sortField?: string;
  sortOrder?: 'asc' | 'desc';
  search?: string;
}

function buildCustomersQuery(params: GetCustomersParams): string {
  const search = new URLSearchParams();
  search.set('_page', String(params.page));
  search.set('_per_page', String(params.perPage));

  if (params.sortField) {
    search.set(
      '_sort',
      params.sortOrder === 'desc' ? `-${params.sortField}` : params.sortField,
    );
  }
  if (params.search) search.set('name:contains', params.search);

  return search.toString();
}

export const customersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCustomers: builder.query<PaginatedResponse<Customer>, GetCustomersParams>({
      query: (params) => `/customers?${buildCustomersQuery(params)}`,
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({ type: 'Customer' as const, id })),
              { type: 'Customer' as const, id: 'LIST' },
            ]
          : [{ type: 'Customer' as const, id: 'LIST' }],
    }),
    getCustomerById: builder.query<Customer, string>({
      query: (id) => `/customers/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Customer', id }],
    }),
  }),
});

export const { useGetCustomersQuery, useGetCustomerByIdQuery } = customersApi;
