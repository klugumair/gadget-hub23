
import React from 'react';
import FloatingNavbar from '@/components/FloatingNavbar';
import HeroSection from '@/components/HeroSection';
import ProductSection from '@/components/ProductSection';
import Footer from '@/components/Footer';

const Index = () => {
  const phoneProducts = [
    {
      title: "iPhone 15 Pro Max",
      price: "Rs. 3,49,999",
      image: "📱",
      category: "Premium Smartphone"
    },
    {
      title: "Samsung Galaxy S24 Ultra",
      price: "Rs. 3,79,999",
      image: "📱",
      category: "Flagship Android"
    },
    {
      title: "Google Pixel 8 Pro",
      price: "Rs. 2,89,999",
      image: "📱",
      category: "AI Photography"
    }
  ];

  const coverProducts = [
    {
      title: "Luxury Leather Case",
      price: "Rs. 58,999",
      image: "🛡️",
      category: "Premium Protection"
    },
    {
      title: "Carbon Fiber Shield",
      price: "Rs. 46,999",
      image: "🛡️",
      category: "Ultra Durable"
    },
    {
      title: "Crystal Clear Armor",
      price: "Rs. 37,999",
      image: "🛡️",
      category: "Transparent Guard"
    }
  ];

  const headphoneProducts = [
    {
      title: "AirPods Max Gold",
      price: "Rs. 1,59,999",
      image: "🎧",
      category: "Wireless Premium"
    },
    {
      title: "Sony WH-1000XM5",
      price: "Rs. 1,16,999",
      image: "🎧",
      category: "Noise Canceling"
    },
    {
      title: "Sennheiser Momentum 4",
      price: "Rs. 1,01,999",
      image: "🎧",
      category: "Audiophile Grade"
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      <FloatingNavbar />
      <HeroSection />
      
      <ProductSection
        id="phones"
        title="Premium Smartphones"
        subtitle="Discover the latest flagship devices with cutting-edge technology and unparalleled performance."
        buttonText="View All Phones"
        buttonLink="/phones"
        products={phoneProducts}
      />
      
      <ProductSection
        id="covers"
        title="Protective Covers"
        subtitle="Shield your investment with our luxury cases designed for both protection and style."
        buttonText="View All Covers"
        buttonLink="/covers"
        products={coverProducts}
      />
      
      <ProductSection
        id="headphones"
        title="Premium Audio"
        subtitle="Immerse yourself in crystal-clear sound with our collection of high-end headphones."
        buttonText="View All Headphones"
        buttonLink="/headphones"
        products={headphoneProducts}
      />
      
      <Footer />
    </div>
  );
};

export default Index;
