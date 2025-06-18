import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header'; // Custom component
import OrderStatusStepper, { Step, StepStatus } from '@/components/OrderStatusStepper'; // Custom component
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Package, Receipt, MessageSquare, ChevronLeft } from 'lucide-react';

// Sample order data - in a real app, this would be fetched
interface OrderDetails {
  orderId: string;
  items: Array<{ name: string; quantity: number; price: number }>;
  totalAmount: number;
  estimatedDelivery: string;
  deliveryAddress: string;
  currentStepId: string; // 'confirmed', 'preparing', 'outForDelivery', 'delivered'
  statusHistory?: Array<{ status: string, timestamp: string }>;
}

const sampleOrder: OrderDetails = {
  orderId: 'new-order-123',
  items: [
    { name: 'Margherita Pizza', quantity: 1, price: 12.99 },
    { name: 'Garlic Bread', quantity: 2, price: 5.99 },
  ],
  totalAmount: 24.97,
  estimatedDelivery: '4:30 PM - 4:45 PM',
  deliveryAddress: '123 Main St, Anytown, USA',
  currentStepId: 'preparing', // Start at 'preparing' for demo
  statusHistory: [
      { status: "Order Confirmed", timestamp: "3:45 PM, Today"},
      { status: "Payment Successful", timestamp: "3:44 PM, Today"},
  ]
};

const orderSteps: Step[] = [
  { id: 'confirmed', name: 'Order Confirmed', description: 'We have received your order.' },
  { id: 'preparing', name: 'Preparing Food', description: 'The restaurant is preparing your meal.' },
  { id: 'outForDelivery', name: 'Out for Delivery', description: 'Your order is on its way.' },
  { id: 'delivered', name: 'Delivered', description: 'Enjoy your meal!' },
];

const OrderTrackingPage = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  console.log('OrderTrackingPage loaded for order:', orderId);

  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(sampleOrder); // Initialize with sample for now
  const [stepStatuses, setStepStatuses] = useState<Record<string, StepStatus>>({});

  useEffect(() => {
    // Simulate fetching order details based on orderId
    // For now, we use sampleOrder if orderId matches, or null otherwise
    if (orderId === sampleOrder.orderId) {
      setOrderDetails(sampleOrder);
    } else {
      setOrderDetails(null); // Or fetch actual data
      console.warn("Could not find order details for: ", orderId)
    }
  }, [orderId]);

  useEffect(() => {
    if (orderDetails) {
      const currentStepIndex = orderSteps.findIndex(step => step.id === orderDetails.currentStepId);
      const newStatuses: Record<string, StepStatus> = {};
      orderSteps.forEach((step, index) => {
        if (index < currentStepIndex) {
          newStatuses[step.id] = StepStatus.Completed;
        } else if (index === currentStepIndex) {
          newStatuses[step.id] = StepStatus.InProgress;
        } else {
          newStatuses[step.id] = StepStatus.Pending;
        }
      });
      setStepStatuses(newStatuses);
    }
  }, [orderDetails]);


  if (!orderDetails) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8 text-center">
          <p>Loading order details or order not found...</p>
          <Button onClick={() => navigate('/')} className="mt-4">Go to Homepage</Button>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header cartItemCount={0} /> {/* Assuming cart is empty after order */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <Button variant="outline" onClick={() => navigate('/profile')} className="mb-6"> {/* Or navigate(-1) or specific previous page */}
          <ChevronLeft className="mr-2 h-4 w-4" /> Back to Profile/Orders
        </Button>

        <Card className="shadow-xl mb-8">
          <CardHeader>
            <CardTitle className="text-2xl md:text-3xl font-bold flex items-center">
              <Package className="mr-3 h-8 w-8 text-orange-600" /> Order Tracking
            </CardTitle>
            <CardDescription>Order ID: {orderDetails.orderId} | Estimated Delivery: {orderDetails.estimatedDelivery}</CardDescription>
          </CardHeader>
          <CardContent className="pt-6 pb-8 px-4 md:px-8">
            <OrderStatusStepper
              steps={orderSteps}
              currentStepId={orderDetails.currentStepId}
              stepStatuses={stepStatuses}
              orientation="horizontal"
            />
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[200px] pr-3">
                <ul className="space-y-2">
                  {orderDetails.items.map(item => (
                    <li key={item.name} className="flex justify-between">
                      <span>{item.name} (x{item.quantity})</span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
              </ScrollArea>
              <div className="mt-4 pt-4 border-t">
                <p className="flex justify-between font-semibold">
                  <span>Total Amount:</span>
                  <span>${orderDetails.totalAmount.toFixed(2)}</span>
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Delivering to: {orderDetails.deliveryAddress}
                </p>
              </div>
              <div className="mt-6 flex gap-2">
                <Button variant="outline" className="w-full">
                  <Receipt className="mr-2 h-4 w-4" /> View Receipt
                </Button>
                <Button variant="outline" className="w-full">
                  <MessageSquare className="mr-2 h-4 w-4" /> Contact Support
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Order History & Updates</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible defaultValue="item-1">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Live Updates</AccordionTrigger>
                  <AccordionContent>
                    <ScrollArea className="h-[150px] pr-3">
                      <ul className="space-y-3 text-sm">
                        {/* Mock updates based on currentStepId */}
                        {stepStatuses[orderSteps[3].id] === StepStatus.InProgress && <li><span className="font-semibold text-green-600">Delivered!</span> - Enjoy your meal. ({new Date().toLocaleTimeString()})</li>}
                        {stepStatuses[orderSteps[2].id] === StepStatus.InProgress && <li>Driver is near your location. ({new Date().toLocaleTimeString()})</li>}
                        {stepStatuses[orderSteps[1].id] === StepStatus.InProgress && <li>Restaurant is putting the final touches on your order. ({new Date().toLocaleTimeString()})</li>}
                        {orderDetails.statusHistory?.map(update => (
                            <li key={update.timestamp}>{update.status} ({update.timestamp})</li>
                        ))}
                        <li>Order placed successfully. Awaiting confirmation. (3:40 PM, Today)</li>
                      </ul>
                    </ScrollArea>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Past Orders (Placeholder)</AccordionTrigger>
                  <AccordionContent>
                    This section would list previous orders. For now, it's a placeholder.
                    You can view your full order history in your profile.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default OrderTrackingPage;