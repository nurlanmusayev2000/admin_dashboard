import { useEffect, useState } from 'react';

import { FiSearch } from 'react-icons/fi';

import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { Select } from '@/components/common/Select';
import { useDebounce } from '@/hooks/useDebounce';
import {
  setProductsFilters,
  setProductsSearch,
} from '@/store/slices/filterSlice';
import { PRODUCT_CATEGORIES, PRODUCT_STATUSES } from '@/utils/constants';

export function ProductFilters() {
  const dispatch = useAppDispatch();
  const { searchTerm, filters } = useAppSelector((state) => state.filter.products);
  const [searchInput, setSearchInput] = useState(searchTerm);
  const debouncedSearch = useDebounce(searchInput);

  useEffect(() => {
    dispatch(setProductsSearch(debouncedSearch));
  }, [debouncedSearch, dispatch]);

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
      <div className="relative flex-1">
        <FiSearch
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          size={16}
        />
        <input
          type="search"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search by product name..."
          aria-label="Search products by name"
          className="w-full rounded-md border border-gray-300 bg-white py-2 pl-9 pr-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
        />
      </div>

      <Select
        aria-label="Filter by category"
        value={filters.category ?? ''}
        onChange={(e) =>
          dispatch(
            setProductsFilters({ category: e.target.value || null }),
          )
        }
        className="sm:w-48"
      >
        <option value="">All categories</option>
        {PRODUCT_CATEGORIES.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </Select>

      <Select
        aria-label="Filter by status"
        value={filters.status ?? ''}
        onChange={(e) =>
          dispatch(
            setProductsFilters({
              status: (e.target.value || null) as typeof filters.status,
            }),
          )
        }
        className="sm:w-40"
      >
        <option value="">All statuses</option>
        {PRODUCT_STATUSES.map((status) => (
          <option key={status} value={status} className="capitalize">
            {status}
          </option>
        ))}
      </Select>

      <div className="flex items-center gap-2">
        <input
          type="number"
          min={0}
          value={filters.minPrice ?? ''}
          onChange={(e) =>
            dispatch(
              setProductsFilters({
                minPrice: e.target.value ? Number(e.target.value) : null,
              }),
            )
          }
          placeholder="Min $"
          aria-label="Minimum price"
          className="w-24 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
        />
        <span className="text-gray-400">–</span>
        <input
          type="number"
          min={0}
          value={filters.maxPrice ?? ''}
          onChange={(e) =>
            dispatch(
              setProductsFilters({
                maxPrice: e.target.value ? Number(e.target.value) : null,
              }),
            )
          }
          placeholder="Max $"
          aria-label="Maximum price"
          className="w-24 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
        />
      </div>
    </div>
  );
}
