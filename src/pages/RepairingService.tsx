
import React from 'react';
import FloatingNavbar from '@/components/FloatingNavbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Smartphone, Apple } from 'lucide-react';

const RepairingService = () => {
  return (
    <div className="min-h-screen bg-black">
      <FloatingNavbar />
      
      <section className="py-32">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-6xl font-bold mb-8">
              <span className="text-shimmer">Services</span>
            </h1>
            <p className="text-2xl text-gray-400 mb-12 max-w-3xl mx-auto">
              Professional repair services for your devices
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {/* Android Services */}
            <Link to="/services/android" className="block group">
              <div className="glass-morphism rounded-2xl p-8 text-center hover:scale-105 transition-all duration-300">
                <div className="mb-6">
                  <Smartphone className="w-24 h-24 text-gold-400 mx-auto" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-4 group-hover:text-gold-400 transition-colors">
                  Android Services
                </h3>
                <p className="text-gray-400 mb-6">
                  Comprehensive repair services for all Android devices including Samsung, OnePlus, Xiaomi, and more
                </p>
                <Button className="bg-gradient-gold hover:bg-gold-500 text-black font-semibold px-8 py-3 rounded-full transition-all duration-300 hover:scale-105">
                  Explore Android Services
                </Button>
              </div>
            </Link>

            {/* iPhone Services */}
            <Link to="/services/iphone" className="block group">
              <div className="glass-morphism rounded-2xl p-8 text-center hover:scale-105 transition-all duration-300">
                <div className="mb-6">
                  <Apple className="w-24 h-24 text-gold-400 mx-auto" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-4 group-hover:text-gold-400 transition-colors">
                  iPhone Services
                </h3>
                <p className="text-gray-400 mb-6">
                  Expert iPhone repair services for all models, from screen replacements to battery fixes
                </p>
                <Button className="bg-gradient-gold hover:bg-gold-500 text-black font-semibold px-8 py-3 rounded-full transition-all duration-300 hover:scale-105">
                  Explore iPhone Services
                </Button>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default RepairingService;
