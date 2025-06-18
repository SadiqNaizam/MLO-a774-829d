import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header'; // Custom component
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import MenuItemComponent, { MenuItemProps } from "@/components/MenuItemComponent"; // Custom component
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Star, Clock, ShoppingCart, ChevronLeft } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast"; // For "Item added to cart"

// Placeholder Data (in a real app, this would be fetched)
interface RestaurantDetails {
  id: string;
  name: string;
  imageUrl: string;
  cuisine: string;
  rating: number;
  deliveryTime: string;
  address: string;
  menu: MenuItemProps[];
}

const placeholderRestaurantData: Record<string, RestaurantDetails> = {
  '1': {
    id: '1', name: 'The Pizza Place', imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=800&auto=format&fit=crop',
    cuisine: 'Italian', rating: 4.5, deliveryTime: '25-35 min', address: '123 Pizza St, Foodville',
    menu: [
      { id: 'm1', name: 'Margherita Pizza', description: 'Classic cheese and tomato pizza.', price: 12.99, imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=400&auto=format&fit=crop', category: 'Pizza', tags: ['Vegetarian', 'Classic'], onAddToCart: () => {} },
      { id: 'm2', name: 'Pepperoni Pizza', description: 'Pizza with spicy pepperoni slices.', price: 14.99, imageUrl: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?q=80&w=400&auto=format&fit=crop', category: 'Pizza', tags: ['Popular'], onAddToCart: () => {} },
      { id: 'm3', name: 'Garlic Bread', description: 'Toasted bread with garlic butter.', price: 5.99, category: 'Sides', onAddToCart: () => {} },
    ]
  },
  // Add more restaurants if needed for testing different IDs
};

const RestaurantMenuPage = () => {
  console.log('RestaurantMenuPage loaded');
  const { id: restaurantId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [restaurant, setRestaurant] = useState<RestaurantDetails | null>(null);
  const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItemProps | null>(null);
  const [isItemDetailDialogOpen, setIsItemDetailDialogOpen] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0); // Example cart count

  useEffect(() => {
    // Simulate fetching restaurant data
    if (restaurantId && placeholderRestaurantData[restaurantId]) {
      setRestaurant(placeholderRestaurantData[restaurantId]);
    } else {
      // Handle restaurant not found, maybe redirect
      console.error("Restaurant not found");
      // navigate('/404'); // Or some other handling
    }
  }, [restaurantId, navigate]);

  const handleAddToCart = (item: MenuItemProps) => {
    console.log('Added to cart:', item);
    setCartItemCount(prev => prev + 1); // Update local cart count for Header
    toast({
      title: "Item Added!",
      description: `${item.name} has been added to your cart.`,
    });
    // Actual cart logic would go here (e.g., update context/store)
  };

  const handleViewDetails = (item: MenuItemProps) => {
    setSelectedMenuItem(item);
    setIsItemDetailDialogOpen(true);
  };

  if (!restaurant) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header cartItemCount={cartItemCount} />
        <div className="flex-grow container mx-auto px-4 py-8 text-center">Loading restaurant details...</div>
      </div>
    );
  }

  // Assign the actual onAddToCart and onViewDetails to menu items
  const menuWithActions = restaurant.menu.map(item => ({
    ...item,
    onAddToCart: handleAddToCart,
    onViewDetails: handleViewDetails,
  }));

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header cartItemCount={cartItemCount} />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Button variant="outline" onClick={() => navigate(-1)} className="mb-6">
          <ChevronLeft className="mr-2 h-4 w-4" /> Back to Restaurants
        </Button>

        {/* Restaurant Info Section */}
        <section className="mb-8 p-6 bg-white rounded-lg shadow-md flex flex-col md:flex-row items-center gap-6">
          <Avatar className="h-24 w-24 md:h-32 md:w-32 border-2 border-orange-500">
            <AvatarImage src={restaurant.imageUrl || '/placeholder-restaurant.jpg'} alt={restaurant.name} />
            <AvatarFallback>{restaurant.name.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold mb-2">{restaurant.name}</h1>
            <p className="text-gray-600 mb-1">{restaurant.cuisine}</p>
            <div className="flex items-center justify-center md:justify-start gap-4 mb-2">
              <Badge variant="default" className="bg-green-500 hover:bg-green-600">
                <Star className="mr-1 h-4 w-4" /> {restaurant.rating.toFixed(1)}
              </Badge>
              <Badge variant="secondary">
                <Clock className="mr-1 h-4 w-4" /> {restaurant.deliveryTime}
              </Badge>
            </div>
            <p className="text-sm text-gray-500">{restaurant.address}</p>
          </div>
        </section>

        <Separator className="my-8" />

        {/* Menu Items Section */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">Menu</h2>
          <ScrollArea className="h-[calc(100vh-400px)]"> {/* Adjust height as needed */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {menuWithActions.map(item => (
                <MenuItemComponent key={item.id} {...item} />
              ))}
            </div>
          </ScrollArea>
        </section>

        {/* Item Detail Dialog (example) */}
        {selectedMenuItem && (
          <Dialog open={isItemDetailDialogOpen} onOpenChange={setIsItemDetailDialogOpen}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>{selectedMenuItem.name}</DialogTitle>
                {selectedMenuItem.imageUrl && <img src={selectedMenuItem.imageUrl} alt={selectedMenuItem.name} className="my-4 rounded-md max-h-60 object-contain mx-auto"/>}
                <DialogDescription>
                  {selectedMenuItem.description || "No additional details available."}
                </DialogDescription>
              </DialogHeader>
              <div className="py-2">
                <p className="text-lg font-semibold">Price: ${selectedMenuItem.price.toFixed(2)}</p>
                {/* Add customization options here if needed: RadioGroup, Checkbox, etc. */}
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsItemDetailDialogOpen(false)}>Close</Button>
                <Button onClick={() => {
                  handleAddToCart(selectedMenuItem);
                  setIsItemDetailDialogOpen(false);
                }}>
                  <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </main>
    </div>
  );
};

export default RestaurantMenuPage;