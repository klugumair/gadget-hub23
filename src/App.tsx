import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";
import LoadingSpinner from "@/components/LoadingSpinner";

const Index = lazy(() => import("./pages/Index"));
const Phones = lazy(() => import("./pages/Phones"));
const NewPhones = lazy(() => import("./pages/NewPhones"));
const UsedPhones = lazy(() => import("./pages/UsedPhones"));
const Headphones = lazy(() => import("./pages/Headphones"));
const Covers = lazy(() => import("./pages/Covers"));
const IPhoneProducts = lazy(() => import("./pages/IPhoneProducts"));
const SamsungProducts = lazy(() => import("./pages/SamsungProducts"));
const GooglePixelProducts = lazy(() => import("./pages/GooglePixelProducts"));
const InfinixProducts = lazy(() => import("./pages/InfinixProducts"));
const RealmeProducts = lazy(() => import("./pages/RealmeProducts"));
const SparkXProducts = lazy(() => import("./pages/SparkXProducts"));
const TecnoProducts = lazy(() => import("./pages/TecnoProducts"));
const VivoProducts = lazy(() => import("./pages/VivoProducts"));
const RedmiProducts = lazy(() => import("./pages/RedmiProducts"));
const HonorProducts = lazy(() => import("./pages/HonorProducts"));
const OppoProducts = lazy(() => import("./pages/OppoProducts"));
const ItelProducts = lazy(() => import("./pages/ItelProducts"));
const HuaweiProducts = lazy(() => import("./pages/HuaweiProducts"));
const UsedIPhoneProducts = lazy(() => import("./pages/UsedIPhoneProducts"));
const UsedSamsungProducts = lazy(() => import("./pages/UsedSamsungProducts"));
const UsedGooglePixelProducts = lazy(() => import("./pages/UsedGooglePixelProducts"));
const UsedInfinixProducts = lazy(() => import("./pages/UsedInfinixProducts"));
const UsedRealmeProducts = lazy(() => import("./pages/UsedRealmeProducts"));
const UsedSparkXProducts = lazy(() => import("./pages/UsedSparkXProducts"));
const UsedTecnoProducts = lazy(() => import("./pages/UsedTecnoProducts"));
const UsedVivoProducts = lazy(() => import("./pages/UsedVivoProducts"));
const UsedRedmiProducts = lazy(() => import("./pages/UsedRedmiProducts"));
const UsedHonorProducts = lazy(() => import("./pages/UsedHonorProducts"));
const UsedOppoProducts = lazy(() => import("./pages/UsedOppoProducts"));
const UsedItelProducts = lazy(() => import("./pages/UsedItelProducts"));
const UsedHuaweiProducts = lazy(() => import("./pages/UsedHuaweiProducts"));
const IPhone11 = lazy(() => import("./pages/IPhone11"));
const IPhone11Pro = lazy(() => import("./pages/IPhone11Pro"));
const IPhone11ProMax256GB = lazy(() => import("./pages/IPhone11ProMax256GB"));
const IPhone11_64GB = lazy(() => import("./pages/IPhone11_64GB"));
const IPhone12 = lazy(() => import("./pages/IPhone12"));
const IPhone12Mini = lazy(() => import("./pages/IPhone12Mini"));
const IPhone12Pro = lazy(() => import("./pages/IPhone12Pro"));
const IPhone12ProMax = lazy(() => import("./pages/IPhone12ProMax"));
const IPhone13 = lazy(() => import("./pages/IPhone13"));
const Cart = lazy(() => import("./pages/Cart"));
const Profile = lazy(() => import("./pages/Profile"));
const SellSamsungPhone = lazy(() => import("./pages/SellSamsungPhone"));
const SellIPhonePhone = lazy(() => import("./pages/SellIPhonePhone"));
const SellGooglePixelPhone = lazy(() => import("./pages/SellGooglePixelPhone"));
const SellInfinixPhone = lazy(() => import("./pages/SellInfinixPhone"));
const SellRealmePhone = lazy(() => import("./pages/SellRealmePhone"));
const SellSparkXPhone = lazy(() => import("./pages/SellSparkXPhone"));
const SellTecnoPhone = lazy(() => import("./pages/SellTecnoPhone"));
const SellVivoPhone = lazy(() => import("./pages/SellVivoPhone"));
const SellRedmiPhone = lazy(() => import("./pages/SellRedmiPhone"));
const SellHonorPhone = lazy(() => import("./pages/SellHonorPhone"));
const SellOppoPhone = lazy(() => import("./pages/SellOppoPhone"));
const SellItelPhone = lazy(() => import("./pages/SellItelPhone"));
const SellHuaweiPhone = lazy(() => import("./pages/SellHuaweiPhone"));

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CartProvider>
          <Router>
            <div className="App">
              <Suspense fallback={<LoadingSpinner />}>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/phones" element={<Phones />} />
                  <Route path="/phones/new" element={<NewPhones />} />
                  <Route path="/phones/used" element={<UsedPhones />} />
                  <Route path="/headphones" element={<Headphones />} />
                  <Route path="/covers" element={<Covers />} />
                  <Route path="/phones/new/iphone" element={<IPhoneProducts />} />
                  <Route path="/phones/new/samsung" element={<SamsungProducts />} />
                  <Route path="/phones/new/google-pixel" element={<GooglePixelProducts />} />
                  <Route path="/phones/new/infinix" element={<InfinixProducts />} />
                  <Route path="/phones/new/realme" element={<RealmeProducts />} />
                  <Route path="/phones/new/sparkx" element={<SparkXProducts />} />
                  <Route path="/phones/new/tecno" element={<TecnoProducts />} />
                  <Route path="/phones/new/vivo" element={<VivoProducts />} />
                  <Route path="/phones/new/redmi" element={<RedmiProducts />} />
                  <Route path="/phones/new/honor" element={<HonorProducts />} />
                  <Route path="/phones/new/oppo" element={<OppoProducts />} />
                  <Route path="/phones/new/itel" element={<ItelProducts />} />
                  <Route path="/phones/new/huawei" element={<HuaweiProducts />} />
                  <Route path="/phones/used/iphone" element={<UsedIPhoneProducts />} />
                  <Route path="/phones/used/samsung" element={<UsedSamsungProducts />} />
                  <Route path="/phones/used/google-pixel" element={<UsedGooglePixelProducts />} />
                  <Route path="/phones/used/infinix" element={<UsedInfinixProducts />} />
                  <Route path="/phones/used/realme" element={<UsedRealmeProducts />} />
                  <Route path="/phones/used/sparkx" element={<UsedSparkXProducts />} />
                  <Route path="/phones/used/tecno" element={<UsedTecnoProducts />} />
                  <Route path="/phones/used/vivo" element={<UsedVivoProducts />} />
                  <Route path="/phones/used/redmi" element={<UsedRedmiProducts />} />
                  <Route path="/phones/used/honor" element={<UsedHonorProducts />} />
                  <Route path="/phones/used/oppo" element={<UsedOppoProducts />} />
                  <Route path="/phones/used/itel" element={<UsedItelProducts />} />
                  <Route path="/phones/used/huawei" element={<UsedHuaweiProducts />} />
                  <Route path="/phones/new/iphone/iphone-11" element={<IPhone11 />} />
                  <Route path="/phones/new/iphone/iphone-11-pro" element={<IPhone11Pro />} />
                  <Route path="/phones/new/iphone/iphone-11-pro-max-256gb" element={<IPhone11ProMax256GB />} />
                  <Route path="/phones/new/iphone/iphone-11-64gb" element={<IPhone11_64GB />} />
                  <Route path="/phones/new/iphone/iphone-12" element={<IPhone12 />} />
                  <Route path="/phones/new/iphone/iphone-12-mini" element={<IPhone12Mini />} />
                  <Route path="/phones/new/iphone/iphone-12-pro" element={<IPhone12Pro />} />
                  <Route path="/phones/new/iphone/iphone-12-pro-max" element={<IPhone12ProMax />} />
                  <Route path="/phones/new/iphone/iphone-13" element={<IPhone13 />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/sell-samsung-phone" element={<SellSamsungPhone />} />
                  <Route path="/sell-iphone-phone" element={<SellIPhonePhone />} />
                  <Route path="/sell-google-pixel-phone" element={<SellGooglePixelPhone />} />
                  <Route path="/sell-infinix-phone" element={<SellInfinixPhone />} />
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
              </Suspense>
              <Toaster />
            </div>
          </Router>
        </CartProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
