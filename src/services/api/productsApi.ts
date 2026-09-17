import type {
  CreateProductInput,
  PaginatedResponse,
  Product,
  ProductStatus,
  UpdateProductInput,
} from '@/types';

import { baseApi } from './baseApi';

export interface GetProductsParams {
  page: number;
  perPage: number;
  sortField?: string;
  sortOrder?: 'asc' | 'desc';
  search?: string;
  category?: string | null;
  status?: ProductStatus | null;
  minPrice?: number | null;
  maxPrice?: number | null;
}

function buildProductsQuery(params: GetProductsParams): string {
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
  if (params.category) search.set('category:eq', params.category);
  if (params.status) search.set('status:eq', params.status);
  if (params.minPrice != null) search.set('price:gte', String(params.minPrice));
  if (params.maxPrice != null) search.set('price:lte', String(params.maxPrice));

  return search.toString();
}

export const productsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<PaginatedResponse<Product>, GetProductsParams>({
      query: (params) => `/products?${buildProductsQuery(params)}`,
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({ type: 'Product' as const, id })),
              { type: 'Product' as const, id: 'LIST' },
            ]
          : [{ type: 'Product' as const, id: 'LIST' }],
    }),
    getProductById: builder.query<Product, string>({
      query: (id) => `/products/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Product', id }],
    }),
    createProduct: builder.mutation<Product, CreateProductInput>({
      query: (body) => ({
        url: '/products',
        method: 'POST',
        body: { ...body, createdAt: new Date().toISOString() },
      }),
      invalidatesTags: [{ type: 'Product', id: 'LIST' }],
    }),
    updateProduct: builder.mutation<
      Product,
      { id: string; body: UpdateProductInput }
    >({
      query: ({ id, body }) => ({
        url: `/products/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'Product', id },
        { type: 'Product', id: 'LIST' },
      ],
    }),
    deleteProduct: builder.mutation<void, string>({
      query: (id) => ({
        url: `/products/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: 'Product', id },
        { type: 'Product', id: 'LIST' },
      ],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productsApi;
