
import React from 'react';
import FloatingNavbar from '@/components/FloatingNavbar';
import Footer from '@/components/Footer';
import { Smartphone } from 'lucide-react';

const AndroidServices = () => {
  return (
    <div className="min-h-screen bg-black">
      <FloatingNavbar />
      
      <section className="py-32">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="mb-8">
              <Smartphone className="w-32 h-32 text-gold-400 mx-auto" />
            </div>
            <h1 className="text-6xl font-bold mb-8">
              <span className="text-shimmer">Android Services</span>
            </h1>
            <p className="text-2xl text-gray-400 mb-12 max-w-3xl mx-auto">
              Professional Android device repair services
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
                We're working hard to bring you comprehensive Android repair services. 
                Stay tuned for updates!
              </p>
              <div className="text-gold-400 text-6xl mb-8">
                🚧
              </div>
              <p className="text-gray-400">
                In the meantime, feel free to contact us for any urgent repair needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AndroidServices;
