import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner"; // Ensure Sonner is imported if used, e.g. from MenuItemComponent's add to cart. Assuming it's needed.
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

// Page imports
import HomePage from "./pages/HomePage";
import RestaurantMenuPage from "./pages/RestaurantMenuPage";
import CartPage from "./pages/CartPage";
import OrderTrackingPage from "./pages/OrderTrackingPage";
import UserProfilePage from "./pages/UserProfilePage";
import NotFound from "./pages/NotFound"; // Assuming NotFound.tsx exists in src/pages/

// Custom Header (if it's meant to be global for some layouts)
// For this setup, Header is included per page as per layout-info.
// If a truly global layout wrapper is needed, it could be defined here.
// import Header from "@/components/layout/Header";


const queryClient = new QueryClient();

// Example Layout with Header if needed globally for some routes
// const MainLayout = () => (
//   <>
//     <Header cartItemCount={0} /> {/* Placeholder cart count */}
//     <Outlet />
//     {/* Global Footer can go here */}
//   </>
// );


const App = () => {
  console.log('App component rendered, setting up routes.');
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {/* Shadcn Toaster for useToast hook */}
        <Toaster />
        {/* Sonner for rich notifications if used */}
        <Sonner richColors position="top-right" /> 
        <BrowserRouter>
          <Routes>
            {/* Routes with specific layouts or direct component */}
            <Route path="/" element={<HomePage />} />
            <Route path="/restaurant/:id" element={<RestaurantMenuPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/order-tracking/:orderId" element={<OrderTrackingPage />} />
            <Route path="/profile" element={<UserProfilePage />} />
            
            {/* Example of using a layout wrapper if needed for a group of routes */}
            {/* <Route element={<MainLayout />}>
              <Route path="/some-other-page" element={<div>Other Page Content</div>} />
            </Route> */}

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;