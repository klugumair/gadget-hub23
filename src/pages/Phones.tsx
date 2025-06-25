
import React from 'react';
import FloatingNavbar from '@/components/FloatingNavbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Phones = () => {
  return (
    <div className="min-h-screen bg-black">
      <FloatingNavbar />
      
      <section className="min-h-screen flex items-center justify-center relative py-32">
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center">
            <h1 className="text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="text-shimmer">Premium Phones</span>
            </h1>
            <p className="text-2xl text-gray-300 mb-12">
              Choose from our extensive collection
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center max-w-md mx-auto">
              <Link to="/phones/new" className="w-full sm:w-auto">
                <Button className="w-full bg-gradient-gold hover:bg-gold-500 text-black font-semibold px-8 py-4 text-lg rounded-full transition-all duration-300 hover:scale-105">
                  New Phones
                </Button>
              </Link>
              
              <Link to="/phones/used" className="w-full sm:w-auto">
                <Button 
                  variant="outline" 
                  className="w-full border-gold-400 text-gold-400 hover:bg-gold-400 hover:text-black font-semibold px-8 py-4 text-lg rounded-full transition-all duration-300 hover:scale-105"
                >
                  Used Phones
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Phones;
