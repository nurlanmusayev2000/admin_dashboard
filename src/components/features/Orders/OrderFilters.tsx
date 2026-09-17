import { useEffect, useState } from 'react';

import { FiSearch } from 'react-icons/fi';

import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { Select } from '@/components/common/Select';
import { useDebounce } from '@/hooks/useDebounce';
import { setOrdersSearch, setOrdersStatus } from '@/store/slices/filterSlice';
import { ORDER_STATUSES, ORDER_STATUS_LABELS } from '@/utils/constants';

export function OrderFilters() {
  const dispatch = useAppDispatch();
  const { searchTerm, status } = useAppSelector((state) => state.filter.orders);
  const [searchInput, setSearchInput] = useState(searchTerm);
  const debouncedSearch = useDebounce(searchInput);

  useEffect(() => {
    dispatch(setOrdersSearch(debouncedSearch));
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
          placeholder="Search by order number..."
          aria-label="Search orders by order number"
          className="w-full rounded-md border border-gray-300 bg-white py-2 pl-9 pr-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
        />
      </div>

      <Select
        aria-label="Filter by status"
        value={status ?? ''}
        onChange={(e) =>
          dispatch(
            setOrdersStatus((e.target.value || null) as typeof status),
          )
        }
        className="sm:w-48"
      >
        <option value="">All statuses</option>
        {ORDER_STATUSES.map((s) => (
          <option key={s} value={s}>
            {ORDER_STATUS_LABELS[s]}
          </option>
        ))}
      </Select>
    </div>
  );
}
