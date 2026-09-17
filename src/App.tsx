import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { ErrorBoundary } from '@/components/common/ErrorBoundary';
import { FullPageSpinner } from '@/components/common/Spinner';
import { Layout } from '@/components/layout/Layout';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { LoginPage } from '@/pages/LoginPage';

const DashboardPage = lazy(() =>
  import('@/pages/DashboardPage').then((m) => ({ default: m.DashboardPage })),
);
const ProductsPage = lazy(() =>
  import('@/pages/ProductsPage').then((m) => ({ default: m.ProductsPage })),
);
const ProductDetailPage = lazy(() =>
  import('@/pages/ProductDetailPage').then((m) => ({
    default: m.ProductDetailPage,
  })),
);
const OrdersPage = lazy(() =>
  import('@/pages/OrdersPage').then((m) => ({ default: m.OrdersPage })),
);
const OrderDetailPage = lazy(() =>
  import('@/pages/OrderDetailPage').then((m) => ({
    default: m.OrderDetailPage,
  })),
);
const CustomersPage = lazy(() =>
  import('@/pages/CustomersPage').then((m) => ({ default: m.CustomersPage })),
);
const CustomerDetailPage = lazy(() =>
  import('@/pages/CustomerDetailPage').then((m) => ({
    default: m.CustomerDetailPage,
  })),
);
const NotFound = lazy(() =>
  import('@/pages/NotFound').then((m) => ({ default: m.NotFound })),
);

export default function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<FullPageSpinner />}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />

          <Route element={<ProtectedRoute />}>
            <Route element={<Layout />}>
              <Route index element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/products/:id" element={<ProductDetailPage />} />
              <Route path="/orders" element={<OrdersPage />} />
              <Route path="/orders/:id" element={<OrderDetailPage />} />
              <Route path="/customers" element={<CustomersPage />} />
              <Route
                path="/customers/:id"
                element={<CustomerDetailPage />}
              />
            </Route>
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
}
