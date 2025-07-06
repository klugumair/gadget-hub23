
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import FloatingNavbar from '@/components/FloatingNavbar';
import Footer from '@/components/Footer';
import AdminFloatingButton from '@/components/AdminFloatingButton';

const Headphones = () => {
  return (
    <div className="min-h-screen bg-black">
      <FloatingNavbar />
      
      <section className="py-32">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <Link to="/" className="inline-block mb-8">
              <Button variant="ghost" className="text-gold-400 hover:text-gold-300">
                <ArrowLeft size={20} className="mr-2" />
                Back to Home
              </Button>
            </Link>
            
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              <span className="text-shimmer">Premium Headphones</span>
            </h1>
            <p className="text-xl text-gray-400 mb-12">
              Discover our curated collection of high-quality headphones
            </p>
          </div>
          
          <div className="text-center">
            <div className="glass-morphism rounded-2xl p-12 max-w-md mx-auto">
              <div className="text-8xl mb-6">🎧</div>
              <h3 className="text-3xl font-bold text-white mb-4">
                No Headphones Available
              </h3>
              <p className="text-xl text-gray-400">
                We're working on bringing you amazing headphone products. Check back soon!
              </p>
            </div>
          </div>
        </div>
      </section>

      <AdminFloatingButton category="headphone" />
      <Footer />
    </div>
  );
};

export default Headphones;
