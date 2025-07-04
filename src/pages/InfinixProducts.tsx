
import React from 'react';
import FloatingNavbar from '@/components/FloatingNavbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductCard from '@/components/ProductCard';
import AdminPhoneButton from '@/components/AdminPhoneButton';

const InfinixProducts = () => {
  const infinixProducts = [
    {
      title: "Infinix Note 40 Pro",
      price: "Rs. 85,000",
      image: "📲",
      category: "Infinix"
    },
    {
      title: "Infinix Hot 50 Pro",
      price: "Rs. 45,000",
      image: "📲",
      category: "Infinix"
    },
    {
      title: "Infinix Zero 40",
      price: "Rs. 95,000",
      image: "📲",
      category: "Infinix"
    },
    {
      title: "Infinix Smart 8",
      price: "Rs. 25,000",
      image: "📲",
      category: "Infinix"
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
              <span className="text-shimmer">Infinix Collection</span>
            </h1>
            <p className="text-xl text-gray-400 mb-12">
              Discover our premium Infinix smartphone collection
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {infinixProducts.map((product, index) => (
              <ProductCard
                key={index}
                title={product.title}
                price={product.price}
                image={product.image}
                category={product.category}
                size="compact"
              />
            ))}
          </div>
        </div>
      </section>
      
      <AdminPhoneButton category="Infinix" />
      <Footer />
    </div>
  );
};

export default InfinixProducts;
