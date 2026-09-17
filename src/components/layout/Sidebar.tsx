import { NavLink } from 'react-router-dom';

import { clsx } from 'clsx';
import {
  FiBox,
  FiGrid,
  FiShoppingCart,
  FiUsers,
  FiX,
} from 'react-icons/fi';

import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { setSidebarOpen } from '@/store/slices/uiSlice';

const NAV_ITEMS = [
  { to: '/dashboard', label: 'Dashboard', icon: FiGrid },
  { to: '/products', label: 'Products', icon: FiBox },
  { to: '/orders', label: 'Orders', icon: FiShoppingCart },
  { to: '/customers', label: 'Customers', icon: FiUsers },
];

export function Sidebar() {
  const dispatch = useAppDispatch();
  const sidebarOpen = useAppSelector((state) => state.ui.sidebarOpen);

  return (
    <>
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          onClick={() => dispatch(setSidebarOpen(false))}
          aria-hidden="true"
        />
      )}
      <aside
        className={clsx(
          'fixed inset-y-0 left-0 z-40 w-64 transform border-r border-gray-200 bg-white transition-transform lg:static lg:translate-x-0 dark:border-gray-700 dark:bg-gray-800',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <div className="flex h-16 items-center justify-between px-4">
          <span className="text-lg font-bold text-primary-600 dark:text-primary-400">
            Admin Dashboard
          </span>
          <button
            type="button"
            onClick={() => dispatch(setSidebarOpen(false))}
            className="rounded-md p-1 text-gray-400 hover:bg-gray-100 lg:hidden dark:hover:bg-gray-700"
            aria-label="Close sidebar"
          >
            <FiX size={20} />
          </button>
        </div>
        <nav className="flex flex-col gap-1 px-3 py-2" aria-label="Primary">
          {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                clsx(
                  'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300'
                    : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700',
                )
              }
              onClick={() => dispatch(setSidebarOpen(false))}
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}
