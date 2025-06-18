import React from 'react';
import { useNavigate } from 'react-router-dom';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Input } from "@/components/ui/input";
import Carousel from "@/components/Carousel"; // Custom component
import RestaurantCard, { RestaurantCardProps } from "@/components/RestaurantCard"; // Custom component
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Search, Filter } from 'lucide-react';

const placeholderCarouselSlides = [
  { id: 'promo1', imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1920&auto=format&fit=crop', altText: 'Delicious Food Offer', title: 'Get 20% Off Your First Order!' },
  { id: 'promo2', imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1920&auto=format&fit=crop', altText: 'New Restaurant Spotlight', title: 'Explore New Cuisines' },
  { id: 'promo3', imageUrl: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1920&auto=format&fit=crop', altText: 'Weekend Special', title: 'Weekend Feast Deals' },
];

const placeholderRestaurants: RestaurantCardProps[] = [
  { id: '1', name: 'The Pizza Place', imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=800&auto=format&fit=crop', cuisine: 'Italian', rating: 4.5, deliveryTime: '25-35 min', priceRange: '$$', tags: ['Popular', 'Pizza'] },
  { id: '2', name: 'Burger Hub', imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800&auto=format&fit=crop', cuisine: 'American', rating: 4.2, deliveryTime: '20-30 min', priceRange: '$$', tags: ['New', 'Fast Food'] },
  { id: '3', name: 'Sushi Central', imageUrl: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=800&auto=format&fit=crop', cuisine: 'Japanese', rating: 4.8, deliveryTime: '30-40 min', priceRange: '$$$', tags: ['Authentic'] },
  { id: '4', name: 'Curry Kingdom', imageUrl: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=800&auto=format&fit=crop', cuisine: 'Indian', rating: 4.6, deliveryTime: '35-45 min', priceRange: '$$', tags: ['Spicy'] },
];

const cuisineCategories = ['All', 'Italian', 'American', 'Japanese', 'Indian', 'Mexican', 'Chinese'];

const HomePage = () => {
  console.log('HomePage loaded');
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('All');

  const handleRestaurantClick = (id: string | number) => {
    navigate(`/restaurant/${id}`);
  };

  const filteredRestaurants = placeholderRestaurants.filter(restaurant =>
    restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === 'All' || restaurant.cuisine.toLowerCase() === selectedCategory.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen">
      {/* Note: The problem description implies a main NavigationMenu for HomePage, not the custom Header.
          If a global Header (like src/components/layout/Header.tsx) is intended for all pages including HomePage,
          it should be added to the layout-info for HomePage or handled in App.tsx.
          Here, strictly following HomePage's component list. The custom Header component has its own search bar.
      */}

      <main className="flex-grow">
        {/* Promotional Carousel Section */}
        <section className="mb-8">
          <Carousel slides={placeholderCarouselSlides} options={{ loop: true }} aspectRatio="aspect-[21/9] md:aspect-[3/1]" />
        </section>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search and Filter Section */}
          <section className="my-6 md:my-8">
            <div className="flex flex-col md:flex-row gap-4 items-center mb-6">
              <div className="relative w-full md:flex-grow">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search for restaurants..."
                  className="pl-10 w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline" className="w-full md:w-auto">
                <Filter className="mr-2 h-4 w-4" /> Filters
              </Button>
            </div>

            {/* Cuisine Categories NavigationMenu */}
            <NavigationMenu className="justify-center mb-6">
              <NavigationMenuList className="flex-wrap">
                {cuisineCategories.map(category => (
                  <NavigationMenuItem key={category}>
                    <Button
                      variant={selectedCategory === category ? "default" : "ghost"}
                      className={`${navigationMenuTriggerStyle()} ${selectedCategory === category ? 'bg-orange-500 hover:bg-orange-600 text-white' : ''}`}
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </Button>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
             {/* Example Badge usage if needed, e.g., for "Popular" filter */}
             <div className="flex justify-center gap-2 mb-4">
                <Badge variant="secondary">Offers</Badge>
                <Badge variant="outline">Top Rated</Badge>
            </div>
          </section>

          {/* Restaurant Listing Section */}
          <section className="pb-12">
            <h2 className="text-2xl font-semibold mb-6">
              {selectedCategory === 'All' ? 'Popular Restaurants' : `${selectedCategory} Restaurants`}
            </h2>
            <ScrollArea className="h-[600px] pr-4_"> {/* Adjust height as needed */}
              {filteredRestaurants.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredRestaurants.map(restaurant => (
                    <RestaurantCard key={restaurant.id} {...restaurant} onClick={handleRestaurantClick} />
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-500 col-span-full">No restaurants found matching your criteria.</p>
              )}
            </ScrollArea>
          </section>
        </div>
      </main>
      {/* Footer can be added here if specified */}
    </div>
  );
};

export default HomePage;