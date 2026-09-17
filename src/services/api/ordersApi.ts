import type { Order, OrderStatus, PaginatedResponse } from '@/types';

import { baseApi } from './baseApi';

export interface GetOrdersParams {
  page: number;
  perPage: number;
  sortField?: string;
  sortOrder?: 'asc' | 'desc';
  search?: string;
  status?: OrderStatus | null;
}

function buildOrdersQuery(params: GetOrdersParams): string {
  const search = new URLSearchParams();
  search.set('_page', String(params.page));
  search.set('_per_page', String(params.perPage));

  if (params.sortField) {
    search.set(
      '_sort',
      params.sortOrder === 'desc' ? `-${params.sortField}` : params.sortField,
    );
  }
  if (params.search) search.set('orderNumber:contains', params.search);
  if (params.status) search.set('status:eq', params.status);

  return search.toString();
}

export const ordersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query<PaginatedResponse<Order>, GetOrdersParams>({
      query: (params) => `/orders?${buildOrdersQuery(params)}`,
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({ type: 'Order' as const, id })),
              { type: 'Order' as const, id: 'LIST' },
            ]
          : [{ type: 'Order' as const, id: 'LIST' }],
    }),
    getOrderById: builder.query<Order, string>({
      query: (id) => `/orders/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Order', id }],
    }),
    getOrdersByCustomer: builder.query<Order[], string>({
      // json-server v1 treats `customerId` as a relation key and won't filter on
      // it directly, so filter client-side instead.
      query: () => '/orders',
      transformResponse: (response: Order[], _meta, customerId) =>
        response.filter((order) => order.customerId === customerId),
      providesTags: [{ type: 'Order', id: 'LIST' }],
    }),
    getOrdersByProduct: builder.query<Order[], string>({
      query: () => '/orders',
      transformResponse: (response: Order[], _meta, productId) =>
        response.filter((order) =>
          order.items.some((item) => item.productId === productId),
        ),
      providesTags: [{ type: 'Order', id: 'LIST' }],
    }),
    updateOrderStatus: builder.mutation<
      Order,
      { id: string; status: OrderStatus }
    >({
      query: ({ id, status }) => ({
        url: `/orders/${id}`,
        method: 'PATCH',
        body: { status },
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'Order', id },
        { type: 'Order', id: 'LIST' },
      ],
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useGetOrderByIdQuery,
  useGetOrdersByCustomerQuery,
  useGetOrdersByProductQuery,
  useUpdateOrderStatusMutation,
} = ordersApi;
