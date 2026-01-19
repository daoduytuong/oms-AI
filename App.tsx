import React, { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import OrderList from './components/OrderList';
import OrderDetails from './components/OrderDetails';
import { Order } from './types';

const App: React.FC = () => {
  // Simple state-based routing for MVP
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    setSelectedOrder(null); // Reset detail view when changing main tabs
  };

  const handleSelectOrder = (order: Order) => {
    setSelectedOrder(order);
    setCurrentPage('orders'); // Ensure we are in the context of orders
  };

  const renderContent = () => {
    // If an order is selected, show details overlaying the 'orders' page logic
    if (selectedOrder) {
        return (
            <OrderDetails 
                order={selectedOrder} 
                onBack={() => setSelectedOrder(null)} 
            />
        );
    }

    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'orders':
        return <OrderList onSelectOrder={handleSelectOrder} />;
      case 'customers':
        return <div className="p-10 text-center text-slate-500">Customer Management Module (Coming Soon)</div>;
      case 'inventory':
        return <div className="p-10 text-center text-slate-500">Inventory Management Module (Coming Soon)</div>;
      case 'settings':
        return <div className="p-10 text-center text-slate-500">Settings Module (Coming Soon)</div>;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout activePage={currentPage} onNavigate={handleNavigate}>
      {renderContent()}
    </Layout>
  );
};

export default App;
