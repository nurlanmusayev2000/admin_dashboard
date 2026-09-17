import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  FiLogOut,
  FiMenu,
  FiMoon,
  FiSearch,
  FiSun,
  FiUser,
} from 'react-icons/fi';

import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { useAuth } from '@/hooks/useAuth';
import { setProductsSearch } from '@/store/slices/filterSlice';
import { setSidebarOpen, toggleDarkMode } from '@/store/slices/uiSlice';

export function Header() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const darkMode = useAppSelector((state) => state.ui.darkMode);
  const { user, logout } = useAuth();
  const [searchValue, setSearchValue] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSearchSubmit = (event: FormEvent) => {
    event.preventDefault();
    dispatch(setProductsSearch(searchValue));
    navigate('/products');
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-4 border-b border-gray-200 bg-white px-4 dark:border-gray-700 dark:bg-gray-800">
      <button
        type="button"
        onClick={() => dispatch(setSidebarOpen(true))}
        className="rounded-md p-2 text-gray-500 hover:bg-gray-100 lg:hidden dark:text-gray-300 dark:hover:bg-gray-700"
        aria-label="Open sidebar"
      >
        <FiMenu size={20} />
      </button>

      <form
        onSubmit={handleSearchSubmit}
        className="flex-1 max-w-md"
        role="search"
      >
        <div className="relative">
          <FiSearch
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={16}
          />
          <input
            type="search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search products..."
            aria-label="Search products"
            className="w-full rounded-md border border-gray-300 bg-gray-50 py-2 pl-9 pr-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100"
          />
        </div>
      </form>

      <div className="ml-auto flex items-center gap-2">
        <button
          type="button"
          onClick={() => dispatch(toggleDarkMode())}
          aria-label="Toggle dark mode"
          className="rounded-md p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
        >
          {darkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
        </button>

        <div className="relative">
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-haspopup="menu"
            aria-expanded={menuOpen}
            className="flex items-center gap-2 rounded-md p-1.5 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-primary-700 dark:bg-primary-900/40 dark:text-primary-300">
              <FiUser size={16} />
            </span>
            <span className="hidden sm:inline">{user?.name ?? 'Admin'}</span>
          </button>

          {menuOpen && (
            <div
              role="menu"
              className="absolute right-0 mt-2 w-40 rounded-md border border-gray-200 bg-white py-1 shadow-lg dark:border-gray-700 dark:bg-gray-800"
            >
              <button
                type="button"
                role="menuitem"
                onClick={handleLogout}
                className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
              >
                <FiLogOut size={16} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
