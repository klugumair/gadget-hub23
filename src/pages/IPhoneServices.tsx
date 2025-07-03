
import React from 'react';
import FloatingNavbar from '@/components/FloatingNavbar';
import Footer from '@/components/Footer';
import { Apple } from 'lucide-react';

const IPhoneServices = () => {
  return (
    <div className="min-h-screen bg-black">
      <FloatingNavbar />
      
      <section className="py-32">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="mb-8">
              <Apple className="w-32 h-32 text-gold-400 mx-auto" />
            </div>
            <h1 className="text-6xl font-bold mb-8">
              <span className="text-shimmer">iPhone Services</span>
            </h1>
            <p className="text-2xl text-gray-400 mb-12 max-w-3xl mx-auto">
              Expert iPhone repair services for all models
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="glass-morphism rounded-2xl p-12">
              <h2 className="text-4xl font-bold text-white mb-8">
                Coming Soon
              </h2>
              <p className="text-xl text-gray-400 mb-8">
                We're preparing specialized iPhone repair services for all models. 
                Expert technicians and genuine parts coming soon!
              </p>
              <div className="text-gold-400 text-6xl mb-8">
                🍎
              </div>
              <p className="text-gray-400">
                Contact us for any immediate iPhone repair requirements.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default IPhoneServices;
