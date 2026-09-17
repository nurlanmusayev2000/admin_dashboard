export type ProductStatus = 'active' | 'inactive';

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: ProductStatus;
  description: string;
  image: string;
  createdAt: string;
}

export type CreateProductInput = Omit<Product, 'id' | 'createdAt'>;
export type UpdateProductInput = Partial<CreateProductInput>;
