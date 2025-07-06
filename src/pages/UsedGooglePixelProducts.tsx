
import React from 'react';
import FloatingNavbar from '@/components/FloatingNavbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Upload } from 'lucide-react';
import { Link } from 'react-router-dom';

const UsedGooglePixelProducts = () => {
  return (
    <div className="min-h-screen bg-black">
      <FloatingNavbar />
      
      <section className="min-h-screen flex flex-col items-center justify-center relative">
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <Link to="/phones/used" className="inline-block mb-8">
              <Button variant="ghost" className="text-gold-400 hover:text-gold-300">
                <ArrowLeft size={20} className="mr-2" />
                Back to Used Phones
              </Button>
            </Link>
            
            <h1 className="text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="text-shimmer">Used Google Pixel Collection</span>
            </h1>
            <p className="text-2xl text-gray-300 mb-12">
              Quality pre-owned Google Pixel devices at great prices
            </p>
            
            <div className="mb-16">
              <div className="glass-morphism rounded-2xl p-8 max-w-2xl mx-auto">
                <h2 className="text-4xl font-bold text-white mb-4">
                  <span className="text-shimmer">Sell Your Used Google Pixel Phone</span>
                </h2>
                <p className="text-xl text-gray-300 mb-6">
                  Get the best value for your Google Pixel device. Upload details and images, and our team will review your submission.
                </p>
                <Link to="/sell-google-pixel-phone">
                  <Button className="premium-gradient text-black font-semibold text-lg px-8 py-3 rounded-full hover:scale-105 transition-transform">
                    <Upload size={20} className="mr-2" />
                    Sell Your Phone
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-4xl font-bold text-center text-white mb-8">
              <span className="text-shimmer">Available Used Google Pixel Phones</span>
            </h2>
            
            <div className="text-center">
              <div className="glass-morphism rounded-2xl p-12 max-w-md mx-auto">
                <div className="text-8xl mb-6">📱</div>
                <h3 className="text-3xl font-bold text-white mb-4">
                  No Used Google Pixel Phones Available
                </h3>
                <p className="text-xl text-gray-400">
                  We're working hard to bring you quality used Google Pixel devices. Check back soon or sell your phone to us!
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

export default UsedGooglePixelProducts;
