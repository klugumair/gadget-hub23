
import React from 'react';
import FloatingNavbar from '@/components/FloatingNavbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';

const Headphones = () => {
  const roninProducts = [
    {
      title: "Ronin R-920",
      price: "Rs. 3,500",
      image: "🎧",
      category: "Ronin"
    },
    {
      title: "Ronin R-810",
      price: "Rs. 2,800",
      image: "🎧",
      category: "Ronin"
    },
    {
      title: "Ronin R-750",
      price: "Rs. 2,200",
      image: "🎧",
      category: "Ronin"
    },
    {
      title: "Ronin R-650",
      price: "Rs. 1,800",
      image: "🎧",
      category: "Ronin"
    }
  ];

  const audionicProducts = [
    {
      title: "Audionic Blue Beat BB-10",
      price: "Rs. 4,500",
      image: "🎧",
      category: "Audionic"
    },
    {
      title: "Audionic Pace P-5",
      price: "Rs. 3,200",
      image: "🎧",
      category: "Audionic"
    },
    {
      title: "Audionic Max M-8",
      price: "Rs. 2,900",
      image: "🎧",
      category: "Audionic"
    },
    {
      title: "Audionic Solo S-15",
      price: "Rs. 2,100",
      image: "🎧",
      category: "Audionic"
    }
  ];

  const moreHeadphones = [
    {
      title: "JBL Tune 760NC",
      price: "Rs. 8,999",
      image: "🎧",
      category: "More Headphones"
    },
    {
      title: "Boat Rockerz 450",
      price: "Rs. 1,999",
      image: "🎧",
      category: "More Headphones"
    },
    {
      title: "Skullcandy Hesh 3",
      price: "Rs. 6,999",
      image: "🎧",
      category: "More Headphones"
    },
    {
      title: "Marshall Major IV",
      price: "Rs. 12,999",
      image: "🎧",
      category: "More Headphones"
    },
    {
      title: "Audio-Technica ATH-M40x",
      price: "Rs. 8,999",
      image: "🎧",
      category: "More Headphones"
    },
    {
      title: "Bose QuietComfort 35 II",
      price: "Rs. 29,999",
      image: "🎧",
      category: "More Headphones"
    },
    {
      title: "Beats Studio3 Wireless",
      price: "Rs. 24,999",
      image: "🎧",
      category: "More Headphones"
    },
    {
      title: "Plantronics BackBeat Pro 2",
      price: "Rs. 14,999",
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
