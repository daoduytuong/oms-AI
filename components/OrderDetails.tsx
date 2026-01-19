import React, { useState } from 'react';
import { Order, OrderStatus } from '../types';
import { Button, Card, CardContent, CardHeader, CardTitle, Badge, Table, TableBody, TableCell, TableHeader, TableHead, TableRow } from './ui/UI';
import { ArrowLeft, Mail, AlertTriangle, Sparkles, Loader2 } from 'lucide-react';
import { generateEmailDraft, analyzeOrderRisk } from '../services/geminiService';

interface OrderDetailsProps {
  order: Order;
  onBack: () => void;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ order, onBack }) => {
  const [activeTab, setActiveTab] = useState<'details' | 'ai'>('details');
  const [emailDraft, setEmailDraft] = useState<string>('');
  const [isGeneratingEmail, setIsGeneratingEmail] = useState(false);
  const [riskAnalysis, setRiskAnalysis] = useState<{riskLevel: string, reasoning: string} | null>(null);
  const [isAnalyzingRisk, setIsAnalyzingRisk] = useState(false);

  const handleGenerateEmail = async (tone: 'professional' | 'apologetic' | 'friendly') => {
    setIsGeneratingEmail(true);
    const draft = await generateEmailDraft(order, tone);
    setEmailDraft(draft);
    setIsGeneratingEmail(false);
  };

  const handleRiskAnalysis = async () => {
    setIsAnalyzingRisk(true);
    const analysis = await analyzeOrderRisk(order);
    setRiskAnalysis(analysis);
    setIsAnalyzingRisk(false);
  };

  return (
    <div className="space-y-6 animate-in slide-in-from-right-8 duration-300">
      <div className="flex items-center space-x-4">
        <Button variant="outline" size="icon" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-2xl font-bold tracking-tight">Order {order.id}</h2>
        <Badge variant={order.status === OrderStatus.DELIVERED ? 'success' : 'default'}>{order.status}</Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Order Info */}
        <div className="lg:col-span-2 space-y-6">
            
            {/* Items */}
            <Card>
                <CardHeader>
                    <CardTitle>Order Items</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Product</TableHead>
                                <TableHead>Quantity</TableHead>
                                <TableHead className="text-right">Price</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {order.items.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell className="flex items-center space-x-4">
                                        <img src={item.image} alt={item.productName} className="h-10 w-10 rounded-md object-cover bg-slate-100" />
                                        <span>{item.productName}</span>
                                    </TableCell>
                                    <TableCell>{item.quantity}</TableCell>
                                    <TableCell className="text-right">${item.price.toFixed(2)}</TableCell>
                                </TableRow>
                            ))}
                            <TableRow>
                                <TableCell colSpan={2} className="text-right font-bold">Total</TableCell>
                                <TableCell className="text-right font-bold">${order.total.toFixed(2)}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* Customer Info */}
            <Card>
                <CardHeader>
                    <CardTitle>Customer Details</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-sm font-medium text-slate-500">Name</p>
                        <p>{order.customer.name}</p>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-slate-500">Email</p>
                        <p>{order.customer.email}</p>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-slate-500">Phone</p>
                        <p>{order.customer.phone}</p>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-slate-500">Shipping Address</p>
                        <p>{order.customer.address}</p>
                    </div>
                </CardContent>
            </Card>
        </div>

        {/* Right Column: AI Assistant & Actions */}
        <div className="space-y-6">
            <Card className="bg-gradient-to-br from-indigo-50 to-white border-indigo-100">
                <CardHeader className="pb-3">
                    <CardTitle className="flex items-center text-indigo-700">
                        <Sparkles className="h-5 w-5 mr-2" />
                        AI Copilot
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <h4 className="text-sm font-semibold text-slate-700">Customer Communication</h4>
                        <p className="text-xs text-slate-500">Generate a response draft for this customer.</p>
                        <div className="flex space-x-2">
                            <Button size="sm" variant="outline" onClick={() => handleGenerateEmail('professional')} disabled={isGeneratingEmail}>
                                Professional
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => handleGenerateEmail('apologetic')} disabled={isGeneratingEmail}>
                                Apologetic
                            </Button>
                        </div>
                        {isGeneratingEmail && <div className="flex items-center text-xs text-indigo-600"><Loader2 className="h-3 w-3 animate-spin mr-1"/> Generating draft...</div>}
                        
                        {emailDraft && (
                            <div className="mt-4 p-3 bg-white rounded-md border text-sm text-slate-700 italic">
                                "{emailDraft}"
                                <div className="mt-2 flex justify-end">
                                    <Button size="sm" variant="ghost" onClick={() => navigator.clipboard.writeText(emailDraft)}>Copy</Button>
                                </div>
                            </div>
                        )}
                    </div>
                    
                    <div className="border-t border-indigo-100 pt-4 space-y-2">
                        <h4 className="text-sm font-semibold text-slate-700">Risk Analysis</h4>
                        {!riskAnalysis ? (
                            <Button size="sm" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white" onClick={handleRiskAnalysis} disabled={isAnalyzingRisk}>
                                {isAnalyzingRisk ? <Loader2 className="h-4 w-4 animate-spin mr-2"/> : <AlertTriangle className="h-4 w-4 mr-2"/>}
                                Analyze Risk
                            </Button>
                        ) : (
                            <div className={`p-3 rounded-md border ${riskAnalysis.riskLevel === 'High' ? 'bg-red-50 border-red-200 text-red-800' : 'bg-green-50 border-green-200 text-green-800'}`}>
                                <div className="font-bold flex justify-between">
                                    Risk: {riskAnalysis.riskLevel}
                                </div>
                                <p className="text-xs mt-1">{riskAnalysis.reasoning}</p>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Manual Actions</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                        <Mail className="h-4 w-4 mr-2" />
                        Send Invoice
                    </Button>
                    <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50">
                        Cancel Order
                    </Button>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
