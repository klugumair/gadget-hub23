import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./contexts/CartContext";
import ScrollToTop from "./components/ScrollToTop";
import Index from "./pages/Index";
import Phones from "./pages/Phones";
import NewPhones from "./pages/NewPhones";
import UsedPhones from "./pages/UsedPhones";
import BrandDetail from "./pages/BrandDetail";
import SamsungProducts from "./pages/SamsungProducts";
import UsedSamsungProducts from "./pages/UsedSamsungProducts";
import SamsungGalaxyA06 from "./pages/SamsungGalaxyA06";
import SamsungGalaxyA25 from "./pages/SamsungGalaxyA25";
import SamsungGalaxyA16 from "./pages/SamsungGalaxyA16";
import SamsungGalaxyA56 from "./pages/SamsungGalaxyA56";
import SamsungGalaxyS21FE128 from "./pages/SamsungGalaxyS21FE128";
import SamsungGalaxyS21FE256 from "./pages/SamsungGalaxyS21FE256";
import SamsungGalaxyS23FE from "./pages/SamsungGalaxyS23FE";
import SamsungGalaxyS23Ultra from "./pages/SamsungGalaxyS23Ultra";
import SamsungGalaxyS24FE from "./pages/SamsungGalaxyS24FE";
import SamsungGalaxyS24Ultra from "./pages/SamsungGalaxyS24Ultra";
import Covers from "./pages/Covers";
import Headphones from "./pages/Headphones";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import RepairingService from "./pages/RepairingService";
import NotFound from "./pages/NotFound";
import IPhoneProducts from "./pages/IPhoneProducts";
import IPhone11_64GB from "./pages/IPhone11_64GB";
import IPhone11ProMax256GB from "./pages/IPhone11ProMax256GB";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/phones" element={<Phones />} />
            <Route path="/phones/new" element={<NewPhones />} />
            <Route path="/phones/used" element={<UsedPhones />} />
            <Route path="/phones/new/samsung" element={<SamsungProducts />} />
            <Route path="/phones/used/samsung" element={<UsedSamsungProducts />} />
            <Route path="/phones/new/iphone" element={<IPhoneProducts />} />
            <Route path="/phones/:category/:brand" element={<BrandDetail />} />
            <Route path="/phones/new/samsung/galaxy-a06" element={<SamsungGalaxyA06 />} />
            <Route path="/phones/new/samsung/galaxy-a25-5g" element={<SamsungGalaxyA25 />} />
            <Route path="/phones/new/samsung/galaxy-a16" element={<SamsungGalaxyA16 />} />
            <Route path="/phones/new/samsung/galaxy-a56" element={<SamsungGalaxyA56 />} />
            <Route path="/phones/new/samsung/galaxy-s21-fe-128gb" element={<SamsungGalaxyS21FE128 />} />
            <Route path="/phones/new/samsung/galaxy-s21-fe-256gb" element={<SamsungGalaxyS21FE256 />} />
            <Route path="/phones/new/samsung/galaxy-s23-fe" element={<SamsungGalaxyS23FE />} />
            <Route path="/phones/new/samsung/galaxy-s23-ultra" element={<SamsungGalaxyS23Ultra />} />
            <Route path="/phones/new/samsung/galaxy-s24-fe" element={<SamsungGalaxyS24FE />} />
            <Route path="/phones/new/samsung/galaxy-s24-ultra" element={<SamsungGalaxyS24Ultra />} />
            <Route path="/phones/new/iphone/iphone-11-64gb" element={<IPhone11_64GB />} />
            <Route path="/phones/new/iphone/iphone-11-pro-max-256gb" element={<IPhone11ProMax256GB />} />
            <Route path="/covers" element={<Covers />} />
            <Route path="/headphones" element={<Headphones />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/repairing-service" element={<RepairingService />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
