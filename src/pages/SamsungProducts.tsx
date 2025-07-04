
import React from 'react';
import FloatingNavbar from '@/components/FloatingNavbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductCard from '@/components/ProductCard';
import AdminPhoneButton from '@/components/AdminPhoneButton';

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
      image: "/lovable-uploads/e0a1f7bd-f278-4d47-899c-5d8a32a1b501.png",
      category: "Samsung",
      link: "/phones/new/samsung/galaxy-a25-5g"
    },
    {
      title: "Samsung Galaxy A16",
      price: "Rs. 44,500",
      image: "/lovable-uploads/18b83a62-8544-4569-9179-bd54aa18daa9.png",
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
      link: "/phones/new/samsung/galaxy-s21-fe-128gb"
    },
    {
      title: "Galaxy S21 FE 5G (256GB)",
      price: "Rs. 154,999",
      image: "📱",
      category: "Samsung",
      link: "/phones/new/samsung/galaxy-s21-fe-256gb"
    },
    {
      title: "Galaxy S23 FE",
      price: "Rs. 168,299",
      image: "📱",
      category: "Samsung",
      link: "/phones/new/samsung/galaxy-s23-fe"
    },
    {
      title: "Galaxy S23 Ultra",
      price: "Rs. 332,999",
      image: "📱",
      category: "Samsung",
      link: "/phones/new/samsung/galaxy-s23-ultra"
    },
    {
      title: "Galaxy S24 FE",
      price: "Rs. 289,999",
      image: "📱",
      category: "Samsung",
      link: "/phones/new/samsung/galaxy-s24-fe"
    },
    {
      title: "Galaxy S24 Ultra",
      price: "Rs. 404,999",
      image: "📱",
      category: "Samsung",
      link: "/phones/new/samsung/galaxy-s24-ultra"
    },
    {
      title: "Galaxy Z Fold 5",
      price: "Rs. 515,220",
      image: "📱",
      category: "Samsung",
      link: "/phones/new/samsung/galaxy-z-fold-5"
    },
    {
      title: "Galaxy A14",
      price: "Rs. 62,999",
      image: "📱",
      category: "Samsung",
      link: "/phones/new/samsung/galaxy-a14"
    },
    {
      title: "Galaxy A15",
      price: "Rs. 59,999",
      image: "📱",
      category: "Samsung",
      link: "/phones/new/samsung/galaxy-a15"
    },
    {
      title: "Galaxy A25",
      price: "Rs. 98,500",
      image: "📱",
      category: "Samsung",
      link: "/phones/new/samsung/galaxy-a25"
    },
    {
      title: "Galaxy A34 5G",
      price: "Rs. 116,999",
      image: "📱",
      category: "Samsung",
      link: "/phones/new/samsung/galaxy-a34-5g"
    },
    {
      title: "Galaxy A05",
      price: "Rs. 35,999",
      image: "📱",
      category: "Samsung",
      link: "/phones/new/samsung/galaxy-a05"
    },
    {
      title: "Galaxy A05s",
      price: "Rs. 42,935",
      image: "📱",
      category: "Samsung",
      link: "/phones/new/samsung/galaxy-a05s"
    },
    {
      title: "Galaxy F14",
      price: "Rs. 49,860",
      image: "📱",
      category: "Samsung",
      link: "/phones/new/samsung/galaxy-f14"
    },
    {
      title: "Galaxy F34",
      price: "Rs. 56,785",
      image: "📱",
      category: "Samsung",
      link: "/phones/new/samsung/galaxy-f34"
    },
    {
      title: "Galaxy M54 5G",
      price: "Rs. 126,035",
      image: "📱",
      category: "Samsung",
      link: "/phones/new/samsung/galaxy-m54-5g"
    },
    {
      title: "Galaxy M34 5G",
      price: "Rs. 100,000",
      image: "📱",
      category: "Samsung",
      link: "/phones/new/samsung/galaxy-m34-5g"
    },
    {
      title: "Galaxy Z Flip 6",
      price: "Rs. 384,999",
      image: "📱",
      category: "Samsung",
      link: "/phones/new/samsung/galaxy-z-flip-6"
    },
    {
      title: "Galaxy Z Fold 6",
      price: "Rs. 604,999",
      image: "📱",
      category: "Samsung",
      link: "/phones/new/samsung/galaxy-z-fold-6"
    },
    {
      title: "Galaxy A05",
      price: "Rs. 44,999",
      image: "📱",
      category: "Samsung",
      link: "/phones/new/samsung/galaxy-a05-new"
    },
    {
      title: "Galaxy S25 Ultra",
      price: "Rs. 399,999",
      image: "📱",
      category: "Samsung",
      link: "/phones/new/samsung/galaxy-s25-ultra"
    },
    {
      title: "Galaxy S25",
      price: "Rs. 294,999",
      image: "📱",
      category: "Samsung",
      link: "/phones/new/samsung/galaxy-s25"
    },
    {
      title: "Galaxy S25 Edge",
      price: "Rs. 380,000",
      image: "📱",
      category: "Samsung",
      link: "/phones/new/samsung/galaxy-s25-edge"
    },
    {
      title: "Galaxy A26 5G",
      price: "Rs. 75,999",
      image: "📱",
      category: "Samsung",
      link: "/phones/new/samsung/galaxy-a26-5g"
    },
    {
      title: "Galaxy A36 5G",
      price: "Rs. 106,999",
      image: "📱",
      category: "Samsung",
      link: "/phones/new/samsung/galaxy-a36-5g"
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
              <Link key={index} to={product.link} className="block hover:scale-105 transition-transform duration-300">
                <ProductCard {...product} />
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      <AdminPhoneButton category="Samsung" />
      <Footer />
    </div>
  );
};

export default SamsungProducts;
