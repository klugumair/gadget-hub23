
import React from 'react';
import FloatingNavbar from '@/components/FloatingNavbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';

const Headphones = () => {
  const roninProducts = [
    {
      title: "Unknown",
      price: "Rs. 10",
      image: "🎧",
      category: "Ronin"
    },
    {
      title: "Unknown",
      price: "Rs. 10",
      image: "🎧",
      category: "Ronin"
    },
    {
      title: "Unknown",
      price: "Rs. 10",
      image: "🎧",
      category: "Ronin"
    },
    {
      title: "Unknown",
      price: "Rs. 10",
      image: "🎧",
      category: "Ronin"
    }
  ];

  const audionicProducts = [
    {
      title: "Unknown",
      price: "Rs. 10",
      image: "🎧",
      category: "Audionic"
    },
    {
      title: "Unknown",
      price: "Rs. 10",
      image: "🎧",
      category: "Audionic"
    },
    {
      title: "Unknown",
      price: "Rs. 10",
      image: "🎧",
      category: "Audionic"
    },
    {
      title: "Unknown",
      price: "Rs. 10",
      image: "🎧",
      category: "Audionic"
    }
  ];

  const moreHeadphones = [
    {
      title: "Unknown",
      price: "Rs. 10",
      image: "🎧",
      category: "More Headphones"
    },
    {
      title: "Unknown",
      price: "Rs. 10",
      image: "🎧",
      category: "More Headphones"
    },
    {
      title: "Unknown",
      price: "Rs. 10",
      image: "🎧",
      category: "More Headphones"
    },
    {
      title: "Unknown",
      price: "Rs. 10",
      image: "🎧",
      category: "More Headphones"
    },
    {
      title: "Unknown",
      price: "Rs. 10",
      image: "🎧",
      category: "More Headphones"
    },
    {
      title: "Unknown",
      price: "Rs. 10",
      image: "🎧",
      category: "More Headphones"
    },
    {
      title: "Unknown",
      price: "Rs. 10",
      image: "🎧",
      category: "More Headphones"
    },
    {
      title: "Unknown",
      price: "Rs. 10",
      image: "🎧",
      category: "More Headphones"
    }
  ];

  const BrandHeader = ({ title }: { title: string }) => (
    <div className="flex justify-center mb-12">
      <div className="bg-gradient-gold text-black px-12 py-4 rounded-full font-bold text-2xl shadow-lg">
        {title}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black">
      <FloatingNavbar />
      
      <section className="py-32">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="text-shimmer">Premium Audio</span>
            </h1>
            <p className="text-2xl text-gray-300 mb-8">
              Discover our collection of high-quality headphones
            </p>
          </div>

          {/* Ronin Section */}
          <BrandHeader title="Ronin" />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {roninProducts.map((product, index) => (
              <ProductCard key={`ronin-${index}`} {...product} />
            ))}
          </div>

          {/* Audionic Section */}
          <BrandHeader title="Audionic" />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {audionicProducts.map((product, index) => (
              <ProductCard key={`audionic-${index}`} {...product} />
            ))}
          </div>

          {/* More Headphones Section */}
          <BrandHeader title="More Headphones" />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {moreHeadphones.map((product, index) => (
              <ProductCard key={`more-${index}`} {...product} />
            ))}
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Headphones;
