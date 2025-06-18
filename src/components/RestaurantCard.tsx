import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Clock, Utensils } from 'lucide-react'; // Example icons

export interface RestaurantCardProps {
  id: string | number;
  name: string;
  imageUrl: string;
  cuisine: string;
  rating: number; // e.g., 4.5
  deliveryTime: string; // e.g., "20-30 min"
  priceRange?: string; // e.g., "$$"
  onClick?: (id: string | number) => void;
  tags?: string[];
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({
  id,
  name,
  imageUrl,
  cuisine,
  rating,
  deliveryTime,
  priceRange,
  onClick,
  tags,
}) => {
  console.log("Rendering RestaurantCard:", name);

  const handleCardClick = () => {
    if (onClick) {
      onClick(id);
    }
  };

  return (
    <Card
      className="w-full overflow-hidden transition-all duration-300 hover:shadow-xl cursor-pointer group"
      onClick={handleCardClick}
      tabIndex={0}
      onKeyPress={(e) => e.key === 'Enter' && handleCardClick()}
    >
      <CardHeader className="p-0 relative">
        <div className="aspect-video overflow-hidden">
          <img
            src={imageUrl || '/placeholder.svg'}
            alt={name}
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
            onError={(e) => (e.currentTarget.src = '/placeholder.svg')}
          />
        </div>
        {tags && tags.length > 0 && (
          <div className="absolute top-2 left-2 flex flex-wrap gap-1">
            {tags.slice(0,2).map(tag => (
              <Badge key={tag} variant="destructive" className="text-xs">{tag}</Badge>
            ))}
          </div>
        )}
      </CardHeader>
      <CardContent className="p-4 space-y-1">
        <CardTitle className="text-lg font-semibold truncate group-hover:text-orange-600">{name}</CardTitle>
        <div className="flex items-center text-sm text-gray-600">
          <Utensils className="w-4 h-4 mr-1 text-orange-500" />
          <span>{cuisine}</span>
          {priceRange && <span className="mx-1">·</span>}
          {priceRange && <span>{priceRange}</span>}
        </div>
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center">
            <Star className="w-4 h-4 mr-1 text-yellow-500 fill-yellow-500" />
            <span className="font-medium">{rating.toFixed(1)}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Clock className="w-4 h-4 mr-1" />
            <span>{deliveryTime}</span>
          </div>
        </div>
      </CardContent>
      {onClick && (
        <CardFooter className="p-4 pt-0 md:hidden"> {/* Show button on mobile, card is clickable on desktop */}
            <Button variant="outline" className="w-full" onClick={(e) => {e.stopPropagation(); handleCardClick();}}>
                View Menu
            </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default RestaurantCard;