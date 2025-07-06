import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";
import ScrollToTop from "@/components/ScrollToTop";
import TawkToWidget from "@/components/TawkToWidget";

// Pages
import Index from "./pages/Index";
import Profile from "./pages/Profile";
import Phones from "./pages/Phones";
import Headphones from "./pages/Headphones";
import Covers from "./pages/Covers";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import NewPhones from "./pages/NewPhones";
import UsedPhones from "./pages/UsedPhones";
import SamsungProducts from "./pages/SamsungProducts";
import IPhoneProducts from "./pages/IPhoneProducts";
import InfinixProducts from "./pages/InfinixProducts";
import GooglePixelProducts from "./pages/GooglePixelProducts";
import RealmeProducts from "./pages/RealmeProducts";
import SparkXProducts from "./pages/SparkXProducts";
import TecnoProducts from "./pages/TecnoProducts";
import VivoProducts from "./pages/VivoProducts";
import RedmiProducts from "./pages/RedmiProducts";
import HonorProducts from "./pages/HonorProducts";
import OppoProducts from "./pages/OppoProducts";
import ItelProducts from "./pages/ItelProducts";
import HuaweiProducts from "./pages/HuaweiProducts";
import AdminPhoneSubmissions from "./pages/AdminPhoneSubmissions";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CartProvider>
          <TooltipProvider>
            <Toaster />
            <BrowserRouter>
              <ScrollToTop />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/phones" element={<Phones />} />
                <Route path="/headphones" element={<Headphones />} />
                <Route path="/covers" element={<Covers />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                
                {/* Admin Routes */}
                <Route path="/admin/phone-submissions" element={<AdminPhoneSubmissions />} />
                
                <Route path="/phones/new" element={<NewPhones />} />
                <Route path="/phones/used" element={<UsedPhones />} />
                
                {/* New Phone Brand Routes */}
                <Route path="/phones/new/samsung" element={<SamsungProducts />} />
                <Route path="/phones/new/iphone" element={<IPhoneProducts />} />
                <Route path="/phones/new/infinix" element={<InfinixProducts />} />
                <Route path="/phones/new/google-pixel" element={<GooglePixelProducts />} />
                <Route path="/phones/new/realme" element={<RealmeProducts />} />
                <Route path="/phones/new/sparkx" element={<SparkXProducts />} />
                <Route path="/phones/new/tecno" element={<TecnoProducts />} />
                <Route path="/phones/new/vivo" element={<VivoProducts />} />
                <Route path="/phones/new/redmi" element={<RedmiProducts />} />
                <Route path="/phones/new/honor" element={<HonorProducts />} />
                <Route path="/phones/new/oppo" element={<OppoProducts />} />
                <Route path="/phones/new/itel" element={<ItelProducts />} />
                <Route path="/phones/new/huawei" element={<HuaweiProducts />} />
              </Routes>
              <TawkToWidget />
            </BrowserRouter>
          </TooltipProvider>
        </CartProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
