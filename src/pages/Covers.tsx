import React from 'react';
import FloatingNavbar from '@/components/FloatingNavbar';
import Footer from '@/components/Footer';
import AdminFloatingButton from '@/components/AdminFloatingButton';

const Covers = () => {
  return (
    <div className="min-h-screen bg-black">
      <FloatingNavbar />
      
      <section className="min-h-screen flex items-center justify-center relative">
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center">
            <h1 className="text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="text-shimmer">Protective Covers</span>
            </h1>
            <p className="text-2xl text-gray-300 mb-8">
              Coming Soon...
            </p>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Discover our exclusive range of luxury phone cases and protective covers. 
              Premium materials, superior protection, and elegant designs await you.
            </p>
          </div>
        </div>
      </section>
      
      <AdminFloatingButton category="cover" />
      <Footer />
    </div>
  );
};

export default Covers;
