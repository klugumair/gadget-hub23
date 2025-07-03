
import React from 'react';
import FloatingNavbar from '@/components/FloatingNavbar';
import Footer from '@/components/Footer';
import ProductSection from '@/components/ProductSection';
import AdminFloatingButton from '@/components/AdminFloatingButton';

const Gadgets = () => {
  const localChargers = [
    {
      title: "Fast Charging Cable USB-C",
      price: "Rs. 1,200",
      image: "🔌",
      category: "Local Charger"
    },
    {
      title: "Wireless Charging Pad",
      price: "Rs. 2,500",
      image: "📱",
      category: "Wireless Charger"
    },
    {
      title: "Power Bank 20000mAh",
      price: "Rs. 3,500",
      image: "🔋",
      category: "Portable Charger"
    }
  ];

  const localHeadphones = [
    {
      title: "Local Bass Headphones",
      price: "Rs. 1,800",
      image: "🎧",
      category: "Local Audio"
    },
    {
      title: "Gaming Headset Pro",
      price: "Rs. 2,200",
      image: "🎮",
      category: "Gaming Audio"
    },
    {
      title: "Bluetooth Earbuds",
      price: "Rs. 1,500",
      image: "🎵",
      category: "Wireless Audio"
    }
  ];

  const gadgets = [
    {
      title: "Smartphone Holder Stand",
      price: "Rs. 800",
      image: "📱",
      category: "Accessory"
    },
    {
      title: "Bluetooth Speaker Mini",
      price: "Rs. 1,600",
      image: "🔊",
      category: "Audio Device"
    },
    {
      title: "Phone Ring Holder",
      price: "Rs. 300",
      image: "💍",
      category: "Accessory"
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      <FloatingNavbar />
      
      <section className="py-32">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-6xl font-bold mb-8">
              <span className="text-shimmer">Gadgets & Accessories</span>
            </h1>
            <p className="text-2xl text-gray-400 mb-12 max-w-3xl mx-auto">
              Discover essential gadgets and accessories to enhance your mobile experience
            </p>
          </div>
        </div>
      </section>

      <ProductSection
        id="local-chargers"
        title="Local Chargers"
        subtitle="High-quality charging solutions at affordable prices"
        buttonText="View All Chargers"
        buttonLink="/gadgets/chargers"
        products={localChargers}
      />
      
      <ProductSection
        id="local-headphones"
        title="Local Headphones"
        subtitle="Premium audio experience with local brands"
        buttonText="View All Local Headphones"
        buttonLink="/gadgets/local-headphones"
        products={localHeadphones}
      />
      
      <ProductSection
        id="gadgets"
        title="Gadgets"
        subtitle="Essential accessories for your smartphone and daily needs"
        buttonText="View All Gadgets"
        buttonLink="/gadgets/accessories"
        products={gadgets}
      />
      
      <AdminFloatingButton category="gadget" />
      <Footer />
    </div>
  );
};

export default Gadgets;
