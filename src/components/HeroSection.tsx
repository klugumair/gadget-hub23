
import React from 'react';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-dark opacity-90"></div>
      
      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-gold-400 rounded-full opacity-20 animate-float"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-gold-500 rounded-full opacity-10 animate-float" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 right-20 w-16 h-16 bg-gold-600 rounded-full opacity-15 animate-float" style={{ animationDelay: '2s' }}></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="text-white">Premium</span>
              <br />
              <span className="text-shimmer">Mobile</span>
              <br />
              <span className="text-white">Experience</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Discover the finest collection of smartphones, protective cases, and premium headphones. 
              Elevate your mobile lifestyle with our luxury accessories.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button className="bg-gradient-gold hover:bg-gold-500 text-black font-bold px-8 py-4 text-lg rounded-full transition-all duration-300 hover:scale-105 animate-glow">
                Explore Collection
              </Button>
              <Button variant="outline" className="border-2 border-gold-400 text-gold-400 hover:bg-gold-400 hover:text-black font-bold px-8 py-4 text-lg rounded-full transition-all duration-300">
                Watch Demo
              </Button>
            </div>
          </div>
          
          <div className="relative">
            <div className="relative z-10 animate-float">
              <div className="bg-gradient-gold p-8 rounded-3xl shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="bg-black p-6 rounded-2xl">
                  <div className="w-full h-80 bg-gradient-to-br from-gray-900 to-black rounded-xl flex items-center justify-center">
                    <div className="text-gold-400 text-6xl font-bold">📱</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gold-400 rounded-full opacity-30 animate-pulse"></div>
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-gold-600 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
