export type OrderStatus =
  | 'Placed'
  | 'Packed'
  | 'Shipped'
  | 'Out for Delivery'
  | 'Delivered';

export const ORDER_STEPS: OrderStatus[] = [
  'Placed',
  'Packed',
  'Shipped',
  'Out for Delivery',
  'Delivered',
];

export interface OrderEvent {
  status: OrderStatus;
  description: string;
  /** ISO date */
  date: string;
}

export interface OrderItem {
  id: string;
  name: string;
  size: string;
  color: string;
  price: number;
  qty: number;
  image: string;
}

export interface TrackedOrder {
  orderNumber: string;
  placedAt: string;
  status: OrderStatus;
  estimatedDelivery: string;
  courier: { name: string; trackingNumber: string };
  events: OrderEvent[];
  items: OrderItem[];
  address: string;
  payment: string;
  subtotal: number;
  shipping: number;
  total: number;
}

/**
 * Mock order lookup — replace with a Supabase query later.
 * Resolves after ~600ms; rejects for unknown order numbers.
 */
export function getOrder(
  orderNumber: string,
  _contact: string,
): Promise<TrackedOrder> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const normalized = orderNumber.trim().toUpperCase();
      if (normalized === 'ORD12345') {
        resolve(DEMO_ORDER);
      } else {
        reject(new Error('not-found'));
      }
    }, 600);
  });
}

const DEMO_ORDER: TrackedOrder = {
  orderNumber: 'ORD12345',
  placedAt: 'October 5, 2026',
  status: 'Out for Delivery',
  estimatedDelivery: 'October 15, 2026',
  courier: { name: 'Leopards Courier', trackingNumber: 'LP-829104552' },
  events: [
    {
      status: 'Out for Delivery',
      description: 'Your parcel is on the delivery vehicle and will arrive today.',
      date: 'October 15, 2026 · 8:20 AM',
    },
    {
      status: 'Shipped',
      description: 'Parcel handed to Leopards Courier at Lahore hub.',
      date: 'October 7, 2026 · 2:45 PM',
    },
    {
      status: 'Packed',
      description: 'Order packed and quality checked at our warehouse.',
      date: 'October 6, 2026 · 11:10 AM',
    },
    {
      status: 'Placed',
      description: 'Order confirmed. Payment received via Cash on Delivery.',
      date: 'October 5, 2026 · 6:32 PM',
    },
  ],
  items: [
    {
      id: 'na-4',
      name: 'Slim Fit Denim',
      size: '32',
      color: 'Blue',
      price: 5999,
      qty: 1,
      image: '/images/ecommerce-assets/pent02.png',
    },
    {
      id: 'na-1',
      name: 'Modern Striped Shirt',
      size: 'M',
      color: 'Blue-White',
      price: 4999,
      qty: 1,
      image: '/images/ecommerce-assets/shirt01.png',
    },
  ],
  address: 'House 21, Street 4, Gulberg III, Lahore, Punjab 54000',
  payment: 'Cash on Delivery',
  subtotal: 10998,
  shipping: 0,
  total: 10998,
};
