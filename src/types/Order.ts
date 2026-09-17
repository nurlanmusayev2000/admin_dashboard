export type OrderStatus =
  | 'pending'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled';

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  customer: string;
  customerId: string;
  status: OrderStatus;
  total: number;
  date: string;
  items: OrderItem[];
}

export type UpdateOrderStatusInput = {
  id: string;
  status: OrderStatus;
};
