
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
      image: "/lovable-uploads/d5a93a8e-f1c9-4576-bba8-668019b6c72c.png",
      category: "Samsung",
      link: "/phones/new/samsung/galaxy-a06"
    },
    {
      title: "Samsung Galaxy A25 5G",
      price: "Rs. 98,500",
      image: "/lovable-uploads/9757f179-7069-476d-9ac1-e7f3bda202dd.png",
      category: "Samsung",
      link: "/phones/new/samsung/galaxy-a25-5g"
    },
    {
      title: "Samsung Galaxy A16",
      price: "Rs. 44,500",
      image: "/lovable-uploads/e0a1f7bd-f278-4d47-899c-5d8a32a1b501.png",
      category: "Samsung",
      link: "/phones/new/samsung/galaxy-a16"
    },
    {
      title: "Samsung Galaxy A56",
      price: "Rs. 130,000",
      image: "/lovable-uploads/7a291dd7-8f8c-4a9b-b4cd-769a23174b5f.png",
      category: "Samsung",
      link: "/phones/new/samsung/galaxy-a56"
    },
    {
      title: "Galaxy S21 FE 5G (128GB)",
      price: "Rs. 144,999",
      image: "📱",
      category: "Samsung",
      link: "#"
    },
    {
      title: "Galaxy S21 FE 5G (256GB)",
      price: "Rs. 154,999",
      image: "📱",
      category: "Samsung",
      link: "#"
    },
    {
      title: "Galaxy S23 FE",
      price: "Rs. 168,299",
      image: "📱",
      category: "Samsung",
      link: "#"
    },
    {
      title: "Galaxy S23 Ultra",
      price: "Rs. 332,999",
      image: "📱",
      category: "Samsung",
      link: "#"
    },
    {
      title: "Galaxy S24 FE",
      price: "Rs. 289,999",
      image: "📱",
      category: "Samsung",
      link: "#"
    },
    {
      title: "Galaxy S24 Ultra",
      price: "Rs. 404,999",
      image: "📱",
      category: "Samsung",
      link: "#"
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

export default SamsungProducts;
