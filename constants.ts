import { Order, OrderStatus, PaymentStatus } from './types';

export const MOCK_ORDERS: Order[] = [
  {
    id: "ORD-7382",
    customer: {
      id: "CUST-001",
      name: "Alice Freeman",
      email: "alice.f@example.com",
      phone: "+1 (555) 123-4567",
      address: "123 Maple Ave, Springfield, IL"
    },
    items: [
      {
        id: "ITEM-1",
        productName: "Ergonomic Office Chair",
        sku: "FURN-001",
        quantity: 1,
        price: 249.99,
        image: "https://picsum.photos/100/100?random=1"
      },
      {
        id: "ITEM-2",
        productName: "Mechanical Keyboard",
        sku: "TECH-042",
        quantity: 1,
        price: 129.50,
        image: "https://picsum.photos/100/100?random=2"
      }
    ],
    status: OrderStatus.PROCESSING,
    paymentStatus: PaymentStatus.PAID,
    total: 379.49,
    createdAt: "2023-10-25T14:30:00Z",
    notes: "Customer requested expedited shipping if possible."
  },
  {
    id: "ORD-7383",
    customer: {
      id: "CUST-002",
      name: "Bob Smith",
      email: "bob.smith@test.com",
      phone: "+1 (555) 987-6543",
      address: "456 Oak Ln, Metropolis, NY"
    },
    items: [
      {
        id: "ITEM-3",
        productName: "Wireless Headphones",
        sku: "AUDIO-007",
        quantity: 2,
        price: 89.99,
        image: "https://picsum.photos/100/100?random=3"
      }
    ],
    status: OrderStatus.PENDING,
    paymentStatus: PaymentStatus.UNPAID,
    total: 179.98,
    createdAt: "2023-10-26T09:15:00Z"
  },
  {
    id: "ORD-7384",
    customer: {
      id: "CUST-003",
      name: "Charlie Davis",
      email: "charlie.d@example.org",
      phone: "+1 (555) 456-7890",
      address: "789 Pine St, Gotham, NJ"
    },
    items: [
      {
        id: "ITEM-4",
        productName: "4K Monitor 27 inch",
        sku: "TECH-101",
        quantity: 1,
        price: 349.00,
        image: "https://picsum.photos/100/100?random=4"
      }
    ],
    status: OrderStatus.SHIPPED,
    paymentStatus: PaymentStatus.PAID,
    total: 349.00,
    createdAt: "2023-10-24T11:00:00Z"
  },
  {
    id: "ORD-7385",
    customer: {
      id: "CUST-004",
      name: "Diana Prince",
      email: "diana.p@example.com",
      phone: "+1 (555) 111-2222",
      address: "101 Island Dr, Paradise, CA"
    },
    items: [
      {
        id: "ITEM-5",
        productName: "USB-C Hub",
        sku: "ACC-005",
        quantity: 3,
        price: 45.00,
        image: "https://picsum.photos/100/100?random=5"
      }
    ],
    status: OrderStatus.DELIVERED,
    paymentStatus: PaymentStatus.PAID,
    total: 135.00,
    createdAt: "2023-10-20T16:45:00Z"
  },
  {
    id: "ORD-7386",
    customer: {
      id: "CUST-005",
      name: "Ethan Hunt",
      email: "ethan.h@imf.org",
      phone: "+1 (555) 007-0070",
      address: "Unknown Location"
    },
    items: [
      {
        id: "ITEM-6",
        productName: "Smart Watch Series 5",
        sku: "WEAR-009",
        quantity: 1,
        price: 299.99,
        image: "https://picsum.photos/100/100?random=6"
      }
    ],
    status: OrderStatus.CANCELLED,
    paymentStatus: PaymentStatus.REFUNDED,
    total: 299.99,
    createdAt: "2023-10-22T08:20:00Z",
    notes: "Order cancelled by customer due to delivery time."
  }
];

export const SALES_DATA = [
  { name: 'Mon', sales: 4000 },
  { name: 'Tue', sales: 3000 },
  { name: 'Wed', sales: 2000 },
  { name: 'Thu', sales: 2780 },
  { name: 'Fri', sales: 1890 },
  { name: 'Sat', sales: 2390 },
  { name: 'Sun', sales: 3490 },
];
