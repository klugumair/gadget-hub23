
import React from 'react';
import FloatingNavbar from '@/components/FloatingNavbar';
import Footer from '@/components/Footer';

const Headphones = () => {
  return (
    <div className="min-h-screen bg-black">
      <FloatingNavbar />
      
      <section className="min-h-screen flex items-center justify-center relative">
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center">
            <h1 className="text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="text-shimmer">Premium Audio</span>
            </h1>
            <p className="text-2xl text-gray-300 mb-8">
              Coming Soon...
            </p>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Immerse yourself in exceptional sound quality with our curated collection 
              of high-end headphones and premium audio accessories.
            </p>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Headphones;
