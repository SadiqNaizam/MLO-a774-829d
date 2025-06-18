import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header'; // Custom component
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Minus, Trash2, ShoppingCart, Ticket } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
  restaurant?: string;
}

const initialCartItems: CartItem[] = [
  { id: 'm1', name: 'Margherita Pizza', price: 12.99, quantity: 1, imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=200&auto=format&fit=crop', restaurant: "The Pizza Place" },
  { id: 'm3', name: 'Garlic Bread', price: 5.99, quantity: 2, imageUrl: 'https://images.unsplash.com/photo-1592700878018-a081db678b5c?q=80&w=200&auto=format&fit=crop', restaurant: "The Pizza Place" },
  { id: 'b2', name: 'Classic Burger', price: 8.50, quantity: 1, imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=200&auto=format&fit=crop', restaurant: "Burger Hub" },
];

const CartPage = () => {
  console.log('CartPage loaded');
  const navigate = useNavigate();
  const { toast } = useToast();
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);
  const [promoCode, setPromoCode] = useState('');

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeItem(id);
    } else {
      setCartItems(items => items.map(item => item.id === id ? { ...item, quantity: newQuantity } : item));
    }
  };

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
    toast({
        title: "Item Removed",
        description: "The item has been removed from your cart.",
        variant: "destructive"
    });
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const deliveryFee = cartItems.length > 0 ? 2.99 : 0; // Example delivery fee
  const promoDiscount = promoCode === "SAVE10" ? subtotal * 0.1 : 0; // Example promo
  const total = subtotal + deliveryFee - promoDiscount;

  const handleApplyPromo = () => {
    if(promoCode === "SAVE10"){
        toast({ title: "Promo Applied!", description: "10% discount applied."});
    } else if (promoCode.length === 6 && promoCode !== "SAVE10"){
         toast({ title: "Invalid Promo Code", description: "The promo code entered is not valid.", variant: "destructive"});
    } else if (promoCode.length > 0 && promoCode.length < 6) {
         toast({ title: "Invalid Promo Code", description: "Promo code must be 6 characters.", variant: "destructive"});
    }
    // Actual promo code validation logic here
  };
  
  const handleCheckout = () => {
    // For now, just navigate to a conceptual order tracking page or show a toast
    if(cartItems.length === 0) {
      toast({ title: "Empty Cart", description: "Please add items to your cart before proceeding.", variant: "destructive" });
      return;
    }
    console.log("Proceeding to checkout with items:", cartItems, "Total:", total);
    toast({ title: "Order Placed (Simulation)", description: "Redirecting to order tracking..." });
    // In a real app, this would involve payment and then navigation to order tracking
    navigate('/order-tracking/new-order-123'); // Example order ID
  };
  
  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);


  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header cartItemCount={cartItemCount} />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold flex items-center">
              <ShoppingCart className="mr-3 h-7 w-7 text-orange-600" /> Your Shopping Cart
            </CardTitle>
            <CardDescription>Review your items and proceed to checkout.</CardDescription>
          </CardHeader>
          <CardContent>
            {cartItems.length === 0 ? (
              <div className="text-center py-10">
                <ShoppingCart className="mx-auto h-16 w-16 text-gray-400 mb-4" />
                <p className="text-xl font-semibold text-gray-700">Your cart is empty.</p>
                <p className="text-gray-500">Looks like you haven't added anything to your cart yet.</p>
                <Button onClick={() => navigate('/')} className="mt-6">Start Shopping</Button>
              </div>
            ) : (
              <>
                <ScrollArea className="h-[350px] mb-6 pr-3">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px] hidden sm:table-cell">Image</TableHead>
                        <TableHead>Item</TableHead>
                        <TableHead className="text-center">Quantity</TableHead>
                        <TableHead className="text-right">Price</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                        <TableHead className="text-center">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {cartItems.map(item => (
                        <TableRow key={item.id}>
                          <TableCell className="hidden sm:table-cell">
                            <img src={item.imageUrl || '/placeholder-food.jpg'} alt={item.name} className="h-16 w-16 object-cover rounded-md"/>
                          </TableCell>
                          <TableCell>
                            <p className="font-medium">{item.name}</p>
                            {item.restaurant && <p className="text-xs text-gray-500">{item.restaurant}</p>}
                          </TableCell>
                          <TableCell className="text-center">
                            <div className="flex items-center justify-center space-x-2">
                              <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                                <Minus className="h-4 w-4" />
                              </Button>
                              <span>{item.quantity}</span>
                              <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">${item.price.toFixed(2)}</TableCell>
                          <TableCell className="text-right font-medium">${(item.price * item.quantity).toFixed(2)}</TableCell>
                          <TableCell className="text-center">
                            <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-700" onClick={() => removeItem(item.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </ScrollArea>
                <Separator className="my-6" />
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="promo" className="text-lg font-semibold mb-2 block">Promo Code</Label>
                     <div className="flex items-center space-x-2">
                        <InputOTP maxLength={6} value={promoCode} onChange={setPromoCode}>
                            <InputOTPGroup>
                                <InputOTPSlot index={0} />
                                <InputOTPSlot index={1} />
                                <InputOTPSlot index={2} />
                                <InputOTPSlot index={3} />
                                <InputOTPSlot index={4} />
                                <InputOTPSlot index={5} />
                            </InputOTPGroup>
                        </InputOTP>
                        <Button type="button" variant="outline" onClick={handleApplyPromo} className="whitespace-nowrap">
                            <Ticket className="mr-2 h-4 w-4" /> Apply Promo
                        </Button>
                    </div>
                  </div>
                  <div className="space-y-2 text-right">
                    <div className="flex justify-between"><span>Subtotal:</span><span>${subtotal.toFixed(2)}</span></div>
                    <div className="flex justify-between"><span>Delivery Fee:</span><span>${deliveryFee.toFixed(2)}</span></div>
                    {promoDiscount > 0 && <div className="flex justify-between text-green-600"><span>Promo Discount:</span><span>-${promoDiscount.toFixed(2)}</span></div>}
                    <Separator />
                    <div className="flex justify-between text-xl font-bold"><span>Total:</span><span>${total.toFixed(2)}</span></div>
                  </div>
                </div>
              </>
            )}
          </CardContent>
          {cartItems.length > 0 && (
            <CardFooter className="border-t pt-6">
              <Button size="lg" className="w-full bg-orange-600 hover:bg-orange-700" onClick={handleCheckout}>
                Proceed to Checkout
              </Button>
            </CardFooter>
          )}
        </Card>
      </main>
    </div>
  );
};

export default CartPage;