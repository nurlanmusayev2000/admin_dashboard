import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { OrderStatus, ProductStatus, SortOrder } from '@/types';
import { DEFAULT_PAGE_SIZE } from '@/utils/constants';

interface ProductFilters {
  category: string | null;
  status: ProductStatus | null;
  minPrice: number | null;
  maxPrice: number | null;
}

interface ProductsFilterState {
  page: number;
  pageSize: number;
  searchTerm: string;
  filters: ProductFilters;
  sortBy: { field: string; order: SortOrder };
}

interface OrdersFilterState {
  page: number;
  pageSize: number;
  searchTerm: string;
  status: OrderStatus | null;
  sortBy: { field: string; order: SortOrder };
}

interface CustomersFilterState {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortBy: { field: string; order: SortOrder };
}

interface FilterState {
  products: ProductsFilterState;
  orders: OrdersFilterState;
  customers: CustomersFilterState;
}

const initialState: FilterState = {
  products: {
    page: 1,
    pageSize: DEFAULT_PAGE_SIZE,
    searchTerm: '',
    filters: { category: null, status: null, minPrice: null, maxPrice: null },
    sortBy: { field: 'createdAt', order: 'desc' },
  },
  orders: {
    page: 1,
    pageSize: DEFAULT_PAGE_SIZE,
    searchTerm: '',
    status: null,
    sortBy: { field: 'date', order: 'desc' },
  },
  customers: {
    page: 1,
    pageSize: DEFAULT_PAGE_SIZE,
    searchTerm: '',
    sortBy: { field: 'name', order: 'asc' },
  },
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setProductsPage: (state, action: PayloadAction<number>) => {
      state.products.page = action.payload;
    },
    setProductsPageSize: (state, action: PayloadAction<number>) => {
      state.products.pageSize = action.payload;
      state.products.page = 1;
    },
    setProductsSearch: (state, action: PayloadAction<string>) => {
      state.products.searchTerm = action.payload;
      state.products.page = 1;
    },
    setProductsFilters: (
      state,
      action: PayloadAction<Partial<ProductFilters>>,
    ) => {
      state.products.filters = { ...state.products.filters, ...action.payload };
      state.products.page = 1;
    },
    setProductsSort: (
      state,
      action: PayloadAction<{ field: string; order: SortOrder }>,
    ) => {
      state.products.sortBy = action.payload;
    },
    resetProductsFilters: (state) => {
      state.products = initialState.products;
    },

    setOrdersPage: (state, action: PayloadAction<number>) => {
      state.orders.page = action.payload;
    },
    setOrdersPageSize: (state, action: PayloadAction<number>) => {
      state.orders.pageSize = action.payload;
      state.orders.page = 1;
    },
    setOrdersSearch: (state, action: PayloadAction<string>) => {
      state.orders.searchTerm = action.payload;
      state.orders.page = 1;
    },
    setOrdersStatus: (state, action: PayloadAction<OrderStatus | null>) => {
      state.orders.status = action.payload;
      state.orders.page = 1;
    },
    setOrdersSort: (
      state,
      action: PayloadAction<{ field: string; order: SortOrder }>,
    ) => {
      state.orders.sortBy = action.payload;
    },

    setCustomersPage: (state, action: PayloadAction<number>) => {
      state.customers.page = action.payload;
    },
    setCustomersPageSize: (state, action: PayloadAction<number>) => {
      state.customers.pageSize = action.payload;
      state.customers.page = 1;
    },
    setCustomersSearch: (state, action: PayloadAction<string>) => {
      state.customers.searchTerm = action.payload;
      state.customers.page = 1;
    },
    setCustomersSort: (
      state,
      action: PayloadAction<{ field: string; order: SortOrder }>,
    ) => {
      state.customers.sortBy = action.payload;
    },
  },
});

export const {
  setProductsPage,
  setProductsPageSize,
  setProductsSearch,
  setProductsFilters,
  setProductsSort,
  resetProductsFilters,
  setOrdersPage,
  setOrdersPageSize,
  setOrdersSearch,
  setOrdersStatus,
  setOrdersSort,
  setCustomersPage,
  setCustomersPageSize,
  setCustomersSearch,
  setCustomersSort,
} = filterSlice.actions;
export default filterSlice.reducer;
