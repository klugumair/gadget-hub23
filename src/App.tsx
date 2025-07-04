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
const VIVOProducts = lazy(() => import("./pages/VIVOProducts"));
const OPPOProducts = lazy(() => import("./pages/OPPOProducts"));
const OnePlusProducts = lazy(() => import("./pages/OnePlusProducts"));
const UsedIPhoneProducts = lazy(() => import("./pages/UsedIPhoneProducts"));
const UsedSamsungProducts = lazy(() => import("./pages/UsedSamsungProducts"));
const UsedGooglePixelProducts = lazy(() => import("./pages/UsedGooglePixelProducts"));
const UsedInfinixProducts = lazy(() => import("./pages/UsedInfinixProducts"));
const UsedVIVOProducts = lazy(() => import("./pages/UsedVIVOProducts"));
const UsedOPPOProducts = lazy(() => import("./pages/UsedOPPOProducts"));
const UsedOnePlusProducts = lazy(() => import("./pages/UsedOnePlusProducts"));
const IPhone11 = lazy(() => import("./pages/IPhone11"));
const IPhone11Pro = lazy(() => import("./pages/IPhone11Pro"));
const IPhone11ProMax256GB = lazy(() => import("./pages/IPhone11ProMax256GB"));
const IPhone11_64GB = lazy(() => import("./pages/IPhone11_64GB"));
const IPhone12 = lazy(() => import("./pages/IPhone12"));
const IPhone12Mini = lazy(() => import("./pages/IPhone12Mini"));
const IPhone12Pro = lazy(() => import("./pages/IPhone12Pro"));
const IPhone12ProMax = lazy(() => import("./pages/IPhone12ProMax"));
const IPhone13 = lazy(() => import("./pages/IPhone13"));
const SubmitPhone = lazy(() => import("./pages/SubmitPhone"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const Cart = lazy(() => import("./pages/Cart"));
const Login = lazy(() => import("./pages/Login"));
const Profile = lazy(() => import("./pages/Profile"));

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
                  <Route path="/phones/new/vivo" element={<VIVOProducts />} />
                  <Route path="/phones/new/oppo" element={<OPPOProducts />} />
                  <Route path="/phones/new/oneplus" element={<OnePlusProducts />} />
                  <Route path="/phones/used/iphone" element={<UsedIPhoneProducts />} />
                  <Route path="/phones/used/samsung" element={<UsedSamsungProducts />} />
                  <Route path="/phones/used/google-pixel" element={<UsedGooglePixelProducts />} />
                  <Route path="/phones/used/infinix" element={<UsedInfinixProducts />} />
                  <Route path="/phones/used/vivo" element={<UsedVIVOProducts />} />
                  <Route path="/phones/used/oppo" element={<UsedOPPOProducts />} />
                  <Route path="/phones/used/oneplus" element={<UsedOnePlusProducts />} />
                  <Route path="/phones/new/iphone/iphone-11" element={<IPhone11 />} />
                  <Route path="/phones/new/iphone/iphone-11-pro" element={<IPhone11Pro />} />
                  <Route path="/phones/new/iphone/iphone-11-pro-max-256gb" element={<IPhone11ProMax256GB />} />
                  <Route path="/phones/new/iphone/iphone-11-64gb" element={<IPhone11_64GB />} />
                  <Route path="/phones/new/iphone/iphone-12" element={<IPhone12 />} />
                  <Route path="/phones/new/iphone/iphone-12-mini" element={<IPhone12Mini />} />
                  <Route path="/phones/new/iphone/iphone-12-pro" element={<IPhone12Pro />} />
                  <Route path="/phones/new/iphone/iphone-12-pro-max" element={<IPhone12ProMax />} />
                  <Route path="/phones/new/iphone/iphone-13" element={<IPhone13 />} />
                  <Route path="/submit-phone" element={<SubmitPhone />} />
                  <Route path="/admin-dashboard" element={<AdminDashboard />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/profile" element={<Profile />} />
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
