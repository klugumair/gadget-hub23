
import React from 'react';
import { Link } from 'react-router-dom';
import FloatingNavbar from '@/components/FloatingNavbar';
import HeroSection from '@/components/HeroSection';
import Footer from '@/components/Footer';
import TawkToWidget from '@/components/TawkToWidget';
import AdminFloatingButton from '@/components/AdminFloatingButton';

const Index = () => {
  return (
    <div className="min-h-screen bg-black">
      <FloatingNavbar />
      <HeroSection />
      
      {/* Gadgets Section */}
      <section id="gadgets" className="py-20 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">
              <span className="text-shimmer">Premium Gadgets</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
              Discover our curated collection of premium gadgets and accessories
            </p>
            <div className="glass-morphism rounded-2xl p-8 max-w-2xl mx-auto">
              <h3 className="text-3xl font-bold text-white mb-4">
                <span className="text-shimmer">Add Your Gadgets</span>
              </h3>
              <p className="text-lg text-gray-300 mb-6">
                Administrators can add new gadget products to showcase in our premium collection
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <AdminFloatingButton category="gadget" onProductAdded={() => window.location.reload()} />
      
      <Footer />
      <TawkToWidget />
    </div>
  );
};

export default Index;
