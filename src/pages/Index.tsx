
import React from 'react';
import { Link } from 'react-router-dom';
import FloatingNavbar from '@/components/FloatingNavbar';
import HeroSection from '@/components/HeroSection';
import ProductSection from '@/components/ProductSection';
import Footer from '@/components/Footer';
import TawkToWidget from '@/components/TawkToWidget';

const Index = () => {
  const phoneProducts = [
    {
      title: "iPhone 15 Pro Max",
      price: "Rs. 4,72,000",
      image: "📱",
      category: "Premium Smartphone",
      link: "/iphone-15-pro-max"
    },
    {
      title: "Samsung Galaxy S24 Ultra",
      price: "Rs. 5,41,999",
      image: "📱",
      category: "Flagship Android",
      link: "/samsung-galaxy-s24-ultra"
    },
    {
      title: "Google Pixel 8 Pro",
      price: "Rs. 1,15,000",
      image: "📱",
      category: "AI Photography",
      link: "/google-pixel-8-pro"
    }
  ];

  const coverProducts = [
    {
      title: "Luxury Leather Case",
      price: "Rs. 1,500",
      image: "🛡️",
      category: "Premium Protection",
      link: "/luxury-leather-case"
    },
    {
      title: "Carbon Fiber Shield",
      price: "Rs. 2,000",
      image: "🛡️",
      category: "Ultra Durable",
      link: "/carbon-fiber-shield"
    },
    {
      title: "Crystal Clear Armor",
      price: "Rs. 3,000",
      image: "🛡️",
      category: "Transparent Guard",
      link: "/crystal-clear-armor"
    }
  ];

  const headphoneProducts = [
    {
      title: "AirPods Max Gold",
      price: "Rs. 1,59,999",
      image: "🎧",
      category: "Wireless Premium",
      link: "/airpods-max-gold"
    },
    {
      title: "Sony WH-1000XM5",
      price: "Rs. 1,16,999",
      image: "🎧",
      category: "Noise Canceling",
      link: "/sony-wh-1000xm5"
    },
    {
      title: "Sennheiser Momentum 4",
      price: "Rs. 1,01,999",
      image: "🎧",
      category: "Audiophile Grade",
      link: "/sennheiser-momentum-4"
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
      <TawkToWidget />
    </div>
  );
};

export default Index;
