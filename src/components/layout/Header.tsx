import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShoppingCart, User, Menu as MenuIcon, Search } from 'lucide-react'; // Added MenuIcon and Search

interface HeaderProps {
  // Props can be added later, e.g., onSearch, onToggleMobileMenu
  cartItemCount?: number;
}

const Header: React.FC<HeaderProps> = ({ cartItemCount }) => {
  console.log("Rendering Header");

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side: Logo and Mobile Menu Toggle */}
          <div className="flex items-center">
            {/* Mobile menu button */}
            <Button variant="ghost" size="icon" className="md:hidden mr-2" aria-label="Open menu">
              <MenuIcon className="h-6 w-6" />
            </Button>
            <Link to="/" className="text-2xl font-bold text-orange-600">
              FoodApp
            </Link>
          </div>

          {/* Center: Search Bar (optional, could be on homepage primarily) */}
          <div className="hidden md:flex flex-grow max-w-xl mx-4">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="search"
                name="search"
                id="search"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                placeholder="Search restaurants or dishes..."
              />
            </div>
          </div>

          {/* Right side: Navigation and Icons */}
          <nav className="flex items-center space-x-2 sm:space-x-4">
            <Link to="/restaurants" className="hidden md:inline-block text-sm font-medium text-gray-600 hover:text-orange-600">
              Restaurants
            </Link>
            <Link to="/cart" className="relative">
              <Button variant="ghost" size="icon" aria-label="Cart">
                <ShoppingCart className="h-6 w-6" />
                {cartItemCount !== undefined && cartItemCount > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full transform translate-x-1/2 -translate-y-1/2">
                    {cartItemCount}
                  </span>
                )}
              </Button>
            </Link>
            <Link to="/profile">
              <Button variant="ghost" size="icon" aria-label="User Profile">
                <User className="h-6 w-6" />
              </Button>
            </Link>
            {/* Login/Signup Button (conditional rendering) */}
            {/* <Button variant="outline">Login</Button> */}
          </nav>
        </div>
      </div>
      {/* Mobile search (can be part of mobile menu) */}
      <div className="md:hidden px-4 pb-3 border-t border-gray-200">
         <div className="relative w-full mt-3">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="search"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
              placeholder="Search..."
            />
          </div>
      </div>
    </header>
  );
};

export default Header;