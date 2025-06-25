
import React from 'react';
import FloatingNavbar from '@/components/FloatingNavbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductCard from '@/components/ProductCard';

const SamsungProducts = () => {
  const samsungProducts = [
    {
      title: "Samsung Galaxy A06",
      price: "Rs. 25,500",
      image: "📱",
      category: "Samsung"
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
              <span className="text-shimmer">Samsung Collection</span>
            </h1>
            <p className="text-xl text-gray-400 mb-12">
              Discover our premium Samsung smartphone collection
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {samsungProducts.map((product, index) => (
              <Link key={index} to={`/phones/new/samsung/galaxy-a06`}>
                <ProductCard {...product} />
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default SamsungProducts;
