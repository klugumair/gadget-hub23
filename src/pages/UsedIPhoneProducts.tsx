
import React from 'react';
import FloatingNavbar from '@/components/FloatingNavbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const UsedIPhoneProducts = () => {
  return (
    <div className="min-h-screen bg-black">
      <FloatingNavbar />
      
      <section className="py-32">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <Link to="/phones/used" className="inline-block mb-8">
              <Button variant="ghost" className="text-gold-400 hover:text-gold-300">
                <ArrowLeft size={20} className="mr-2" />
                Back to Used Phones
              </Button>
            </Link>
            
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              <span className="text-shimmer">Used iPhone Collection</span>
            </h1>
            <p className="text-xl text-gray-400 mb-12">
              Quality pre-owned iPhone smartphones at great prices
            </p>
            
            <div className="mt-12">
              <div className="glass-morphism rounded-2xl p-12 max-w-md mx-auto">
                <div className="text-8xl mb-6">🍎</div>
                <h2 className="text-3xl font-bold text-white mb-4">
                  Coming Soon
                </h2>
                <p className="text-xl text-gray-400">
                  We're working hard to bring you the best used iPhone devices. Stay tuned!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default UsedIPhoneProducts;
