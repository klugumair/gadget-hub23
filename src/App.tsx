import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./contexts/CartContext";
import { AuthProvider } from "./contexts/AuthContext";
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
import SamsungGalaxyZFold5 from "./pages/SamsungGalaxyZFold5";
import SamsungGalaxyA14 from "./pages/SamsungGalaxyA14";
import Covers from "./pages/Covers";
import Headphones from "./pages/Headphones";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import RepairingService from "./pages/RepairingService";
import NotFound from "./pages/NotFound";
import IPhoneProducts from "./pages/IPhoneProducts";
import IPhone11_64GB from "./pages/IPhone11_64GB";
import IPhone11ProMax256GB from "./pages/IPhone11ProMax256GB";
import UsedIPhoneProducts from "./pages/UsedIPhoneProducts";
import IPhone11 from "./pages/IPhone11";
import IPhone11Pro from "./pages/IPhone11Pro";
import IPhone11ProMax from "./pages/IPhone11ProMax";
import IPhone12 from "./pages/IPhone12";
import IPhone12Mini from "./pages/IPhone12Mini";
import IPhone12Pro from "./pages/IPhone12Pro";
import IPhone12ProMax from "./pages/IPhone12ProMax";
import IPhone13 from "./pages/IPhone13";
import IPhone13Mini from "./pages/IPhone13Mini";
import IPhone13Pro from "./pages/IPhone13Pro";
import IPhone13ProMax from "./pages/IPhone13ProMax";
import IPhone14 from "./pages/IPhone14";
import IPhone14Plus from "./pages/IPhone14Plus";
import IPhone14Pro from "./pages/IPhone14Pro";
import IPhone14ProMax from "./pages/IPhone14ProMax";
import IPhone15 from "./pages/IPhone15";
import IPhone15Plus from "./pages/IPhone15Plus";
import IPhone15Pro from "./pages/IPhone15Pro";
import IPhone15ProMax from "./pages/IPhone15ProMax";
import IPhone16 from "./pages/IPhone16";
import IPhone16e from "./pages/IPhone16e";
import IPhone16Plus from "./pages/IPhone16Plus";
import IPhone16Pro from "./pages/IPhone16Pro";
import IPhone16ProMax from "./pages/IPhone16ProMax";
import IPhoneXR from "./pages/IPhoneXR";
import GooglePixel8Pro from "./pages/GooglePixel8Pro";
import LuxuryLeatherCase from "./pages/LuxuryLeatherCase";
import CarbonFiberShield from "./pages/CarbonFiberShield";
import CrystalClearArmor from "./pages/CrystalClearArmor";
import AirPodsMaxGold from "./pages/AirPodsMaxGold";
import SonyWH1000XM5 from "./pages/SonyWH1000XM5";
import SennheiserMomentum4 from "./pages/SennheiserMomentum4";
import RoninR920Pro from "./pages/RoninR920Pro";
import AudionicBlueBeatBB10 from "./pages/AudionicBlueBeatBB10";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
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
              <Route path="/phones/used/iphone" element={<UsedIPhoneProducts />} />
              <Route path="/phones/:category/:brand" element={<BrandDetail />} />
              
              {/* Home Page Product Routes */}
              <Route path="/iphone-15-pro-max" element={<IPhone15ProMax />} />
              <Route path="/samsung-galaxy-s24-ultra" element={<SamsungGalaxyS24Ultra />} />
              <Route path="/google-pixel-8-pro" element={<GooglePixel8Pro />} />
              <Route path="/luxury-leather-case" element={<LuxuryLeatherCase />} />
              <Route path="/carbon-fiber-shield" element={<CarbonFiberShield />} />
              <Route path="/crystal-clear-armor" element={<CrystalClearArmor />} />
              <Route path="/airpods-max-gold" element={<AirPodsMaxGold />} />
              <Route path="/sony-wh-1000xm5" element={<SonyWH1000XM5 />} />
              <Route path="/sennheiser-momentum-4" element={<SennheiserMomentum4 />} />
              
              {/* Samsung Routes */}
              <Route path="/phones/new/samsung/galaxy-a06" element={<SamsungGalaxyA06 />} />
              <Route path="/phones/new/samsung/galaxy-a25-5g" element={<SamsungGalaxyA25 />} />
              <Route path="/phones/new/samsung/galaxy-a25" element={<SamsungGalaxyA25 />} />
              <Route path="/phones/new/samsung/galaxy-a16" element={<SamsungGalaxyA16 />} />
              <Route path="/phones/new/samsung/galaxy-a56" element={<SamsungGalaxyA56 />} />
              <Route path="/phones/new/samsung/galaxy-s21-fe-128gb" element={<SamsungGalaxyS21FE128 />} />
              <Route path="/phones/new/samsung/galaxy-s21-fe-256gb" element={<SamsungGalaxyS21FE256 />} />
              <Route path="/phones/new/samsung/galaxy-s23-fe" element={<SamsungGalaxyS23FE />} />
              <Route path="/phones/new/samsung/galaxy-s23-ultra" element={<SamsungGalaxyS23Ultra />} />
              <Route path="/phones/new/samsung/galaxy-s24-fe" element={<SamsungGalaxyS24FE />} />
              <Route path="/phones/new/samsung/galaxy-s24-ultra" element={<SamsungGalaxyS24Ultra />} />
              <Route path="/phones/new/samsung/galaxy-z-fold-5" element={<SamsungGalaxyZFold5 />} />
              <Route path="/phones/new/samsung/galaxy-a14" element={<SamsungGalaxyA14 />} />
              <Route path="/phones/new/samsung/galaxy-a15" element={<SamsungGalaxyA25 />} />
              <Route path="/phones/new/samsung/galaxy-a34-5g" element={<SamsungGalaxyA56 />} />
              <Route path="/phones/new/samsung/galaxy-a05" element={<SamsungGalaxyA06 />} />
              <Route path="/phones/new/samsung/galaxy-a05s" element={<SamsungGalaxyA06 />} />
              <Route path="/phones/new/samsung/galaxy-f14" element={<SamsungGalaxyA14 />} />
              <Route path="/phones/new/samsung/galaxy-f34" element={<SamsungGalaxyA56 />} />
              <Route path="/phones/new/samsung/galaxy-m54-5g" element={<SamsungGalaxyA56 />} />
              <Route path="/phones/new/samsung/galaxy-m34-5g" element={<SamsungGalaxyA56 />} />
              <Route path="/phones/new/samsung/galaxy-z-flip-6" element={<SamsungGalaxyZFold5 />} />
              <Route path="/phones/new/samsung/galaxy-z-fold-6" element={<SamsungGalaxyZFold5 />} />
              <Route path="/phones/new/samsung/galaxy-a05-new" element={<SamsungGalaxyA06 />} />
              <Route path="/phones/new/samsung/galaxy-s25-ultra" element={<SamsungGalaxyS24Ultra />} />
              <Route path="/phones/new/samsung/galaxy-s25" element={<SamsungGalaxyS24FE />} />
              <Route path="/phones/new/samsung/galaxy-s25-edge" element={<SamsungGalaxyS24Ultra />} />
              <Route path="/phones/new/samsung/galaxy-a26-5g" element={<SamsungGalaxyA25 />} />
              <Route path="/phones/new/samsung/galaxy-a36-5g" element={<SamsungGalaxyA56 />} />
              
              {/* iPhone Routes */}
              <Route path="/phones/new/iphone/iphone-11" element={<IPhone11 />} />
              <Route path="/phones/new/iphone/iphone-11-pro" element={<IPhone11Pro />} />
              <Route path="/phones/new/iphone/iphone-11-pro-max" element={<IPhone11ProMax />} />
              <Route path="/phones/new/iphone/iphone-12" element={<IPhone12 />} />
              <Route path="/phones/new/iphone/iphone-12-mini" element={<IPhone12Mini />} />
              <Route path="/phones/new/iphone/iphone-12-pro" element={<IPhone12Pro />} />
              <Route path="/phones/new/iphone/iphone-12-pro-max" element={<IPhone12ProMax />} />
              <Route path="/phones/new/iphone/iphone-13" element={<IPhone13 />} />
              <Route path="/phones/new/iphone/iphone-13-mini" element={<IPhone13Mini />} />
              <Route path="/phones/new/iphone/iphone-13-pro" element={<IPhone13Pro />} />
              <Route path="/phones/new/iphone/iphone-13-pro-max" element={<IPhone13ProMax />} />
              <Route path="/phones/new/iphone/iphone-14" element={<IPhone14 />} />
              <Route path="/phones/new/iphone/iphone-14-plus" element={<IPhone14Plus />} />
              <Route path="/phones/new/iphone/iphone-14-pro" element={<IPhone14Pro />} />
              <Route path="/phones/new/iphone/iphone-14-pro-max" element={<IPhone14ProMax />} />
              <Route path="/phones/new/iphone/iphone-15" element={<IPhone15 />} />
              <Route path="/phones/new/iphone/iphone-15-plus" element={<IPhone15Plus />} />
              <Route path="/phones/new/iphone/iphone-15-pro" element={<IPhone15Pro />} />
              <Route path="/phones/new/iphone/iphone-15-pro-max" element={<IPhone15ProMax />} />
              <Route path="/phones/new/iphone/iphone-16" element={<IPhone16 />} />
              <Route path="/phones/new/iphone/iphone-16e" element={<IPhone16e />} />
              <Route path="/phones/new/iphone/iphone-16-plus" element={<IPhone16Plus />} />
              <Route path="/phones/new/iphone/iphone-16-pro" element={<IPhone16Pro />} />
              <Route path="/phones/new/iphone/iphone-16-pro-max" element={<IPhone16ProMax />} />
              <Route path="/phones/new/iphone/iphone-xr" element={<IPhoneXR />} />
              <Route path="/phones/new/iphone/iphone-11-64gb" element={<IPhone11_64GB />} />
              <Route path="/phones/new/iphone/iphone-11-pro-max-256gb" element={<IPhone11ProMax256GB />} />
              
              <Route path="/covers" element={<Covers />} />
              <Route path="/headphones" element={<Headphones />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/repairing-service" element={<RepairingService />} />
              
              {/* Headphone Product Routes */}
              <Route path="/headphones/ronin/r-920-pro" element={<RoninR920Pro />} />
              <Route path="/headphones/audionic/blue-beat-bb-10" element={<AudionicBlueBeatBB10 />} />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
