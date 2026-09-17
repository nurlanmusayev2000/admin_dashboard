import { useState } from 'react';

import { FiPlus } from 'react-icons/fi';

import { Button } from '@/components/common/Button';
import { ProductFilters } from '@/components/features/Products/ProductFilters';
import { ProductForm } from '@/components/features/Products/ProductForm';
import { ProductTable } from '@/components/features/Products/ProductTable';
import type { Product } from '@/types';

export function ProductsPage() {
  const [formState, setFormState] = useState<{
    isOpen: boolean;
    product: Product | null;
  }>({ isOpen: false, product: null });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Products
        </h1>
        <Button
          onClick={() => setFormState({ isOpen: true, product: null })}
        >
          <FiPlus size={16} />
          Add Product
        </Button>
      </div>

      <ProductFilters />

      <ProductTable
        onEdit={(product) => setFormState({ isOpen: true, product })}
      />

      <ProductForm
        isOpen={formState.isOpen}
        product={formState.product}
        onClose={() => setFormState({ isOpen: false, product: null })}
      />
    </div>
  );
}
