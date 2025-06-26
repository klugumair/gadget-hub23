
import React from 'react';
import FloatingNavbar from '@/components/FloatingNavbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const UsedSamsungProducts = () => {
  return (
    <div className="min-h-screen bg-black">
      <FloatingNavbar />
      
      <section className="min-h-screen flex items-center justify-center relative">
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center">
            <Link to="/phones/used" className="inline-block mb-8">
              <Button variant="ghost" className="text-gold-400 hover:text-gold-300">
                <ArrowLeft size={20} className="mr-2" />
                Back to Used Phones
              </Button>
            </Link>
            
            <h1 className="text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="text-shimmer">Used Samsung Collection</span>
            </h1>
            <p className="text-2xl text-gray-300 mb-8">
              Coming Soon...
            </p>
            <div className="mt-12">
              <div className="glass-morphism rounded-2xl p-12 max-w-md mx-auto">
                <div className="text-8xl mb-6">📱</div>
                <h2 className="text-3xl font-bold text-white mb-4">
                  Used Samsung Phones
                </h2>
                <p className="text-xl text-gray-400">
                  We're working hard to bring you quality used Samsung devices. Stay tuned!
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

export default UsedSamsungProducts;
