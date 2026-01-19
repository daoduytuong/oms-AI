import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/UI';
import { MOCK_ORDERS, SALES_DATA } from '../constants';
import { DollarSign, Package, Users, ShoppingCart } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const StatCard = ({ title, value, icon: Icon, description }: { title: string, value: string, icon: any, description: string }) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <Icon className="h-4 w-4 text-slate-500" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-xs text-slate-500">{description}</p>
    </CardContent>
  </Card>
);

const Dashboard: React.FC = () => {
  const totalRevenue = MOCK_ORDERS.reduce((acc, curr) => acc + curr.total, 0);
  const totalOrders = MOCK_ORDERS.length;
  const activeNow = 12; // Mock

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Total Revenue" 
          value={`$${totalRevenue.toLocaleString()}`} 
          icon={DollarSign}
          description="+20.1% from last month"
        />
        <StatCard 
          title="Orders" 
          value={totalOrders.toString()} 
          icon={ShoppingCart}
          description="+15 since last hour"
        />
        <StatCard 
          title="Active Customers" 
          value={activeNow.toString()} 
          icon={Users}
          description="+180 new customers"
        />
        <StatCard 
          title="Pending Shipments" 
          value="7" 
          icon={Package}
          description="Requires attention"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={SALES_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  stroke="#888888" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip 
                    cursor={{fill: 'transparent'}}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="sales" fill="#0f172a" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {MOCK_ORDERS.slice(0, 5).map((order) => (
                <div key={order.id} className="flex items-center">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-800">
                    {order.customer.name.charAt(0)}
                  </div>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">{order.customer.name}</p>
                    <p className="text-xs text-slate-500">{order.customer.email}</p>
                  </div>
                  <div className="ml-auto font-medium">+${order.total.toFixed(2)}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
