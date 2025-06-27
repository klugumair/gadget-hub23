
import React from 'react';
import FloatingNavbar from '@/components/FloatingNavbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductCard from '@/components/ProductCard';

const IPhoneProducts = () => {
  const iPhoneProducts = [
    {
      title: "iPhone 11",
      price: "From Rs. 89,999",
      image: "📱",
      category: "iPhone",
      link: "/phones/new/iphone/iphone-11"
    },
    {
      title: "iPhone 11 Pro",
      price: "From Rs. 119,999",
      image: "📱",
      category: "iPhone",
      link: "/phones/new/iphone/iphone-11-pro"
    },
    {
      title: "iPhone 11 Pro Max",
      price: "From Rs. 129,999",
      image: "📱",
      category: "iPhone",
      link: "/phones/new/iphone/iphone-11-pro-max"
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      <FloatingNavbar />
      
      <section className="py-32">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <Link to="/phones/new" className="inline-block mb-8">
              <Button variant="ghost" className="text-gold-400 hover:text-gold-300">
                <ArrowLeft size={20} className="mr-2" />
                Back to New Phones
              </Button>
            </Link>
            
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              <span className="text-shimmer">iPhone Collection</span>
            </h1>
            <p className="text-xl text-gray-400 mb-12">
              Discover our premium iPhone smartphone collection
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {iPhoneProducts.map((product, index) => (
              <div key={index} className="cursor-pointer" onClick={() => {
                if (product.link !== '#') {
                  window.location.href = product.link;
                } else {
                  console.log(`Clicked on ${product.title}`);
                }
              }}>
                <ProductCard {...product} />
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default IPhoneProducts;
