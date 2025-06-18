import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, Info } from 'lucide-react';

export interface MenuItemProps {
  id: string | number;
  name: string;
  description?: string;
  price: number;
  imageUrl?: string;
  category?: string;
  tags?: string[]; // e.g., "Spicy", "Vegetarian", "Popular"
  onAddToCart: (item: MenuItemProps) => void;
  onViewDetails?: (item: MenuItemProps) => void; // Optional: for opening a detail dialog
}

const MenuItemComponent: React.FC<MenuItemProps> = (props) => {
  const { id, name, description, price, imageUrl, tags, onAddToCart, onViewDetails } = props;
  console.log("Rendering MenuItemComponent:", name);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click if button is inside
    onAddToCart(props);
  };

  const handleViewDetails = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onViewDetails) {
      onViewDetails(props);
    }
  };

  return (
    <Card className="w-full flex flex-col sm:flex-row overflow-hidden transition-shadow duration-200 hover:shadow-md">
      {imageUrl && (
        <div className="sm:w-1/3 md:w-1/4 aspect-video sm:aspect-square flex-shrink-0">
          <img
            src={imageUrl || '/placeholder.svg'}
            alt={name}
            className="object-cover w-full h-full"
            onError={(e) => (e.currentTarget.src = '/placeholder.svg')}
          />
        </div>
      )}
      <div className="flex-1 flex flex-col justify-between p-4">
        <div>
          <CardHeader className="p-0 mb-2">
            <div className="flex justify-between items-start">
              <CardTitle className="text-md font-semibold">{name}</CardTitle>
              {onViewDetails && (
                 <Button variant="ghost" size="icon" className="h-7 w-7 text-gray-500 hover:text-orange-600" onClick={handleViewDetails} aria-label="View details">
                    <Info className="h-4 w-4" />
                 </Button>
              )}
            </div>
            {tags && tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-1">
                {tags.map(tag => <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>)}
              </div>
            )}
          </CardHeader>
          {description && (
            <CardDescription className="text-xs text-gray-600 mb-2 line-clamp-2">
              {description}
            </CardDescription>
          )}
        </div>
        <CardFooter className="p-0 flex justify-between items-center mt-auto">
          <span className="text-lg font-bold text-orange-600">${price.toFixed(2)}</span>
          <Button size="sm" onClick={handleAddToCart} aria-label={`Add ${name} to cart`}>
            <PlusCircle className="h-4 w-4 mr-2" />
            Add
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
};

export default MenuItemComponent;