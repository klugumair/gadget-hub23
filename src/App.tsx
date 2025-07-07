
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
import Chargers from "./pages/Chargers";

// Used Phone Pages
import UsedSamsungProducts from "./pages/UsedSamsungProducts";
import UsedIPhoneProducts from "./pages/UsedIPhoneProducts";
import UsedInfinixProducts from "./pages/UsedInfinixProducts";
import UsedGooglePixelProducts from "./pages/UsedGooglePixelProducts";
import UsedRealmeProducts from "./pages/UsedRealmeProducts";
import UsedSparkXProducts from "./pages/UsedSparkXProducts";
import UsedTecnoProducts from "./pages/UsedTecnoProducts";
import UsedVivoProducts from "./pages/UsedVivoProducts";
import UsedRedmiProducts from "./pages/UsedRedmiProducts";
import UsedHonorProducts from "./pages/UsedHonorProducts";
import UsedOppoProducts from "./pages/UsedOppoProducts";
import UsedItelProducts from "./pages/UsedItelProducts";
import UsedHuaweiProducts from "./pages/UsedHuaweiProducts";

// Sell Phone Pages
import SellSamsungPhone from "./pages/SellSamsungPhone";
import SellIPhonePhone from "./pages/SellIPhonePhone";
import SellInfinixPhone from "./pages/SellInfinixPhone";
import SellGooglePixelPhone from "./pages/SellGooglePixelPhone";
import SellRealmePhone from "./pages/SellRealmePhone";
import SellSparkXPhone from "./pages/SellSparkXPhone";
import SellTecnoPhone from "./pages/SellTecnoPhone";
import SellVivoPhone from "./pages/SellVivoPhone";
import SellRedmiPhone from "./pages/SellRedmiPhone";
import SellHonorPhone from "./pages/SellHonorPhone";
import SellOppoPhone from "./pages/SellOppoPhone";
import SellItelPhone from "./pages/SellItelPhone";
import SellHuaweiPhone from "./pages/SellHuaweiPhone";

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
                <Route path="/chargers" element={<Chargers />} />
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

                {/* Used Phone Brand Routes */}
                <Route path="/phones/used/samsung" element={<UsedSamsungProducts />} />
                <Route path="/phones/used/iphone" element={<UsedIPhoneProducts />} />
                <Route path="/phones/used/infinix" element={<UsedInfinixProducts />} />
                <Route path="/phones/used/google-pixel" element={<UsedGooglePixelProducts />} />
                <Route path="/phones/used/realme" element={<UsedRealmeProducts />} />
                <Route path="/phones/used/sparkx" element={<UsedSparkXProducts />} />
                <Route path="/phones/used/tecno" element={<UsedTecnoProducts />} />
                <Route path="/phones/used/vivo" element={<UsedVivoProducts />} />
                <Route path="/phones/used/redmi" element={<UsedRedmiProducts />} />
                <Route path="/phones/used/honor" element={<UsedHonorProducts />} />
                <Route path="/phones/used/oppo" element={<UsedOppoProducts />} />
                <Route path="/phones/used/itel" element={<UsedItelProducts />} />
                <Route path="/phones/used/huawei" element={<UsedHuaweiProducts />} />

                {/* Sell Phone Routes */}
                <Route path="/sell-samsung-phone" element={<SellSamsungPhone />} />
                <Route path="/sell-iphone-phone" element={<SellIPhonePhone />} />
                <Route path="/sell-infinix-phone" element={<SellInfinixPhone />} />
                <Route path="/sell-google-pixel-phone" element={<SellGooglePixelPhone />} />
                <Route path="/sell-realme-phone" element={<SellRealmePhone />} />
                <Route path="/sell-sparkx-phone" element={<SellSparkXPhone />} />
                <Route path="/sell-tecno-phone" element={<SellTecnoPhone />} />
                <Route path="/sell-vivo-phone" element={<SellVivoPhone />} />
                <Route path="/sell-redmi-phone" element={<SellRedmiPhone />} />
                <Route path="/sell-honor-phone" element={<SellHonorPhone />} />
                <Route path="/sell-oppo-phone" element={<SellOppoPhone />} />
                <Route path="/sell-itel-phone" element={<SellItelPhone />} />
                <Route path="/sell-huawei-phone" element={<SellHuaweiPhone />} />
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
