import React from 'react';
import Header from '@/components/layout/Header'; // Custom component
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form"; // Shadcn Form
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"; // Label might be used outside FormField
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { User, MapPin, CreditCard, ShoppingBag, LogOut, Edit3 } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from 'react-router-dom';


const profileFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  phone: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const UserProfilePage = () => {
  console.log('UserProfilePage loaded');
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: "John Doe", // Placeholder
      email: "john.doe@example.com", // Placeholder
      phone: "123-456-7890", // Placeholder
    },
    mode: "onChange",
  });

  function onSubmit(data: ProfileFormValues) {
    console.log("Profile updated:", data);
    toast({
      title: "Profile Updated",
      description: "Your personal information has been saved.",
    });
  }
  
  const handleLogout = () => {
      console.log("User logging out");
      toast({ title: "Logged Out", description: "You have been successfully logged out."});
      // Add actual logout logic here (e.g., clear tokens, redirect to login)
      navigate('/'); // Redirect to homepage after logout
  }

  // Placeholder data for addresses, payment methods, order history
  const savedAddresses = [
    { id: 'addr1', type: 'Home', address: '123 Main St, Anytown, USA', default: true },
    { id: 'addr2', type: 'Work', address: '456 Business Rd, Workcity, USA', default: false },
  ];
  const paymentMethods = [
    { id: 'pay1', type: 'Visa', last4: '•••• 1234', expiry: '12/25', default: true },
    { id: 'pay2', type: 'Mastercard', last4: '•••• 5678', expiry: '10/26', default: false },
  ];
  const orderHistory = [
    { id: 'order123', date: '2024-07-20', total: 25.99, status: 'Delivered', items: 2 },
    { id: 'order456', date: '2024-07-15', total: 15.50, status: 'Delivered', items: 1 },
    { id: 'order789', date: '2024-07-10', total: 32.00, status: 'Cancelled', items: 3 },
  ];


  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header cartItemCount={0} /> {/* Assuming cart is managed elsewhere or empty */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <Avatar className="h-20 w-20 mr-6 border-2 border-orange-500">
            <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop" alt="User Avatar" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold">{form.getValues("name")}</h1>
            <p className="text-gray-600">{form.getValues("email")}</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column: Navigation or Quick Links (Optional) */}
          {/* This could be a Nav component or simple buttons */}

          {/* Main Content Area */}
          <div className="lg:col-span-3 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center"><User className="mr-2 h-5 w-5 text-orange-600" /> Personal Information</CardTitle>
                <CardDescription>Manage your name, email, and phone number.</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your full name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="your.email@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number (Optional)</FormLabel>
                          <FormControl>
                            <Input type="tel" placeholder="Your phone number" {...field} />
                          </FormControl>
                          <FormDescription>Used for delivery updates and support.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="bg-orange-600 hover:bg-orange-700">Save Changes</Button>
                  </form>
                </Form>
              </CardContent>
            </Card>

            <Separator />

            <Accordion type="multiple" className="w-full space-y-1">
              <Card>
                <AccordionItem value="addresses">
                  <AccordionTrigger className="px-6 py-4 hover:no-underline">
                    <div className="flex items-center text-lg font-semibold">
                        <MapPin className="mr-3 h-5 w-5 text-orange-600" /> Saved Addresses
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4">
                    {savedAddresses.map(addr => (
                      <div key={addr.id} className="p-3 border rounded-md mb-2 flex justify-between items-center">
                        <div>
                          <p className="font-medium">{addr.type} {addr.default && <Badge variant="outline" className="ml-2">Default</Badge>}</p>
                          <p className="text-sm text-gray-600">{addr.address}</p>
                        </div>
                        <Button variant="ghost" size="icon"><Edit3 className="h-4 w-4"/></Button>
                      </div>
                    ))}
                    <Button variant="outline" className="mt-2 w-full">Add New Address</Button>
                  </AccordionContent>
                </AccordionItem>
              </Card>

              <Card>
                <AccordionItem value="payment-methods">
                  <AccordionTrigger className="px-6 py-4 hover:no-underline">
                     <div className="flex items-center text-lg font-semibold">
                        <CreditCard className="mr-3 h-5 w-5 text-orange-600" /> Payment Methods
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4">
                    {paymentMethods.map(pm => (
                      <div key={pm.id} className="p-3 border rounded-md mb-2 flex justify-between items-center">
                        <div>
                          <p className="font-medium">{pm.type} ending in {pm.last4} {pm.default && <Badge variant="outline" className="ml-2">Default</Badge>}</p>
                          <p className="text-sm text-gray-600">Expires: {pm.expiry}</p>
                        </div>
                        <Button variant="ghost" size="icon"><Edit3 className="h-4 w-4"/></Button>
                      </div>
                    ))}
                    <Button variant="outline" className="mt-2 w-full">Add New Payment Method</Button>
                  </AccordionContent>
                </AccordionItem>
              </Card>

              <Card>
                <AccordionItem value="order-history">
                  <AccordionTrigger className="px-6 py-4 hover:no-underline">
                    <div className="flex items-center text-lg font-semibold">
                        <ShoppingBag className="mr-3 h-5 w-5 text-orange-600" /> Order History
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4">
                    <ScrollArea className="h-[200px] pr-3">
                      {orderHistory.map(order => (
                        <Card key={order.id} className="mb-3">
                            <CardContent className="p-4">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="font-semibold">Order ID: {order.id}</p>
                                        <p className="text-sm text-gray-500">Date: {order.date} | Items: {order.items}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-semibold">${order.total.toFixed(2)}</p>
                                        <Badge variant={order.status === 'Delivered' ? 'default' : (order.status === 'Cancelled' ? 'destructive' : 'secondary')}
                                               className={order.status === 'Delivered' ? 'bg-green-500' : ''}>
                                            {order.status}
                                        </Badge>
                                    </div>
                                </div>
                                <Button variant="link" size="sm" className="px-0 mt-1" onClick={() => navigate(`/order-tracking/${order.id}`)}>View Details</Button>
                            </CardContent>
                        </Card>
                      ))}
                    </ScrollArea>
                    {orderHistory.length === 0 && <p>No orders found.</p>}
                  </AccordionContent>
                </AccordionItem>
              </Card>
            </Accordion>
            
            <Separator />

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center"><LogOut className="mr-2 h-5 w-5 text-red-600"/> Account Actions</CardTitle>
                </CardHeader>
                <CardContent>
                    <Button variant="destructive" onClick={handleLogout} className="w-full sm:w-auto">
                        Log Out
                    </Button>
                </CardContent>
            </Card>

          </div>
        </div>
      </main>
    </div>
  );
};

export default UserProfilePage;