
import React from 'react';
import FloatingNavbar from '@/components/FloatingNavbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const RepairingService = () => {
  return (
    <div className="min-h-screen bg-black">
      <FloatingNavbar />
      
      <section className="py-32">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <h1 className="text-6xl font-bold mb-8">
              <span className="text-shimmer">Repairing Service</span>
            </h1>
            <p className="text-2xl text-gray-400 mb-12">
              Professional device repair services coming soon
            </p>
            <div className="glass-morphism rounded-2xl p-12 max-w-2xl mx-auto">
              <div className="text-8xl mb-6">🔧</div>
              <h2 className="text-3xl font-bold text-white mb-4">
                Expert Repair Services
              </h2>
              <p className="text-xl text-gray-400 mb-8">
                We're setting up our professional repair center to provide you with the best device repair services. Stay tuned for updates!
              </p>
              <Link to="/">
                <Button className="bg-gradient-gold hover:bg-gold-500 text-black font-semibold px-8 py-3 rounded-full transition-all duration-300 hover:scale-105">
                  <ArrowLeft size={20} className="mr-2" />
                  Back to Home
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

export default RepairingService;
