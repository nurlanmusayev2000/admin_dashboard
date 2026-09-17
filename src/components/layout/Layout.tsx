import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { useAppSelector } from '@/app/hooks';
import { ToastContainer } from '@/components/common/Toast';

import { Header } from './Header';
import { Sidebar } from './Sidebar';

export function Layout() {
  const darkMode = useAppSelector((state) => state.ui.darkMode);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Header />
        <main className="flex-1 p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
      <ToastContainer />
    </div>
  );
}
