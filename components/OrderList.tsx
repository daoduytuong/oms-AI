import React, { useState } from 'react';
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
  Badge, Button, Input, Card, CardHeader, CardTitle, CardContent
} from './ui/UI';
import { MOCK_ORDERS } from '../constants';
import { Order, OrderStatus } from '../types';
import { Search, Eye } from 'lucide-react';

interface OrderListProps {
  onSelectOrder: (order: Order) => void;
}

const OrderList: React.FC<OrderListProps> = ({ onSelectOrder }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredOrders = MOCK_ORDERS.filter(order => 
    order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusVariant = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.DELIVERED: return 'success';
      case OrderStatus.SHIPPED: return 'default';
      case OrderStatus.PROCESSING: return 'warning';
      case OrderStatus.CANCELLED: return 'destructive';
      default: return 'outline';
    }
  };

  return (
    <div className="space-y-4 animate-in fade-in zoom-in-95 duration-300">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Orders</h2>
        <div className="flex items-center space-x-2">
           <Button variant="outline">Export</Button>
           <Button>Create Order</Button>
        </div>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>All Orders</CardTitle>
            <div className="relative w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-slate-500" />
                <Input 
                    placeholder="Search orders..." 
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {filteredOrders.map((order) => (
                    <TableRow key={order.id} className="cursor-pointer" onClick={() => onSelectOrder(order)}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>
                        <div className="flex flex-col">
                            <span className="font-medium">{order.customer.name}</span>
                            <span className="text-xs text-slate-500">{order.customer.email}</span>
                        </div>
                    </TableCell>
                    <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>${order.total.toFixed(2)}</TableCell>
                    <TableCell>
                        <Badge variant={getStatusVariant(order.status)}>
                        {order.status}
                        </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                        <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); onSelectOrder(order); }}>
                            <Eye className="h-4 w-4" />
                        </Button>
                    </TableCell>
                    </TableRow>
                ))}
                {filteredOrders.length === 0 && (
                    <TableRow>
                        <TableCell colSpan={6} className="text-center py-10 text-slate-500">
                            No orders found.
                        </TableCell>
                    </TableRow>
                )}
                </TableBody>
            </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderList;
